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
    o = new e.Error().stack;
  o &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[o] = "08a44143-e091-420f-a637-2f7ff2d72b05"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-08a44143-e091-420f-a637-2f7ff2d72b05"));
} catch (e) {}
("use strict");
(exports.id = 4292),
  (exports.ids = [4292]),
  (exports.modules = {
    30980: (e, o, t) => {
      t.d(o, { A: () => s });
      var n = t(84147),
        r = {
          xmlns: "http://www.w3.org/2000/svg",
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        };
      let i = (e) =>
          e
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .toLowerCase()
            .trim(),
        s = (e, o) => {
          let t = (0, n.forwardRef)(
            (
              {
                color: t = "currentColor",
                size: s = 24,
                strokeWidth: a = 2,
                absoluteStrokeWidth: m,
                className: l = "",
                children: d,
                ...c
              },
              p,
            ) =>
              (0, n.createElement)(
                "svg",
                {
                  ref: p,
                  ...r,
                  width: s,
                  height: s,
                  stroke: t,
                  strokeWidth: m ? (24 * Number(a)) / Number(s) : a,
                  className: ["lucide", `lucide-${i(e)}`, l].join(" "),
                  ...c,
                },
                [
                  ...o.map(([e, o]) => (0, n.createElement)(e, o)),
                  ...(Array.isArray(d) ? d : [d]),
                ],
              ),
          );
          return (t.displayName = `${e}`), t;
        };
    },
    46376: (e, o, t) => {
      t.d(o, { motion: () => n.P });
      var n = t(55728);
    },
    47350: (e, o, t) => {
      t.d(o, { motion: () => r });
      var n = t(26394);
      (0, n.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call AnimatePresence() from the server but AnimatePresence is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
        "AnimatePresence",
      ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call LayoutGroup() from the server but LayoutGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "LayoutGroup",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call LazyMotion() from the server but LazyMotion is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "LazyMotion",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call MotionConfig() from the server but MotionConfig is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "MotionConfig",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call m() from the server but m is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "m",
        );
      let r = (0, n.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call motion() from the server but motion is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
        "motion",
      );
      (0, n.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call addPointerEvent() from the server but addPointerEvent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
        "addPointerEvent",
      ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call addPointerInfo() from the server but addPointerInfo is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "addPointerInfo",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animations() from the server but animations is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animations",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call makeUseVisualState() from the server but makeUseVisualState is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "makeUseVisualState",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call calcLength() from the server but calcLength is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "calcLength",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call createBox() from the server but createBox is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "createBox",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call filterProps() from the server but filterProps is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "filterProps",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isBrowser() from the server but isBrowser is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isBrowser",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useForceUpdate() from the server but useForceUpdate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useForceUpdate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useIsomorphicLayoutEffect() from the server but useIsomorphicLayoutEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useIsomorphicLayoutEffect",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useUnmountEffect() from the server but useUnmountEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useUnmountEffect",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call domAnimation() from the server but domAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "domAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call domMax() from the server but domMax is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "domMax",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call domMin() from the server but domMin is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "domMin",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useMotionValueEvent() from the server but useMotionValueEvent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useMotionValueEvent",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useElementScroll() from the server but useElementScroll is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useElementScroll",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useViewportScroll() from the server but useViewportScroll is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useViewportScroll",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useMotionTemplate() from the server but useMotionTemplate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useMotionTemplate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useMotionValue() from the server but useMotionValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useMotionValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useScroll() from the server but useScroll is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useScroll",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useSpring() from the server but useSpring is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useSpring",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useTime() from the server but useTime is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useTime",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useTransform() from the server but useTransform is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useTransform",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useVelocity() from the server but useVelocity is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useVelocity",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useWillChange() from the server but useWillChange is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useWillChange",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call WillChangeMotionValue() from the server but WillChangeMotionValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "WillChangeMotionValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call resolveMotionValue() from the server but resolveMotionValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "resolveMotionValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useReducedMotion() from the server but useReducedMotion is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useReducedMotion",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useReducedMotionConfig() from the server but useReducedMotionConfig is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useReducedMotionConfig",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call MotionGlobalConfig() from the server but MotionGlobalConfig is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "MotionGlobalConfig",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animationControls() from the server but animationControls is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animationControls",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useAnimate() from the server but useAnimate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useAnimate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useAnimateMini() from the server but useAnimateMini is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useAnimateMini",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useAnimation() from the server but useAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useAnimationControls() from the server but useAnimationControls is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useAnimationControls",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animateVisualElement() from the server but animateVisualElement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animateVisualElement",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useIsPresent() from the server but useIsPresent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useIsPresent",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call usePresence() from the server but usePresence is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "usePresence",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call usePresenceData() from the server but usePresenceData is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "usePresenceData",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useDomEvent() from the server but useDomEvent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useDomEvent",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call DragControls() from the server but DragControls is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "DragControls",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useDragControls() from the server but useDragControls is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useDragControls",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call createRendererMotionComponent() from the server but createRendererMotionComponent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "createRendererMotionComponent",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isMotionComponent() from the server but isMotionComponent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isMotionComponent",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call unwrapMotionComponent() from the server but unwrapMotionComponent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "unwrapMotionComponent",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isValidMotionProp() from the server but isValidMotionProp is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isValidMotionProp",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call addScaleCorrector() from the server but addScaleCorrector is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "addScaleCorrector",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useInstantLayoutTransition() from the server but useInstantLayoutTransition is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useInstantLayoutTransition",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useResetProjection() from the server but useResetProjection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useResetProjection",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call buildTransform() from the server but buildTransform is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "buildTransform",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call visualElementStore() from the server but visualElementStore is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "visualElementStore",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call VisualElement() from the server but VisualElement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "VisualElement",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useAnimationFrame() from the server but useAnimationFrame is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useAnimationFrame",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useCycle() from the server but useCycle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useCycle",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useInView() from the server but useInView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useInView",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call disableInstantTransitions() from the server but disableInstantTransitions is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "disableInstantTransitions",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useInstantTransition() from the server but useInstantTransition is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useInstantTransition",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call optimizedAppearDataAttribute() from the server but optimizedAppearDataAttribute is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "optimizedAppearDataAttribute",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call startOptimizedAppearAnimation() from the server but startOptimizedAppearAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "startOptimizedAppearAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call LayoutGroupContext() from the server but LayoutGroupContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "LayoutGroupContext",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call MotionConfigContext() from the server but MotionConfigContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "MotionConfigContext",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call MotionContext() from the server but MotionContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "MotionContext",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call PresenceContext() from the server but PresenceContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "PresenceContext",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SwitchLayoutGroupContext() from the server but SwitchLayoutGroupContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "SwitchLayoutGroupContext",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call FlatTree() from the server but FlatTree is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "FlatTree",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useDeprecatedAnimatedState() from the server but useDeprecatedAnimatedState is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useDeprecatedAnimatedState",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call AnimateSharedLayout() from the server but AnimateSharedLayout is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "AnimateSharedLayout",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call DeprecatedLayoutGroupContext() from the server but DeprecatedLayoutGroupContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "DeprecatedLayoutGroupContext",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useDeprecatedInvertedScale() from the server but useDeprecatedInvertedScale is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "useDeprecatedInvertedScale",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call delay() from the server but delay is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "delay",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animate() from the server but animate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call createScopedAnimate() from the server but createScopedAnimate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "createScopedAnimate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animateMini() from the server but animateMini is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animateMini",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call scroll() from the server but scroll is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "scroll",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call scrollInfo() from the server but scrollInfo is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "scrollInfo",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call inView() from the server but inView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "inView",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call stagger() from the server but stagger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "stagger",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call distance() from the server but distance is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "distance",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call distance2D() from the server but distance2D is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "distance2D",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call addUniqueItem() from the server but addUniqueItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "addUniqueItem",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call moveItem() from the server but moveItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "moveItem",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call removeItem() from the server but removeItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "removeItem",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call clamp() from the server but clamp is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "clamp",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call invariant() from the server but invariant is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "invariant",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call warning() from the server but warning is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "warning",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isNumericalString() from the server but isNumericalString is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isNumericalString",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isObject() from the server but isObject is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isObject",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isZeroValueString() from the server but isZeroValueString is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isZeroValueString",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call memo() from the server but memo is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "memo",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call noop() from the server but noop is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "noop",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call pipe() from the server but pipe is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "pipe",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call progress() from the server but progress is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "progress",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SubscriptionManager() from the server but SubscriptionManager is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "SubscriptionManager",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call millisecondsToSeconds() from the server but millisecondsToSeconds is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "millisecondsToSeconds",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call secondsToMilliseconds() from the server but secondsToMilliseconds is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "secondsToMilliseconds",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call velocityPerSecond() from the server but velocityPerSecond is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "velocityPerSecond",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call hasWarned() from the server but hasWarned is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "hasWarned",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call warnOnce() from the server but warnOnce is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "warnOnce",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call wrap() from the server but wrap is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "wrap",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call anticipate() from the server but anticipate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "anticipate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call backIn() from the server but backIn is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "backIn",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call backInOut() from the server but backInOut is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "backInOut",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call backOut() from the server but backOut is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "backOut",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call circIn() from the server but circIn is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "circIn",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call circInOut() from the server but circInOut is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "circInOut",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call circOut() from the server but circOut is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "circOut",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call cubicBezier() from the server but cubicBezier is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "cubicBezier",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call easeIn() from the server but easeIn is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "easeIn",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call easeInOut() from the server but easeInOut is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "easeInOut",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call easeOut() from the server but easeOut is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "easeOut",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mirrorEasing() from the server but mirrorEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mirrorEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call reverseEasing() from the server but reverseEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "reverseEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call steps() from the server but steps is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "steps",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getEasingForSegment() from the server but getEasingForSegment is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getEasingForSegment",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isBezierDefinition() from the server but isBezierDefinition is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isBezierDefinition",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isEasingArray() from the server but isEasingArray is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isEasingArray",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call easingDefinitionToFunction() from the server but easingDefinitionToFunction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "easingDefinitionToFunction",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call AsyncMotionValueAnimation() from the server but AsyncMotionValueAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "AsyncMotionValueAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call GroupAnimation() from the server but GroupAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "GroupAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call GroupAnimationWithThen() from the server but GroupAnimationWithThen is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "GroupAnimationWithThen",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call JSAnimation() from the server but JSAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "JSAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animateValue() from the server but animateValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animateValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call NativeAnimation() from the server but NativeAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "NativeAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call NativeAnimationExtended() from the server but NativeAnimationExtended is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "NativeAnimationExtended",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call NativeAnimationWrapper() from the server but NativeAnimationWrapper is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "NativeAnimationWrapper",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animationMapKey() from the server but animationMapKey is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animationMapKey",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getAnimationMap() from the server but getAnimationMap is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getAnimationMap",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getVariableValue() from the server but getVariableValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getVariableValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call parseCSSVariable() from the server but parseCSSVariable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "parseCSSVariable",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getValueTransition() from the server but getValueTransition is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getValueTransition",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isCSSVariableName() from the server but isCSSVariableName is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isCSSVariableName",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isCSSVariableToken() from the server but isCSSVariableToken is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isCSSVariableToken",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call inertia() from the server but inertia is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "inertia",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call defaultEasing() from the server but defaultEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "defaultEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call keyframes() from the server but keyframes is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "keyframes",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call spring() from the server but spring is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "spring",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call calcGeneratorDuration() from the server but calcGeneratorDuration is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "calcGeneratorDuration",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call maxGeneratorDuration() from the server but maxGeneratorDuration is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "maxGeneratorDuration",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call createGeneratorEasing() from the server but createGeneratorEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "createGeneratorEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isGenerator() from the server but isGenerator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isGenerator",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call DOMKeyframesResolver() from the server but DOMKeyframesResolver is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "DOMKeyframesResolver",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call KeyframeResolver() from the server but KeyframeResolver is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "KeyframeResolver",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call flushKeyframeResolvers() from the server but flushKeyframeResolvers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "flushKeyframeResolvers",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call defaultOffset() from the server but defaultOffset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "defaultOffset",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call fillOffset() from the server but fillOffset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "fillOffset",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call convertOffsetToTimes() from the server but convertOffsetToTimes is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "convertOffsetToTimes",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call applyPxDefaults() from the server but applyPxDefaults is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "applyPxDefaults",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call fillWildcards() from the server but fillWildcards is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "fillWildcards",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call cubicBezierAsString() from the server but cubicBezierAsString is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "cubicBezierAsString",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isWaapiSupportedEasing() from the server but isWaapiSupportedEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isWaapiSupportedEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mapEasingToNativeEasing() from the server but mapEasingToNativeEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mapEasingToNativeEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call supportedWaapiEasing() from the server but supportedWaapiEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "supportedWaapiEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call startWaapiAnimation() from the server but startWaapiAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "startWaapiAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call supportsPartialKeyframes() from the server but supportsPartialKeyframes is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "supportsPartialKeyframes",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call supportsBrowserAnimation() from the server but supportsBrowserAnimation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "supportsBrowserAnimation",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call acceleratedValues() from the server but acceleratedValues is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "acceleratedValues",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call generateLinearEasing() from the server but generateLinearEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "generateLinearEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call addAttrValue() from the server but addAttrValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "addAttrValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call attrEffect() from the server but attrEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "attrEffect",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call propEffect() from the server but propEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "propEffect",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call addStyleValue() from the server but addStyleValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "addStyleValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call styleEffect() from the server but styleEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "styleEffect",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call svgEffect() from the server but svgEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "svgEffect",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call createRenderBatcher() from the server but createRenderBatcher is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "createRenderBatcher",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call cancelMicrotask() from the server but cancelMicrotask is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "cancelMicrotask",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call microtask() from the server but microtask is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "microtask",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call time() from the server but time is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "time",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isDragActive() from the server but isDragActive is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isDragActive",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isDragging() from the server but isDragging is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isDragging",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call setDragLock() from the server but setDragLock is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "setDragLock",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call hover() from the server but hover is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "hover",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call press() from the server but press is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "press",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isNodeOrChild() from the server but isNodeOrChild is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isNodeOrChild",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isPrimaryPointer() from the server but isPrimaryPointer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isPrimaryPointer",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call defaultTransformValue() from the server but defaultTransformValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "defaultTransformValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call parseValueFromTransform() from the server but parseValueFromTransform is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "parseValueFromTransform",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call readTransformValue() from the server but readTransformValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "readTransformValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getComputedStyle() from the server but getComputedStyle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getComputedStyle",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call setStyle() from the server but setStyle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "setStyle",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call positionalKeys() from the server but positionalKeys is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "positionalKeys",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call transformPropOrder() from the server but transformPropOrder is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "transformPropOrder",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call transformProps() from the server but transformProps is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "transformProps",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call resize() from the server but resize is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "resize",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call observeTimeline() from the server but observeTimeline is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "observeTimeline",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call recordStats() from the server but recordStats is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "recordStats",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call activeAnimations() from the server but activeAnimations is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "activeAnimations",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call statsBuffer() from the server but statsBuffer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "statsBuffer",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call interpolate() from the server but interpolate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "interpolate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isHTMLElement() from the server but isHTMLElement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isHTMLElement",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isSVGElement() from the server but isSVGElement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isSVGElement",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isSVGSVGElement() from the server but isSVGSVGElement is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isSVGSVGElement",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mix() from the server but mix is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mix",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixColor() from the server but mixColor is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixColor",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixLinearColor() from the server but mixLinearColor is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixLinearColor",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getMixer() from the server but getMixer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getMixer",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixArray() from the server but mixArray is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixArray",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixComplex() from the server but mixComplex is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixComplex",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixObject() from the server but mixObject is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixObject",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixImmediate() from the server but mixImmediate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixImmediate",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixNumber() from the server but mixNumber is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixNumber",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call invisibleValues() from the server but invisibleValues is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "invisibleValues",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mixVisibility() from the server but mixVisibility is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mixVisibility",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call resolveElements() from the server but resolveElements is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "resolveElements",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call supportsFlags() from the server but supportsFlags is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "supportsFlags",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call supportsLinearEasing() from the server but supportsLinearEasing is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "supportsLinearEasing",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call supportsScrollTimeline() from the server but supportsScrollTimeline is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "supportsScrollTimeline",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call transform() from the server but transform is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "transform",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call MotionValue() from the server but MotionValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "MotionValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call collectMotionValues() from the server but collectMotionValues is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "collectMotionValues",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call motionValue() from the server but motionValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "motionValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call mapValue() from the server but mapValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "mapValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call attachSpring() from the server but attachSpring is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "attachSpring",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call springValue() from the server but springValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "springValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call transformValue() from the server but transformValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "transformValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call color() from the server but color is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "color",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call hex() from the server but hex is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "hex",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call hsla() from the server but hsla is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "hsla",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call hslaToRgba() from the server but hslaToRgba is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "hslaToRgba",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call rgbUnit() from the server but rgbUnit is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "rgbUnit",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call rgba() from the server but rgba is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "rgba",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call analyseComplexValue() from the server but analyseComplexValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "analyseComplexValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call complex() from the server but complex is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "complex",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call dimensionValueTypes() from the server but dimensionValueTypes is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "dimensionValueTypes",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call findDimensionValueType() from the server but findDimensionValueType is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "findDimensionValueType",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call defaultValueTypes() from the server but defaultValueTypes is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "defaultValueTypes",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getDefaultValueType() from the server but getDefaultValueType is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getDefaultValueType",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call numberValueTypes() from the server but numberValueTypes is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "numberValueTypes",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call transformValueTypes() from the server but transformValueTypes is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "transformValueTypes",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call alpha() from the server but alpha is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "alpha",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call number() from the server but number is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "number",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call scale() from the server but scale is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "scale",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call degrees() from the server but degrees is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "degrees",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call percent() from the server but percent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "percent",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call progressPercentage() from the server but progressPercentage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "progressPercentage",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call px() from the server but px is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "px",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call vh() from the server but vh is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "vh",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call vw() from the server but vw is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "vw",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call testValueType() from the server but testValueType is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "testValueType",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getAnimatableNone() from the server but getAnimatableNone is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getAnimatableNone",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call findValueType() from the server but findValueType is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "findValueType",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call getValueAsType() from the server but getValueAsType is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "getValueAsType",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call isMotionValue() from the server but isMotionValue is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "isMotionValue",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call ViewTransitionBuilder() from the server but ViewTransitionBuilder is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "ViewTransitionBuilder",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call animateView() from the server but animateView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "animateView",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call cancelSync() from the server but cancelSync is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "cancelSync",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call sync() from the server but sync is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "sync",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call cancelFrame() from the server but cancelFrame is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "cancelFrame",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call frame() from the server but frame is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "frame",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call frameData() from the server but frameData is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "frameData",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call frameSteps() from the server but frameSteps is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "frameSteps",
        ),
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call Reorder() from the server but Reorder is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\motion@12.18.1_react-dom@18.3.1_react@18.3.1__react@18.3.1\\node_modules\\motion\\dist\\es\\motion\\lib\\react.mjs",
          "Reorder",
        );
    },
  });
//# sourceMappingURL=4292.js.map
