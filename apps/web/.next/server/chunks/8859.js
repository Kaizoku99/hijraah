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
    (e._sentryDebugIds[t] = "338b85f8-37c7-4c04-9354-6bca6d4f66aa"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-338b85f8-37c7-4c04-9354-6bca6d4f66aa"));
} catch (e) {}
("use strict");
(exports.id = 8859),
  (exports.ids = [8859]),
  (exports.modules = {
    18047: (e, t, n) => {
      n.d(t, { A: () => u, q: () => i });
      var r = n(84205),
        o = n(61268);
      function i(e, t) {
        let n = r.createContext(t),
          i = (e) => {
            let { children: t, ...i } = e,
              u = r.useMemo(() => i, Object.values(i));
            return (0, o.jsx)(n.Provider, { value: u, children: t });
          };
        return (
          (i.displayName = e + "Provider"),
          [
            i,
            function (o) {
              let i = r.useContext(n);
              if (i) return i;
              if (void 0 !== t) return t;
              throw Error(`\`${o}\` must be used within \`${e}\``);
            },
          ]
        );
      }
      function u(e, t = []) {
        let n = [],
          i = () => {
            let t = n.map((e) => r.createContext(e));
            return function (n) {
              let o = n?.[e] || t;
              return r.useMemo(
                () => ({ [`__scope${e}`]: { ...n, [e]: o } }),
                [n, o],
              );
            };
          };
        return (
          (i.scopeName = e),
          [
            function (t, i) {
              let u = r.createContext(i),
                l = n.length;
              n = [...n, i];
              let s = (t) => {
                let { scope: n, children: i, ...s } = t,
                  a = n?.[e]?.[l] || u,
                  c = r.useMemo(() => s, Object.values(s));
                return (0, o.jsx)(a.Provider, { value: c, children: i });
              };
              return (
                (s.displayName = t + "Provider"),
                [
                  s,
                  function (n, o) {
                    let s = o?.[e]?.[l] || u,
                      a = r.useContext(s);
                    if (a) return a;
                    if (void 0 !== i) return i;
                    throw Error(`\`${n}\` must be used within \`${t}\``);
                  },
                ]
              );
            },
            (function (...e) {
              let t = e[0];
              if (1 === e.length) return t;
              let n = () => {
                let n = e.map((e) => ({
                  useScope: e(),
                  scopeName: e.scopeName,
                }));
                return function (e) {
                  let o = n.reduce((t, { useScope: n, scopeName: r }) => {
                    let o = n(e)[`__scope${r}`];
                    return { ...t, ...o };
                  }, {});
                  return r.useMemo(
                    () => ({ [`__scope${t.scopeName}`]: o }),
                    [o],
                  );
                };
              };
              return (n.scopeName = t.scopeName), n;
            })(i, ...t),
          ]
        );
      }
    },
    28777: (e, t, n) => {
      n.d(t, { m: () => r });
      function r(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
        return function (r) {
          if ((e?.(r), !1 === n || !r.defaultPrevented)) return t?.(r);
        };
      }
    },
    48705: (e, t, n) => {
      n.d(t, { i: () => l });
      var r,
        o = n(84205),
        i = n(66130),
        u =
          (r || (r = n.t(o, 2)))[" useInsertionEffect ".trim().toString()] ||
          i.N;
      function l({
        prop: e,
        defaultProp: t,
        onChange: n = () => {},
        caller: r,
      }) {
        let [i, l, s] = (function ({ defaultProp: e, onChange: t }) {
            let [n, r] = o.useState(e),
              i = o.useRef(n),
              l = o.useRef(t);
            return (
              u(() => {
                l.current = t;
              }, [t]),
              o.useEffect(() => {
                i.current !== n && (l.current?.(n), (i.current = n));
              }, [n, i]),
              [n, r, l]
            );
          })({ defaultProp: t, onChange: n }),
          a = void 0 !== e,
          c = a ? e : i;
        {
          let t = o.useRef(void 0 !== e);
          o.useEffect(() => {
            let e = t.current;
            if (e !== a) {
              let t = a ? "controlled" : "uncontrolled";
              console.warn(
                `${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
              );
            }
            t.current = a;
          }, [a, r]);
        }
        return [
          c,
          o.useCallback(
            (t) => {
              if (a) {
                let n = "function" == typeof t ? t(e) : t;
                n !== e && s.current?.(n);
              } else l(t);
            },
            [a, e, l, s],
          ),
        ];
      }
      Symbol("RADIX:SYNC_STATE");
    },
    63961: (e, t, n) => {
      n.d(t, { TL: () => u });
      var r = n(84205),
        o = n(71604),
        i = n(61268);
      function u(e) {
        let t = (function (e) {
            let t = r.forwardRef((e, t) => {
              let { children: n, ...i } = e;
              if (r.isValidElement(n)) {
                var u;
                let e,
                  l,
                  s =
                    ((u = n),
                    (l =
                      (e = Object.getOwnPropertyDescriptor(
                        u.props,
                        "ref",
                      )?.get) &&
                      "isReactWarning" in e &&
                      e.isReactWarning)
                      ? u.ref
                      : (l =
                            (e = Object.getOwnPropertyDescriptor(
                              u,
                              "ref",
                            )?.get) &&
                            "isReactWarning" in e &&
                            e.isReactWarning)
                        ? u.props.ref
                        : u.props.ref || u.ref),
                  a = (function (e, t) {
                    let n = { ...t };
                    for (let r in t) {
                      let o = e[r],
                        i = t[r];
                      /^on[A-Z]/.test(r)
                        ? o && i
                          ? (n[r] = (...e) => {
                              let t = i(...e);
                              return o(...e), t;
                            })
                          : o && (n[r] = o)
                        : "style" === r
                          ? (n[r] = { ...o, ...i })
                          : "className" === r &&
                            (n[r] = [o, i].filter(Boolean).join(" "));
                    }
                    return { ...e, ...n };
                  })(i, n.props);
                return (
                  n.type !== r.Fragment && (a.ref = t ? (0, o.t)(t, s) : s),
                  r.cloneElement(n, a)
                );
              }
              return r.Children.count(n) > 1 ? r.Children.only(null) : null;
            });
            return (t.displayName = `${e}.SlotClone`), t;
          })(e),
          n = r.forwardRef((e, n) => {
            let { children: o, ...u } = e,
              l = r.Children.toArray(o),
              a = l.find(s);
            if (a) {
              let e = a.props.children,
                o = l.map((t) =>
                  t !== a
                    ? t
                    : r.Children.count(e) > 1
                      ? r.Children.only(null)
                      : r.isValidElement(e)
                        ? e.props.children
                        : null,
                );
              return (0, i.jsx)(t, {
                ...u,
                ref: n,
                children: r.isValidElement(e)
                  ? r.cloneElement(e, void 0, o)
                  : null,
              });
            }
            return (0, i.jsx)(t, { ...u, ref: n, children: o });
          });
        return (n.displayName = `${e}.Slot`), n;
      }
      var l = Symbol("radix.slottable");
      function s(e) {
        return (
          r.isValidElement(e) &&
          "function" == typeof e.type &&
          "__radixId" in e.type &&
          e.type.__radixId === l
        );
      }
    },
    66130: (e, t, n) => {
      n.d(t, { N: () => o });
      var r = n(84205),
        o = globalThis?.document ? r.useLayoutEffect : () => {};
    },
    71604: (e, t, n) => {
      n.d(t, { s: () => u, t: () => i });
      var r = n(84205);
      function o(e, t) {
        if ("function" == typeof e) return e(t);
        null != e && (e.current = t);
      }
      function i(...e) {
        return (t) => {
          let n = !1,
            r = e.map((e) => {
              let r = o(e, t);
              return n || "function" != typeof r || (n = !0), r;
            });
          if (n)
            return () => {
              for (let t = 0; t < r.length; t++) {
                let n = r[t];
                "function" == typeof n ? n() : o(e[t], null);
              }
            };
        };
      }
      function u(...e) {
        return r.useCallback(i(...e), e);
      }
    },
    78593: (e, t, n) => {
      n.d(t, { hO: () => s, sG: () => l });
      var r = n(84205),
        o = n(90304),
        i = n(63961),
        u = n(61268),
        l = [
          "a",
          "button",
          "div",
          "form",
          "h2",
          "h3",
          "img",
          "input",
          "label",
          "li",
          "nav",
          "ol",
          "p",
          "select",
          "span",
          "svg",
          "ul",
        ].reduce((e, t) => {
          let n = (0, i.TL)(`Primitive.${t}`),
            o = r.forwardRef((e, r) => {
              let { asChild: o, ...i } = e;
              return (
                "undefined" != typeof window &&
                  (window[Symbol.for("radix-ui")] = !0),
                (0, u.jsx)(o ? n : t, { ...i, ref: r })
              );
            });
          return (o.displayName = `Primitive.${t}`), { ...e, [t]: o };
        }, {});
      function s(e, t) {
        e && o.flushSync(() => e.dispatchEvent(t));
      }
    },
    94653: (e, t, n) => {
      n.d(t, { C: () => u });
      var r = n(84205),
        o = n(71604),
        i = n(66130),
        u = (e) => {
          let { present: t, children: n } = e,
            u = (function (e) {
              var t, n;
              let [o, u] = r.useState(),
                s = r.useRef(null),
                a = r.useRef(e),
                c = r.useRef("none"),
                [d, f] =
                  ((t = e ? "mounted" : "unmounted"),
                  (n = {
                    mounted: {
                      UNMOUNT: "unmounted",
                      ANIMATION_OUT: "unmountSuspended",
                    },
                    unmountSuspended: {
                      MOUNT: "mounted",
                      ANIMATION_END: "unmounted",
                    },
                    unmounted: { MOUNT: "mounted" },
                  }),
                  r.useReducer((e, t) => n[e][t] ?? e, t));
              return (
                r.useEffect(() => {
                  let e = l(s.current);
                  c.current = "mounted" === d ? e : "none";
                }, [d]),
                (0, i.N)(() => {
                  let t = s.current,
                    n = a.current;
                  if (n !== e) {
                    let r = c.current,
                      o = l(t);
                    e
                      ? f("MOUNT")
                      : "none" === o || t?.display === "none"
                        ? f("UNMOUNT")
                        : n && r !== o
                          ? f("ANIMATION_OUT")
                          : f("UNMOUNT"),
                      (a.current = e);
                  }
                }, [e, f]),
                (0, i.N)(() => {
                  if (o) {
                    let e,
                      t = o.ownerDocument.defaultView ?? window,
                      n = (n) => {
                        let r = l(s.current).includes(n.animationName);
                        if (
                          n.target === o &&
                          r &&
                          (f("ANIMATION_END"), !a.current)
                        ) {
                          let n = o.style.animationFillMode;
                          (o.style.animationFillMode = "forwards"),
                            (e = t.setTimeout(() => {
                              "forwards" === o.style.animationFillMode &&
                                (o.style.animationFillMode = n);
                            }));
                        }
                      },
                      r = (e) => {
                        e.target === o && (c.current = l(s.current));
                      };
                    return (
                      o.addEventListener("animationstart", r),
                      o.addEventListener("animationcancel", n),
                      o.addEventListener("animationend", n),
                      () => {
                        t.clearTimeout(e),
                          o.removeEventListener("animationstart", r),
                          o.removeEventListener("animationcancel", n),
                          o.removeEventListener("animationend", n);
                      }
                    );
                  }
                  f("ANIMATION_END");
                }, [o, f]),
                {
                  isPresent: ["mounted", "unmountSuspended"].includes(d),
                  ref: r.useCallback((e) => {
                    (s.current = e ? getComputedStyle(e) : null), u(e);
                  }, []),
                }
              );
            })(t),
            s =
              "function" == typeof n
                ? n({ present: u.isPresent })
                : r.Children.only(n),
            a = (0, o.s)(
              u.ref,
              (function (e) {
                let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
                  n = t && "isReactWarning" in t && t.isReactWarning;
                return n
                  ? e.ref
                  : (n =
                        (t = Object.getOwnPropertyDescriptor(e, "ref")?.get) &&
                        "isReactWarning" in t &&
                        t.isReactWarning)
                    ? e.props.ref
                    : e.props.ref || e.ref;
              })(s),
            );
          return "function" == typeof n || u.isPresent
            ? r.cloneElement(s, { ref: a })
            : null;
        };
      function l(e) {
        return e?.animationName || "none";
      }
      u.displayName = "Presence";
    },
  });
//# sourceMappingURL=8859.js.map
