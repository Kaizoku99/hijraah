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
    (e._sentryDebugIds[t] = "73bc6437-04b1-4178-bf96-bf8b0ce6228b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-73bc6437-04b1-4178-bf96-bf8b0ce6228b"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [38],
  {
    26653: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => tx });
      var r = s(30602),
        n = s(1756),
        i = s(41960),
        l = s(85218),
        a = s(8761),
        o = s(7541),
        d = s(81675),
        c = s(32250);
      let u = (0, c.createServerReference)(
        "40735dc6111b525c561108795f1f8685d756e21bff",
        c.callServer,
        void 0,
        c.findSourceMapURL,
        "updateChatVisibility",
      );
      function x(e) {
        var t;
        let { chatId: s, initialVisibility: r } = e,
          { mutate: n, cache: i } = (0, a.iX)(),
          d = null == (t = i.get("/api/history")) ? void 0 : t.data,
          { data: c, mutate: x } = (0, o.Ay)(
            "".concat(s, "-visibility"),
            null,
            { fallbackData: r },
          );
        return {
          visibilityType: (0, l.useMemo)(() => {
            if (!d) return c;
            let e = d.find((e) => e.id === s);
            return e ? e.visibility : "private";
          }, [d, s, c]),
          setVisibilityType: (e) => {
            x(e),
              n(
                "/api/history",
                (t) =>
                  t
                    ? t.map((t) => (t.id === s ? { ...t, visibility: e } : t))
                    : [],
                { revalidate: !1 },
              ),
              u({ chatId: s, visibility: e });
          },
        };
      }
      var m = s(30311),
        h = s(16125),
        p = s(97687),
        g = s.n(p),
        f = s(86990),
        v = s(5271);
      let j = (e) => {
          let { size: t = 17 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M8 1L16 15H0L8 1Z",
              fill: "currentColor",
            }),
          });
        },
        C = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M14.5 13.5V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H12C13.3807 16 14.5 14.8807 14.5 13.5ZM13 13.5V6.5H9.5H8V5V1.5H3V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5ZM9.5 5V2.12132L12.3787 5H9.5ZM5.13 5.00062H4.505V6.25062H5.13H6H6.625V5.00062H6H5.13ZM4.505 8H5.13H11H11.625V9.25H11H5.13H4.505V8ZM5.13 11H4.505V12.25H5.13H11H11.625V11H11H5.13Z",
              fill: "currentColor",
            }),
          });
        },
        b = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsxs)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: [
              (0, r.jsxs)("g", {
                clipPath: "url(#clip0_2393_1490)",
                children: [
                  (0, r.jsx)("path", {
                    d: "M8 0V4",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.5",
                    d: "M8 16V12",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.9",
                    d: "M3.29773 1.52783L5.64887 4.7639",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.1",
                    d: "M12.7023 1.52783L10.3511 4.7639",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.4",
                    d: "M12.7023 14.472L10.3511 11.236",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.6",
                    d: "M3.29773 14.472L5.64887 11.236",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.2",
                    d: "M15.6085 5.52783L11.8043 6.7639",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.7",
                    d: "M0.391602 10.472L4.19583 9.23598",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.3",
                    d: "M15.6085 10.4722L11.8043 9.2361",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                  (0, r.jsx)("path", {
                    opacity: "0.8",
                    d: "M0.391602 5.52783L4.19583 6.7639",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                  }),
                ],
              }),
              (0, r.jsx)("defs", {
                children: (0, r.jsx)("clipPath", {
                  id: "clip0_2393_1490",
                  children: (0, r.jsx)("rect", {
                    width: "16",
                    height: "16",
                    fill: "white",
                  }),
                }),
              }),
            ],
          });
        },
        y = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M11.75 0.189331L12.2803 0.719661L15.2803 3.71966L15.8107 4.24999L15.2803 4.78032L5.15901 14.9016C4.45575 15.6049 3.50192 16 2.50736 16H0.75H0V15.25V13.4926C0 12.4981 0.395088 11.5442 1.09835 10.841L11.2197 0.719661L11.75 0.189331ZM11.75 2.31065L9.81066 4.24999L11.75 6.18933L13.6893 4.24999L11.75 2.31065ZM2.15901 11.9016L8.75 5.31065L10.6893 7.24999L4.09835 13.841C3.67639 14.2629 3.1041 14.5 2.50736 14.5H1.5V13.4926C1.5 12.8959 1.73705 12.3236 2.15901 11.9016ZM9 16H16V14.5H9V16Z",
              fill: "currentColor",
            }),
          });
        },
        w = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z",
              fill: "currentColor",
            }),
          });
        },
        N = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M3 3H13V13H3V3Z",
              fill: "currentColor",
            }),
          });
        },
        L = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            className: "-rotate-45",
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M10.8591 1.70735C10.3257 1.70735 9.81417 1.91925 9.437 2.29643L3.19455 8.53886C2.56246 9.17095 2.20735 10.0282 2.20735 10.9222C2.20735 11.8161 2.56246 12.6734 3.19455 13.3055C3.82665 13.9376 4.68395 14.2927 5.57786 14.2927C6.47178 14.2927 7.32908 13.9376 7.96117 13.3055L14.2036 7.06304L14.7038 6.56287L15.7041 7.56321L15.204 8.06337L8.96151 14.3058C8.06411 15.2032 6.84698 15.7074 5.57786 15.7074C4.30875 15.7074 3.09162 15.2032 2.19422 14.3058C1.29682 13.4084 0.792664 12.1913 0.792664 10.9222C0.792664 9.65305 1.29682 8.43592 2.19422 7.53852L8.43666 1.29609C9.07914 0.653606 9.95054 0.292664 10.8591 0.292664C11.7678 0.292664 12.6392 0.653606 13.2816 1.29609C13.9241 1.93857 14.2851 2.80997 14.2851 3.71857C14.2851 4.62718 13.9241 5.49858 13.2816 6.14106L13.2814 6.14133L7.0324 12.3835C7.03231 12.3836 7.03222 12.3837 7.03213 12.3838C6.64459 12.7712 6.11905 12.9888 5.57107 12.9888C5.02297 12.9888 4.49731 12.7711 4.10974 12.3835C3.72217 11.9959 3.50444 11.4703 3.50444 10.9222C3.50444 10.3741 3.72217 9.8484 4.10974 9.46084L4.11004 9.46054L9.877 3.70039L10.3775 3.20051L11.3772 4.20144L10.8767 4.70131L5.11008 10.4612C5.11005 10.4612 5.11003 10.4612 5.11 10.4613C4.98779 10.5835 4.91913 10.7493 4.91913 10.9222C4.91913 11.0951 4.98782 11.2609 5.11008 11.3832C5.23234 11.5054 5.39817 11.5741 5.57107 11.5741C5.74398 11.5741 5.9098 11.5054 6.03206 11.3832L6.03233 11.3829L12.2813 5.14072C12.2814 5.14063 12.2815 5.14054 12.2816 5.14045C12.6586 4.7633 12.8704 4.25185 12.8704 3.71857C12.8704 3.18516 12.6585 2.6736 12.2813 2.29643C11.9041 1.91925 11.3926 1.70735 10.8591 1.70735Z",
              fill: "currentColor",
            }),
          });
        },
        k = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M2.8914 10.4028L2.98327 10.6318C3.22909 11.2445 3.5 12.1045 3.5 13C3.5 13.3588 3.4564 13.7131 3.38773 14.0495C3.69637 13.9446 4.01409 13.8159 4.32918 13.6584C4.87888 13.3835 5.33961 13.0611 5.70994 12.7521L6.22471 12.3226L6.88809 12.4196C7.24851 12.4724 7.61994 12.5 8 12.5C11.7843 12.5 14.5 9.85569 14.5 7C14.5 4.14431 11.7843 1.5 8 1.5C4.21574 1.5 1.5 4.14431 1.5 7C1.5 8.18175 1.94229 9.29322 2.73103 10.2153L2.8914 10.4028ZM2.8135 15.7653C1.76096 16 1 16 1 16C1 16 1.43322 15.3097 1.72937 14.4367C1.88317 13.9834 2 13.4808 2 13C2 12.3826 1.80733 11.7292 1.59114 11.1903C0.591845 10.0221 0 8.57152 0 7C0 3.13401 3.58172 0 8 0C12.4183 0 16 3.13401 16 7C16 10.866 12.4183 14 8 14C7.54721 14 7.10321 13.9671 6.67094 13.9038C6.22579 14.2753 5.66881 14.6656 5 15C4.23366 15.3832 3.46733 15.6195 2.8135 15.7653Z",
              fill: "currentColor",
            }),
          });
        },
        V = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z",
              fill: "currentColor",
            }),
          });
        },
        H = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M6.245 2.5H14.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H6.245V2.5ZM4.995 2.5H1.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H4.995V2.5ZM0 1H1.5H14.5H16V2.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V2.5V1Z",
              fill: "currentColor",
            }),
          });
        },
        T = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z",
              fill: "currentColor",
            }),
          });
        },
        M = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z",
              fill: "currentColor",
            }),
          });
        },
        R = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M6.89531 2.23972C6.72984 2.12153 6.5 2.23981 6.5 2.44315V5.25001C6.5 6.21651 5.7165 7.00001 4.75 7.00001H2.5V13.5H12.1884C12.762 13.5 13.262 13.1096 13.4011 12.5532L14.4011 8.55318C14.5984 7.76425 14.0017 7.00001 13.1884 7.00001H9.25H8.5V6.25001V3.51458C8.5 3.43384 8.46101 3.35807 8.39531 3.31114L6.89531 2.23972ZM5 2.44315C5 1.01975 6.6089 0.191779 7.76717 1.01912L9.26717 2.09054C9.72706 2.41904 10 2.94941 10 3.51458V5.50001H13.1884C14.9775 5.50001 16.2903 7.18133 15.8563 8.91698L14.8563 12.917C14.5503 14.1412 13.4503 15 12.1884 15H1.75H1V14.25V6.25001V5.50001H1.75H4.75C4.88807 5.50001 5 5.38808 5 5.25001V2.44315Z",
              fill: "currentColor",
            }),
          });
        },
        I = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M6.89531 13.7603C6.72984 13.8785 6.5 13.7602 6.5 13.5569V10.75C6.5 9.7835 5.7165 9 4.75 9H2.5V2.5H12.1884C12.762 2.5 13.262 2.89037 13.4011 3.44683L14.4011 7.44683C14.5984 8.23576 14.0017 9 13.1884 9H9.25H8.5V9.75V12.4854C8.5 12.5662 8.46101 12.6419 8.39531 12.6889L6.89531 13.7603ZM5 13.5569C5 14.9803 6.6089 15.8082 7.76717 14.9809L9.26717 13.9095C9.72706 13.581 10 13.0506 10 12.4854V10.5H13.1884C14.9775 10.5 16.2903 8.81868 15.8563 7.08303L14.8563 3.08303C14.5503 1.85882 13.4503 1 12.1884 1H1.75H1V1.75V9.75V10.5H1.75H4.75C4.88807 10.5 5 10.6119 5 10.75V13.5569Z",
              fill: "currentColor",
            }),
          });
        },
        S = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z",
              fill: "currentColor",
            }),
          });
        },
        z = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsxs)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: [
              (0, r.jsx)("path", {
                d: "M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z",
                fill: "currentColor",
              }),
              (0, r.jsx)("path", {
                d: "M14.5 4.5V5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H12V3V2.5H12.5C13.0523 2.5 13.5 2.05228 13.5 1.5V1H14H14.5V1.5C14.5 2.05228 14.9477 2.5 15.5 2.5H16V3V3.5H15.5C14.9477 3.5 14.5 3.94772 14.5 4.5Z",
                fill: "currentColor",
              }),
              (0, r.jsx)("path", {
                d: "M8.40706 4.92939L8.5 4H9.5L9.59294 4.92939C9.82973 7.29734 11.7027 9.17027 14.0706 9.40706L15 9.5V10.5L14.0706 10.5929C11.7027 10.8297 9.82973 12.7027 9.59294 15.0706L9.5 16H8.5L8.40706 15.0706C8.17027 12.7027 6.29734 10.8297 3.92939 10.5929L3 10.5V9.5L3.92939 9.40706C6.29734 9.17027 8.17027 7.29734 8.40706 4.92939Z",
                fill: "currentColor",
              }),
            ],
          });
        },
        Z = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z",
              fill: "currentColor",
            }),
          });
        },
        _ = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M14.5 2.5H1.5V9.18933L2.96966 7.71967L3.18933 7.5H3.49999H6.63001H6.93933L6.96966 7.46967L10.4697 3.96967L11.5303 3.96967L14.5 6.93934V2.5ZM8.00066 8.55999L9.53034 10.0897L10.0607 10.62L9.00001 11.6807L8.46968 11.1503L6.31935 9H3.81065L1.53032 11.2803L1.5 11.3106V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5V9.06066L11 5.56066L8.03032 8.53033L8.00066 8.55999ZM4.05312e-06 10.8107V12.5C4.05312e-06 13.8807 1.11929 15 2.5 15H13.5C14.8807 15 16 13.8807 16 12.5V9.56066L16.5607 9L16.0303 8.46967L16 8.43934V2.5V1H14.5H1.5H4.05312e-06V2.5V10.6893L-0.0606689 10.75L4.05312e-06 10.8107Z",
              fill: "currentColor",
            }),
          });
        },
        A = (e) => {
          let { size: t = 16 } = e;
          return (0, r.jsx)("svg", {
            height: t,
            strokeLinejoin: "round",
            viewBox: "0 0 16 16",
            width: t,
            style: { color: "currentcolor" },
            children: (0, r.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M1 5.25V6H2.5V5.25V2.5H5.25H6V1H5.25H2C1.44772 1 1 1.44772 1 2V5.25ZM5.25 14.9994H6V13.4994H5.25H2.5V10.7494V9.99939H1V10.7494V13.9994C1 14.5517 1.44772 14.9994 2 14.9994H5.25ZM15 10V10.75V14C15 14.5523 14.5523 15 14 15H10.75H10V13.5H10.75H13.5V10.75V10H15ZM10.75 1H10V2.5H10.75H13.5V5.25V6H15V5.25V2C15 1.44772 14.5523 1 14 1H10.75Z",
              fill: "currentColor",
            }),
          });
        };
      var E = s(28864),
        D = s(15200),
        B = s(36839),
        F = s(59487),
        P = s(78137);
      let W = [
          {
            id: "gpt-4o",
            name: "GPT-4o",
            provider: "OpenAI",
            description: "Most capable model for chat and reasoning",
          },
          {
            id: "claude-3-opus-20240229",
            name: "Claude 3 Opus",
            provider: "Anthropic",
            description: "Highest quality model with advanced reasoning",
          },
          {
            id: "claude-3-sonnet-20240229",
            name: "Claude 3 Sonnet",
            provider: "Anthropic",
            description: "Excellent balance of intelligence and speed",
          },
          {
            id: "gemini-1.0-pro",
            name: "Gemini Pro",
            provider: "Google",
            description: "Google's most capable model for chat",
          },
          {
            id: "deepseek-chat",
            name: "DeepSeek",
            provider: "DeepSeek",
            description: "Open model with strong reasoning capabilities",
          },
          {
            id: "mixtral-8x7b-instruct",
            name: "Mixtral 8x7B",
            provider: "Mixtral",
            description: "Open model with good performance",
          },
        ],
        $ = [
          {
            id: "gpt-4-turbo",
            name: "GPT-4 Turbo",
            provider: "OpenAI",
            description: "Most reliable model for complex reasoning",
          },
          {
            id: "claude-3-opus-20240229",
            name: "Claude 3 Opus",
            provider: "Anthropic",
            description: "Highest quality model with advanced reasoning",
          },
          {
            id: "claude-3-sonnet-20240229",
            name: "Claude 3 Sonnet",
            provider: "Anthropic",
            description: "Excellent balance of intelligence and speed",
          },
        ];
      function O(e) {
        let {
            types: t = ["chat", "reasoning"],
            onChatModelSelect: s,
            onReasoningModelSelect: n,
            className: i,
            ...a
          } = e,
          o = (0, D.useCookies)(),
          d = o.get("preferred-chat-model") || "gpt-4o",
          c = o.get("preferred-reasoning-model") || "gpt-4-turbo",
          [u, x] = l.useState(!1),
          [h, p] = l.useState(!1),
          [g, f] = l.useState(W.find((e) => e.id === d) || W[0]),
          [j, C] = l.useState($.find((e) => e.id === c) || $[0]),
          b = (e) => {
            f(e), x(!1);
            try {
              o.set("preferred-chat-model", e.id), s && s(e.id);
            } catch (e) {
              console.error("Failed to save model preference:", e),
                B.oR.error("Failed to save model preference");
            }
          },
          y = (e) => {
            C(e), p(!1);
            try {
              o.set("preferred-reasoning-model", e.id), n && n(e.id);
            } catch (e) {
              console.error("Failed to save model preference:", e),
                B.oR.error("Failed to save model preference");
            }
          };
        return (0, r.jsxs)("div", {
          className: (0, m.cn)("flex flex-wrap gap-2 items-center", i),
          children: [
            t.includes("chat") &&
              (0, r.jsxs)(P.AM, {
                open: u,
                onOpenChange: x,
                ...a,
                children: [
                  (0, r.jsx)(P.Wv, {
                    asChild: !0,
                    children: (0, r.jsxs)(v.$, {
                      variant: "outline",
                      role: "combobox",
                      "aria-expanded": u,
                      "aria-label": "Select a chat model",
                      className: "justify-between min-w-[200px]",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex items-center gap-2 truncate",
                          children: [
                            (0, r.jsx)("span", {
                              className: "truncate",
                              children: g.name,
                            }),
                            g.provider &&
                              (0, r.jsxs)("span", {
                                className:
                                  "text-xs text-muted-foreground truncate",
                                children: ["(", g.provider, ")"],
                              }),
                          ],
                        }),
                        (0, r.jsx)(E.TBE, {
                          className: "ml-2 h-4 w-4 shrink-0 opacity-50",
                        }),
                      ],
                    }),
                  }),
                  (0, r.jsx)(P.hl, {
                    className: "w-[250px] p-0",
                    align: "start",
                    children: (0, r.jsxs)(F.uB, {
                      children: [
                        (0, r.jsx)(F.G7, {
                          placeholder: "Search models...",
                          className: "h-9",
                        }),
                        (0, r.jsxs)(F.oI, {
                          children: [
                            (0, r.jsx)(F.xL, { children: "No models found." }),
                            (0, r.jsx)(F.L$, {
                              children: W.map((e) =>
                                (0, r.jsx)(
                                  F.h_,
                                  {
                                    value: e.id,
                                    onSelect: () => b(e),
                                    children: (0, r.jsxs)("div", {
                                      className: "flex flex-col",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          className: "flex items-center",
                                          children: [
                                            (0, r.jsx)("span", {
                                              className: "mr-2",
                                              children: e.name,
                                            }),
                                            e.provider &&
                                              (0, r.jsxs)("span", {
                                                className:
                                                  "text-xs text-muted-foreground",
                                                children: [
                                                  "(",
                                                  e.provider,
                                                  ")",
                                                ],
                                              }),
                                            (0, r.jsx)(E.Srz, {
                                              className: (0, m.cn)(
                                                "ml-auto h-4 w-4",
                                                g.id === e.id
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              ),
                                            }),
                                          ],
                                        }),
                                        e.description &&
                                          (0, r.jsx)("span", {
                                            className:
                                              "text-xs text-muted-foreground",
                                            children: e.description,
                                          }),
                                      ],
                                    }),
                                  },
                                  e.id,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            t.includes("reasoning") &&
              (0, r.jsxs)(P.AM, {
                open: h,
                onOpenChange: p,
                ...a,
                children: [
                  (0, r.jsx)(P.Wv, {
                    asChild: !0,
                    children: (0, r.jsxs)(v.$, {
                      variant: "outline",
                      role: "combobox",
                      "aria-expanded": h,
                      "aria-label": "Select a reasoning model",
                      className: "justify-between min-w-[200px]",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex items-center gap-2 truncate",
                          children: [
                            (0, r.jsx)("span", {
                              className: "truncate",
                              children: j.name,
                            }),
                            j.provider &&
                              (0, r.jsxs)("span", {
                                className:
                                  "text-xs text-muted-foreground truncate",
                                children: ["(", j.provider, ")"],
                              }),
                          ],
                        }),
                        (0, r.jsx)(E.TBE, {
                          className: "ml-2 h-4 w-4 shrink-0 opacity-50",
                        }),
                      ],
                    }),
                  }),
                  (0, r.jsx)(P.hl, {
                    className: "w-[250px] p-0",
                    align: "start",
                    children: (0, r.jsxs)(F.uB, {
                      children: [
                        (0, r.jsx)(F.G7, {
                          placeholder: "Search models...",
                          className: "h-9",
                        }),
                        (0, r.jsxs)(F.oI, {
                          children: [
                            (0, r.jsx)(F.xL, { children: "No models found." }),
                            (0, r.jsx)(F.L$, {
                              children: $.map((e) =>
                                (0, r.jsx)(
                                  F.h_,
                                  {
                                    value: e.id,
                                    onSelect: () => y(e),
                                    children: (0, r.jsxs)("div", {
                                      className: "flex flex-col",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          className: "flex items-center",
                                          children: [
                                            (0, r.jsx)("span", {
                                              className: "mr-2",
                                              children: e.name,
                                            }),
                                            e.provider &&
                                              (0, r.jsxs)("span", {
                                                className:
                                                  "text-xs text-muted-foreground",
                                                children: [
                                                  "(",
                                                  e.provider,
                                                  ")",
                                                ],
                                              }),
                                            (0, r.jsx)(E.Srz, {
                                              className: (0, m.cn)(
                                                "ml-auto h-4 w-4",
                                                j.id === e.id
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              ),
                                            }),
                                          ],
                                        }),
                                        e.description &&
                                          (0, r.jsx)("span", {
                                            className:
                                              "text-xs text-muted-foreground",
                                            children: e.description,
                                          }),
                                      ],
                                    }),
                                  },
                                  e.id,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
          ],
        });
      }
      var U = s(60211),
        G = s(9795);
      function q(e) {
        let { className: t } = e,
          { toggleSidebar: s } = (0, U.cL)();
        return (0, r.jsxs)(G.m_, {
          children: [
            (0, r.jsx)(G.k$, {
              asChild: !0,
              children: (0, r.jsx)(v.$, {
                onClick: s,
                variant: "outline",
                className: "md:px-2 md:h-fit",
                children: (0, r.jsx)(H, { size: 16 }),
              }),
            }),
            (0, r.jsx)(G.ZI, { align: "start", children: "Toggle Sidebar" }),
          ],
        });
      }
      var K = s(74879);
      let Q = [
        {
          id: "private",
          label: "Private",
          description: "Only you can access this chat",
          icon: (0, r.jsx)((e) => {
            let { size: t = 16 } = e;
            return (0, r.jsx)("svg", {
              height: t,
              strokeLinejoin: "round",
              viewBox: "0 0 16 16",
              width: t,
              style: { color: "currentcolor" },
              children: (0, r.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M10 4.5V6H6V4.5C6 3.39543 6.89543 2.5 8 2.5C9.10457 2.5 10 3.39543 10 4.5ZM4.5 6V4.5C4.5 2.567 6.067 1 8 1C9.933 1 11.5 2.567 11.5 4.5V6H12.5H14V7.5V12.5C14 13.8807 12.8807 15 11.5 15H4.5C3.11929 15 2 13.8807 2 12.5V7.5V6H3.5H4.5ZM11.5 7.5H10H6H4.5H3.5V12.5C3.5 13.0523 3.94772 13.5 4.5 13.5H11.5C12.0523 13.5 12.5 13.0523 12.5 12.5V7.5H11.5Z",
                fill: "currentColor",
              }),
            });
          }, {}),
        },
        {
          id: "public",
          label: "Public",
          description: "Anyone with the link can access this chat",
          icon: (0, r.jsx)((e) => {
            let { size: t = 16 } = e;
            return (0, r.jsx)("svg", {
              height: t,
              strokeLinejoin: "round",
              viewBox: "0 0 16 16",
              width: t,
              style: { color: "currentcolor" },
              children: (0, r.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M10.268 14.0934C11.9051 13.4838 13.2303 12.2333 13.9384 10.6469C13.1192 10.7941 12.2138 10.9111 11.2469 10.9925C11.0336 12.2005 10.695 13.2621 10.268 14.0934ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.48347 14.4823C8.32384 14.494 8.16262 14.5 8 14.5C7.83738 14.5 7.67616 14.494 7.51654 14.4823C7.5132 14.4791 7.50984 14.4759 7.50647 14.4726C7.2415 14.2165 6.94578 13.7854 6.67032 13.1558C6.41594 12.5744 6.19979 11.8714 6.04101 11.0778C6.67605 11.1088 7.33104 11.125 8 11.125C8.66896 11.125 9.32395 11.1088 9.95899 11.0778C9.80021 11.8714 9.58406 12.5744 9.32968 13.1558C9.05422 13.7854 8.7585 14.2165 8.49353 14.4726C8.49016 14.4759 8.4868 14.4791 8.48347 14.4823ZM11.4187 9.72246C12.5137 9.62096 13.5116 9.47245 14.3724 9.28806C14.4561 8.87172 14.5 8.44099 14.5 8C14.5 7.55901 14.4561 7.12828 14.3724 6.71194C13.5116 6.52755 12.5137 6.37904 11.4187 6.27753C11.4719 6.83232 11.5 7.40867 11.5 8C11.5 8.59133 11.4719 9.16768 11.4187 9.72246ZM10.1525 6.18401C10.2157 6.75982 10.25 7.36805 10.25 8C10.25 8.63195 10.2157 9.24018 10.1525 9.81598C9.46123 9.85455 8.7409 9.875 8 9.875C7.25909 9.875 6.53877 9.85455 5.84749 9.81598C5.7843 9.24018 5.75 8.63195 5.75 8C5.75 7.36805 5.7843 6.75982 5.84749 6.18401C6.53877 6.14545 7.25909 6.125 8 6.125C8.74091 6.125 9.46123 6.14545 10.1525 6.18401ZM11.2469 5.00748C12.2138 5.08891 13.1191 5.20593 13.9384 5.35306C13.2303 3.7667 11.9051 2.51622 10.268 1.90662C10.695 2.73788 11.0336 3.79953 11.2469 5.00748ZM8.48347 1.51771C8.4868 1.52089 8.49016 1.52411 8.49353 1.52737C8.7585 1.78353 9.05422 2.21456 9.32968 2.84417C9.58406 3.42562 9.80021 4.12856 9.95899 4.92219C9.32395 4.89118 8.66896 4.875 8 4.875C7.33104 4.875 6.67605 4.89118 6.04101 4.92219C6.19978 4.12856 6.41594 3.42562 6.67032 2.84417C6.94578 2.21456 7.2415 1.78353 7.50647 1.52737C7.50984 1.52411 7.51319 1.52089 7.51653 1.51771C7.67615 1.50597 7.83738 1.5 8 1.5C8.16262 1.5 8.32384 1.50597 8.48347 1.51771ZM5.73202 1.90663C4.0949 2.51622 2.76975 3.7667 2.06159 5.35306C2.88085 5.20593 3.78617 5.08891 4.75309 5.00748C4.96639 3.79953 5.30497 2.73788 5.73202 1.90663ZM4.58133 6.27753C3.48633 6.37904 2.48837 6.52755 1.62761 6.71194C1.54392 7.12828 1.5 7.55901 1.5 8C1.5 8.44099 1.54392 8.87172 1.62761 9.28806C2.48837 9.47245 3.48633 9.62096 4.58133 9.72246C4.52807 9.16768 4.5 8.59133 4.5 8C4.5 7.40867 4.52807 6.83232 4.58133 6.27753ZM4.75309 10.9925C3.78617 10.9111 2.88085 10.7941 2.06159 10.6469C2.76975 12.2333 4.0949 13.4838 5.73202 14.0934C5.30497 13.2621 4.96639 12.2005 4.75309 10.9925Z",
                fill: "currentColor",
              }),
            });
          }, {}),
        },
      ];
      function X(e) {
        let { chatId: t, className: s, visibility: n } = e,
          [i, a] = (0, l.useState)(!1),
          { visibilityType: o, setVisibilityType: d } = x({
            chatId: t,
            initialVisibility: n,
          }),
          c = (0, l.useMemo)(() => Q.find((e) => e.id === o), [o]);
        return (0, r.jsxs)(K.rI, {
          open: i,
          onOpenChange: a,
          children: [
            (0, r.jsx)(K.ty, {
              asChild: !0,
              className: (0, m.cn)(
                "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                s,
              ),
              children: (0, r.jsxs)(v.$, {
                variant: "outline",
                className: "hidden md:flex md:px-2 md:h-[34px]",
                children: [
                  null == c ? void 0 : c.icon,
                  null == c ? void 0 : c.label,
                  (0, r.jsx)(S, {}),
                ],
              }),
            }),
            (0, r.jsx)(K.SQ, {
              align: "start",
              className: "min-w-[300px]",
              children: Q.map((e) =>
                (0, r.jsxs)(
                  K._2,
                  {
                    onSelect: () => {
                      d(e.id), a(!1);
                    },
                    className:
                      "gap-4 group/item flex flex-row justify-between items-center",
                    "data-active": e.id === o,
                    children: [
                      (0, r.jsxs)("div", {
                        className: "flex flex-col gap-1 items-start",
                        children: [
                          e.label,
                          e.description &&
                            (0, r.jsx)("div", {
                              className: "text-xs text-muted-foreground",
                              children: e.description,
                            }),
                        ],
                      }),
                      (0, r.jsx)("div", {
                        className:
                          "text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100",
                        children: (0, r.jsx)(Z, {}),
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
          ],
        });
      }
      let Y = (0, l.memo)(
        function (e) {
          let {
              chatId: t,
              selectedModelId: s,
              visibility: n,
              isReadonly: l,
            } = e,
            a = (0, i.useRouter)(),
            { open: o } = (0, U.cL)(),
            { width: d } = (0, f.lW)();
          return (0, r.jsxs)("header", {
            className:
              "flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2",
            children: [
              (0, r.jsx)(q, {}),
              (!o || d < 768) &&
                (0, r.jsxs)(G.m_, {
                  children: [
                    (0, r.jsx)(G.k$, {
                      asChild: !0,
                      children: (0, r.jsxs)(v.$, {
                        variant: "outline",
                        className:
                          "order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0",
                        onClick: () => {
                          a.push("/"), a.refresh();
                        },
                        children: [
                          (0, r.jsx)(T, {}),
                          (0, r.jsx)("span", {
                            className: "md:sr-only",
                            children: "New Chat",
                          }),
                        ],
                      }),
                    }),
                    (0, r.jsx)(G.ZI, { children: "New Chat" }),
                  ],
                }),
              !l && (0, r.jsx)(O, { className: "order-1 md:order-2" }),
              !l &&
                (0, r.jsx)(X, {
                  chatId: t,
                  visibility: n,
                  className: "order-1 md:order-3",
                }),
              (0, r.jsx)(v.$, {
                className:
                  "bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto",
                asChild: !0,
                children: (0, r.jsx)(g(), {
                  href: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET,OPENAI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel.&demo-url=https%3A%2F%2Fchat.vercel.ai&stores=%5B%7B%22type%22:%22postgres%22%7D,%7B%22type%22:%22blob%22%7D%5D",
                  target: "_blank",
                  children: (0, r.jsxs)(r.Fragment, {
                    children: [
                      (0, r.jsx)(j, { size: 16 }),
                      "Deploy with Vercel",
                    ],
                  }),
                }),
              }),
            ],
          });
        },
        (e, t) => e.selectedModelId === t.selectedModelId,
      );
      var J = s(23780),
        ee = s.n(J),
        et = s(47067),
        es = s.n(et),
        er = s(4194),
        en = s(17957),
        ei = s(2716);
      let el = (e, t) => {
          switch (e) {
            case "create":
              return "present" === t ? "Creating" : "Created";
            case "update":
              return "present" === t ? "Updating" : "Updated";
            case "request-suggestions":
              return "present" === t
                ? "Adding suggestions"
                : "Added suggestions to";
            default:
              return null;
          }
        },
        ea = (0, l.memo)(
          function (e) {
            let { type: t, result: s, isReadonly: n } = e,
              { setArtifact: i } = (0, ei.ST)();
            return (0, r.jsxs)("button", {
              type: "button",
              className:
                "bg-background cursor-pointer border py-2 px-3 rounded-xl w-fit flex flex-row gap-3 items-start",
              onClick: (e) => {
                if (n)
                  return void B.oR.error(
                    "Viewing files in shared chats is currently not supported.",
                  );
                let t = e.currentTarget.getBoundingClientRect(),
                  r = {
                    top: t.top,
                    left: t.left,
                    width: t.width,
                    height: t.height,
                  };
                i({
                  documentId: s.id,
                  kind: s.kind,
                  content: "",
                  title: s.title,
                  isVisible: !0,
                  status: "idle",
                  boundingBox: r,
                });
              },
              children: [
                (0, r.jsx)("div", {
                  className: "text-muted-foreground mt-1",
                  children:
                    "create" === t
                      ? (0, r.jsx)(C, {})
                      : "update" === t
                        ? (0, r.jsx)(y, {})
                        : "request-suggestions" === t
                          ? (0, r.jsx)(k, {})
                          : null,
                }),
                (0, r.jsx)("div", {
                  className: "text-left",
                  children: "".concat(el(t, "past"), ' "').concat(s.title, '"'),
                }),
              ],
            });
          },
          () => !0,
        ),
        eo = (0, l.memo)(
          function (e) {
            let { type: t, args: s, isReadonly: n } = e,
              { setArtifact: i } = (0, ei.ST)();
            return (0, r.jsxs)("button", {
              type: "button",
              className:
                "cursor pointer w-fit border py-2 px-3 rounded-xl flex flex-row items-start justify-between gap-3",
              onClick: (e) => {
                if (n)
                  return void B.oR.error(
                    "Viewing files in shared chats is currently not supported.",
                  );
                let t = e.currentTarget.getBoundingClientRect(),
                  s = {
                    top: t.top,
                    left: t.left,
                    width: t.width,
                    height: t.height,
                  };
                i((e) => ({ ...e, isVisible: !0, boundingBox: s }));
              },
              children: [
                (0, r.jsxs)("div", {
                  className: "flex flex-row gap-3 items-start",
                  children: [
                    (0, r.jsx)("div", {
                      className: "text-zinc-500 mt-1",
                      children:
                        "create" === t
                          ? (0, r.jsx)(C, {})
                          : "update" === t
                            ? (0, r.jsx)(y, {})
                            : "request-suggestions" === t
                              ? (0, r.jsx)(k, {})
                              : null,
                    }),
                    (0, r.jsx)("div", {
                      className: "text-left",
                      children: ""
                        .concat(el(t, "present"), " ")
                        .concat(s.title ? '"'.concat(s.title, '"') : ""),
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: "animate-spin mt-1",
                  children: (0, r.jsx)(b, {}),
                }),
              ],
            });
          },
          () => !0,
        );
      var ed = s(11195),
        ec = s(23128),
        eu = s(97950),
        ex = s(76312),
        em = s(4872);
      let eh = (0, l.memo)(
          function (e) {
            let { content: t, onSaveContent: s, status: n } = e,
              i = (0, l.useRef)(null),
              a = (0, l.useRef)(null);
            return (
              (0, l.useEffect)(() => {
                if (i.current && !a.current) {
                  let e = ec.$t.create({
                    doc: t,
                    extensions: [em.oQ, (0, ed.Hg)(), eu.bM],
                  });
                  a.current = new ex.Lz({ state: e, parent: i.current });
                }
                return () => {
                  a.current && (a.current.destroy(), (a.current = null));
                };
              }, []),
              (0, l.useEffect)(() => {
                if (a.current) {
                  let e = ex.Lz.updateListener.of((e) => {
                      e.docChanged &&
                        e.transactions.find(
                          (e) => !e.annotation(ec.ZX.remote),
                        ) &&
                        s(e.state.doc.toString(), !0);
                    }),
                    t = a.current.state.selection,
                    r = ec.$t.create({
                      doc: a.current.state.doc,
                      extensions: [em.oQ, (0, ed.Hg)(), eu.bM, e],
                      selection: t,
                    });
                  a.current.setState(r);
                }
              }, [s]),
              (0, l.useEffect)(() => {
                if (a.current && t) {
                  let e = a.current.state.doc.toString();
                  if ("streaming" === n || e !== t) {
                    let s = a.current.state.update({
                      changes: { from: 0, to: e.length, insert: t },
                      annotations: [ec.ZX.remote.of(!0)],
                    });
                    a.current.dispatch(s);
                  }
                }
              }, [t, n]),
              (0, r.jsx)("div", {
                className: "relative not-prose w-full pb-[calc(80dvh)] text-sm",
                ref: i,
              })
            );
          },
          function (e, t) {
            return (
              e.suggestions === t.suggestions &&
              e.currentVersionIndex === t.currentVersionIndex &&
              e.isCurrentVersion === t.isCurrentVersion &&
              ("streaming" !== e.status || "streaming" !== t.status) &&
              e.content === t.content
            );
          },
        ),
        ep = () =>
          (0, r.jsxs)("div", {
            className: "flex flex-col gap-4 w-full",
            children: [
              (0, r.jsx)("div", {
                className:
                  "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-48",
              }),
              (0, r.jsx)("div", {
                className:
                  "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-3/4",
              }),
              (0, r.jsx)("div", {
                className:
                  "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-1/2",
              }),
              (0, r.jsx)("div", {
                className:
                  "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-64",
              }),
              (0, r.jsx)("div", {
                className:
                  "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-40",
              }),
              (0, r.jsx)("div", {
                className:
                  "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-36",
              }),
              (0, r.jsx)("div", {
                className:
                  "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-64",
              }),
            ],
          });
      function eg(e) {
        let { title: t, content: s, status: n, isInline: i } = e;
        return (0, r.jsx)("div", {
          className: es()("flex flex-row items-center justify-center w-full", {
            "h-[calc(100dvh-60px)]": !i,
            "h-[200px]": i,
          }),
          children:
            "streaming" === n
              ? (0, r.jsxs)("div", {
                  className: "flex flex-row gap-4 items-center",
                  children: [
                    !i &&
                      (0, r.jsx)("div", {
                        className: "animate-spin",
                        children: (0, r.jsx)(b, {}),
                      }),
                    (0, r.jsx)("div", { children: "Generating Image..." }),
                  ],
                })
              : (0, r.jsx)("picture", {
                  children: (0, r.jsx)("img", {
                    className: es()("w-full h-fit max-w-[800px]", {
                      "p-0 md:p-20": !i,
                    }),
                    src: "data:image/png;base64,".concat(s),
                    alt: t,
                  }),
                }),
        });
      }
      var ef = s(61670),
        ev = s(82541),
        ej = s(10068);
      s(95154);
      let eC = (0, l.memo)(
        (e) => {
          let {
              content: t,
              saveContent: s,
              status: n,
              isCurrentVersion: i,
            } = e,
            { theme: a } = (0, ef.D)(),
            o = (0, l.useMemo)(() => {
              if (!t) return Array(50).fill(Array(26).fill(""));
              let e = (0, ev.parse)(t, { skipEmptyLines: !0 }).data.map((e) => {
                let t = [...e];
                for (; t.length < 26; ) t.push("");
                return t;
              });
              for (; e.length < 50; ) e.push(Array(26).fill(""));
              return e;
            }, [t]),
            d = (0, l.useMemo)(
              () => [
                {
                  key: "rowNumber",
                  name: "",
                  frozen: !0,
                  width: 50,
                  renderCell: (e) => {
                    let { rowIdx: t } = e;
                    return t + 1;
                  },
                  cellClass:
                    "border-t border-r dark:bg-zinc-950 dark:text-zinc-50",
                  headerCellClass:
                    "border-t border-r dark:bg-zinc-900 dark:text-zinc-50",
                },
                ...Array.from({ length: 26 }, (e, t) => ({
                  key: t.toString(),
                  name: String.fromCharCode(65 + t),
                  renderEditCell: ej.jE,
                  width: 120,
                  cellClass: (0, m.cn)(
                    "border-t dark:bg-zinc-950 dark:text-zinc-50",
                    { "border-l": 0 !== t },
                  ),
                  headerCellClass: (0, m.cn)(
                    "border-t dark:bg-zinc-900 dark:text-zinc-50",
                    { "border-l": 0 !== t },
                  ),
                })),
              ],
              [],
            ),
            c = (0, l.useMemo)(
              () =>
                o.map((e, t) => {
                  let s = { id: t, rowNumber: t + 1 };
                  return (
                    d.slice(1).forEach((t, r) => {
                      s[t.key] = e[r] || "";
                    }),
                    s
                  );
                }),
              [o, d],
            ),
            [u, x] = (0, l.useState)(c);
          (0, l.useEffect)(() => {
            x(c);
          }, [c]);
          let h = (e) => (0, ev.unparse)(e);
          return (0, r.jsx)(ej.Ay, {
            className: "dark" === a ? "rdg-dark" : "rdg-light",
            columns: d,
            rows: u,
            enableVirtualization: !0,
            onRowsChange: (e) => {
              x(e),
                s(h(e.map((e) => d.slice(1).map((t) => e[t.key] || ""))), !0);
            },
            onCellClick: (e) => {
              "rowNumber" !== e.column.key && e.selectCell(!0);
            },
            style: { height: "100%" },
            defaultColumnOptions: { resizable: !0, sortable: !0 },
          });
        },
        function (e, t) {
          return (
            e.currentVersionIndex === t.currentVersionIndex &&
            e.isCurrentVersion === t.isCurrentVersion &&
            ("streaming" !== e.status || "streaming" !== t.status) &&
            e.content === t.content &&
            e.saveContent === t.saveContent
          );
        },
      );
      var eb = s(10080),
        ey = s(47226),
        ew = s(5616),
        eN = s(67917),
        eL = s(53836),
        ek = s(56681),
        eV = s(55575),
        eH = s(26451),
        eT = s(64444),
        eM = s(91837),
        eR = s(11804),
        eI = s(49910),
        eS = s(75134);
      function ez(e) {
        let { content: t, className: s } = e;
        return (0, r.jsx)("div", {
          className: (0, m.cn)(
            "prose prose-sm dark:prose-invert max-w-none",
            s,
          ),
          children: (0, r.jsx)(eM.oz, {
            remarkPlugins: [eS.A],
            rehypePlugins: [eI.A],
            components: {
              code(e) {
                let { node: t, className: s, children: n, ...i } = e,
                  l = /language-(\w+)/.exec(s || "");
                return (null == s ? void 0 : s.startsWith("language-")) && l
                  ? (0, r.jsx)(eR.Prism, {
                      language: l[1],
                      PreTag: "div",
                      children: String(n).replace(/\n$/, ""),
                    })
                  : (0, r.jsx)("code", { className: s, ...i, children: n });
              },
              a: (e) => {
                let { node: t, ...s } = e;
                return (0, r.jsx)("a", {
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-primary underline",
                  ...s,
                });
              },
              table: (e) => {
                let { node: t, ...s } = e;
                return (0, r.jsx)("div", {
                  className: "overflow-x-auto",
                  children: (0, r.jsx)("table", {
                    className: "border-collapse border border-border",
                    ...s,
                  }),
                });
              },
              th: (e) => {
                let { node: t, ...s } = e;
                return (0, r.jsx)("th", {
                  className:
                    "border border-border bg-muted px-4 py-2 text-left",
                  ...s,
                });
              },
              td: (e) => {
                let { node: t, ...s } = e;
                return (0, r.jsx)("td", {
                  className: "border border-border px-4 py-2",
                  ...s,
                });
              },
              img: (e) => {
                let { node: t, ...s } = e;
                return (0, r.jsx)("img", { className: "rounded-md", ...s });
              },
            },
            children: t,
          }),
        });
      }
      var eZ = s(37126),
        e_ = s(11626);
      let eA = (e) => {
          let { suggestion: t, onApply: s, artifactKind: n } = e,
            [i, a] = (0, l.useState)(!1),
            { width: o } = (0, f.lW)();
          return (0, r.jsx)(er.N, {
            children: i
              ? (0, r.jsxs)(
                  en.P.div,
                  {
                    className:
                      "absolute bg-background p-3 flex flex-col gap-3 rounded-2xl border text-sm w-56 shadow-xl z-50 -right-12 md:-right-16 font-sans",
                    transition: { type: "spring", stiffness: 500, damping: 30 },
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: -20 },
                    exit: { opacity: 0, y: -10 },
                    whileHover: { scale: 1.05 },
                    children: [
                      (0, r.jsxs)("div", {
                        className: "flex flex-row items-center justify-between",
                        children: [
                          (0, r.jsxs)("div", {
                            className: "flex flex-row items-center gap-2",
                            children: [
                              (0, r.jsx)("div", {
                                className:
                                  "size-4 bg-muted-foreground/25 rounded-full",
                              }),
                              (0, r.jsx)("div", {
                                className: "font-medium",
                                children: "Assistant",
                              }),
                            ],
                          }),
                          (0, r.jsx)("button", {
                            type: "button",
                            className: "text-xs text-gray-500 cursor-pointer",
                            onClick: () => {
                              a(!1);
                            },
                            children: (0, r.jsx)(V, { size: 12 }),
                          }),
                        ],
                      }),
                      (0, r.jsx)("div", { children: t.description }),
                      (0, r.jsx)(v.$, {
                        variant: "outline",
                        className: "w-fit py-1.5 px-3 rounded-full",
                        onClick: s,
                        children: "Apply",
                      }),
                    ],
                  },
                  t.id,
                )
              : (0, r.jsx)(en.P.div, {
                  className: (0, m.cn)(
                    "cursor-pointer text-muted-foreground p-1",
                    {
                      "absolute -right-8": "text" === n,
                      "sticky top-0 right-4": "code" === n,
                    },
                  ),
                  onClick: () => {
                    a(!0);
                  },
                  whileHover: { scale: 1.1 },
                  children: (0, r.jsx)(k, { size: o && o < 768 ? 16 : 14 }),
                }),
          });
        },
        eE = new ew.hs("suggestions"),
        eD = new ew.k_({
          key: eE,
          state: {
            init: () => ({ decorations: eN.zF.empty, selected: null }),
            apply(e, t) {
              let s = e.getMeta(eE);
              return (
                s || {
                  decorations: t.decorations.map(e.mapping, e.doc),
                  selected: t.selected,
                }
              );
            },
          },
          props: {
            decorations(e) {
              var t, s;
              return null !=
                (s = null == (t = this.getState(e)) ? void 0 : t.decorations)
                ? s
                : eN.zF.empty;
            },
          },
        }),
        eB = (e) => {
          let t = eL.S4.fromSchema(eW),
            s = (0, eT.F0)((0, r.jsx)(ez, { content: e })),
            n = document.createElement("div");
          return (n.innerHTML = s), t.parse(n);
        },
        eF = (e) => eH.lR.serialize(e),
        eP = (e, t) => {
          let s = [];
          for (let t of e)
            s.push(
              eN.NZ.inline(
                t.selectionStart,
                t.selectionEnd,
                { class: "suggestion-highlight" },
                { suggestionId: t.id, type: "highlight" },
              ),
            ),
              s.push(
                eN.NZ.widget(
                  t.selectionStart,
                  (e) => {
                    let { dom: s } = (function (e, t) {
                      let s =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : e_.b3.Text,
                        n = document.createElement("span"),
                        i = (0, eZ.createRoot)(n);
                      return (
                        n.addEventListener("mousedown", (e) => {
                          e.preventDefault(), t.dom.blur();
                        }),
                        i.render(
                          (0, r.jsx)(eA, {
                            suggestion: e,
                            onApply: () => {
                              let { state: s, dispatch: r } = t,
                                n = s.tr,
                                i = eE.getState(s),
                                l = null == i ? void 0 : i.decorations;
                              if (l) {
                                let t = eN.zF.create(
                                  s.doc,
                                  l
                                    .find()
                                    .filter(
                                      (t) => t.spec.suggestionId !== e.id,
                                    ),
                                );
                                n.setMeta(eE, {
                                  decorations: t,
                                  selected: null,
                                }),
                                  r(n);
                              }
                              let a = t.state.tr.replaceWith(
                                e.selectionStart,
                                e.selectionEnd,
                                s.schema.text(e.suggestedText),
                              );
                              a.setMeta("no-debounce", !0), r(a);
                            },
                            artifactKind: s,
                          }),
                        ),
                        {
                          dom: n,
                          destroy: () => {
                            setTimeout(() => {
                              i.unmount();
                            }, 0);
                          },
                        }
                      );
                    })(t, e);
                    return s;
                  },
                  { suggestionId: t.id, type: "widget" },
                ),
              );
          return eN.zF.create(t.state.doc, s);
        },
        eW = new eL.Sj({
          nodes: (0, eV.ZW)(ek.wQ.spec.nodes, "paragraph block*", "block"),
          marks: ek.wQ.spec.marks,
        });
      function e$(e) {
        return (0, ey.JJ)(
          new RegExp("^(#{1,".concat(e, "})\\s$")),
          eW.nodes.heading,
          () => ({ level: e }),
        );
      }
      let eO = (e) => {
          let { transaction: t, editorRef: s, onSaveContent: r } = e;
          if (!s || !s.current) return;
          let n = s.current.state.apply(t);
          s.current.updateState(n),
            t.docChanged &&
              !t.getMeta("no-save") &&
              r(eF(n.doc), !t.getMeta("no-debounce"));
        },
        eU = (0, l.memo)(
          function (e) {
            let { content: t, onSaveContent: s, suggestions: n, status: i } = e,
              a = (0, l.useRef)(null),
              o = (0, l.useRef)(null);
            return (
              (0, l.useEffect)(() => {
                if (a.current && !o.current) {
                  let e = ew.$t.create({
                    doc: eB(t),
                    plugins: [
                      ...(0, eb.WX)({ schema: eW, menuBar: !1 }),
                      (0, ey.sM)({
                        rules: [e$(1), e$(2), e$(3), e$(4), e$(5), e$(6)],
                      }),
                      eD,
                    ],
                  });
                  o.current = new eN.Lz(a.current, { state: e });
                }
                return () => {
                  o.current && (o.current.destroy(), (o.current = null));
                };
              }, []),
              (0, l.useEffect)(() => {
                o.current &&
                  o.current.setProps({
                    dispatchTransaction: (e) => {
                      eO({ transaction: e, editorRef: o, onSaveContent: s });
                    },
                  });
              }, [s]),
              (0, l.useEffect)(() => {
                if (o.current && t) {
                  let e = eF(o.current.state.doc);
                  if ("streaming" === i) {
                    let e = eB(t),
                      s = o.current.state.tr.replaceWith(
                        0,
                        o.current.state.doc.content.size,
                        e.content,
                      );
                    s.setMeta("no-save", !0), o.current.dispatch(s);
                    return;
                  }
                  if (e !== t) {
                    let e = eB(t),
                      s = o.current.state.tr.replaceWith(
                        0,
                        o.current.state.doc.content.size,
                        e.content,
                      );
                    s.setMeta("no-save", !0), o.current.dispatch(s);
                  }
                }
              }, [t, i]),
              (0, l.useEffect)(() => {
                var e, s;
                if ((null == (e = o.current) ? void 0 : e.state.doc) && t) {
                  let e = eP(
                      ((s = o.current.state.doc),
                      n.map((e) => {
                        var t;
                        let r,
                          n =
                            ((t = e.originalText),
                            (r = null),
                            s.nodesBetween(0, s.content.size, (e, s) => {
                              if (e.isText && e.text) {
                                let n = e.text.indexOf(t);
                                if (-1 !== n)
                                  return (
                                    (r = {
                                      start: s + n,
                                      end: s + n + t.length,
                                    }),
                                    !1
                                  );
                              }
                              return !0;
                            }),
                            r);
                        return n
                          ? {
                              ...e,
                              selectionStart: n.start,
                              selectionEnd: n.end,
                            }
                          : { ...e, selectionStart: 0, selectionEnd: 0 };
                      })).filter((e) => e.selectionStart && e.selectionEnd),
                      o.current,
                    ),
                    t = o.current.state.tr;
                  t.setMeta(eE, { decorations: e }), o.current.dispatch(t);
                }
              }, [n, t]),
              (0, r.jsx)("div", {
                className: "relative prose dark:prose-invert",
                ref: a,
              })
            );
          },
          function (e, t) {
            return (
              e.suggestions === t.suggestions &&
              e.currentVersionIndex === t.currentVersionIndex &&
              e.isCurrentVersion === t.isCurrentVersion &&
              ("streaming" !== e.status || "streaming" !== t.status) &&
              e.content === t.content &&
              e.onSaveContent === t.onSaveContent
            );
          },
        );
      function eG(e) {
        let { isReadonly: t, result: s, args: n } = e,
          { artifact: i, setArtifact: a } = (0, ei.ST)(),
          { data: d, isLoading: c } = (0, o.Ay)(
            s ? "/api/document?id=".concat(s.id) : null,
            m.GO,
          ),
          u = (0, l.useMemo)(() => (null == d ? void 0 : d[0]), [d]),
          x = (0, l.useRef)(null);
        if (
          ((0, l.useEffect)(() => {
            var e;
            let t =
              null == (e = x.current) ? void 0 : e.getBoundingClientRect();
            i.documentId &&
              t &&
              a((e) => ({
                ...e,
                boundingBox: {
                  left: t.x,
                  top: t.y,
                  width: t.width,
                  height: t.height,
                },
              }));
          }, [i.documentId, a]),
          i.isVisible)
        ) {
          if (s)
            return (0, r.jsx)(ea, {
              type: "create",
              result: { id: s.id, title: s.title, kind: s.kind },
              isReadonly: t,
            });
          if (n)
            return (0, r.jsx)(eo, {
              type: "create",
              args: { title: n.title },
              isReadonly: t,
            });
        }
        if (c) {
          var h;
          return (0, r.jsx)(eq, {
            artifactKind: null != (h = s.kind) ? h : n.kind,
          });
        }
        let p =
          u ||
          ("streaming" === i.status
            ? {
                title: i.title,
                kind: i.kind,
                content: i.content,
                id: i.documentId,
                createdAt: new Date(),
                userId: "noop",
              }
            : null);
        return p
          ? (0, r.jsxs)("div", {
              className: "relative w-full cursor-pointer",
              children: [
                (0, r.jsx)(eK, { hitboxRef: x, result: s, setArtifact: a }),
                (0, r.jsx)(eQ, {
                  title: p.title,
                  kind: p.kind,
                  isStreaming: "streaming" === i.status,
                }),
                (0, r.jsx)(eX, { document: p }),
              ],
            })
          : (0, r.jsx)(eq, { artifactKind: i.kind });
      }
      let eq = (e) => {
          let { artifactKind: t } = e;
          return (0, r.jsxs)("div", {
            className: "w-full",
            children: [
              (0, r.jsxs)("div", {
                className:
                  "p-4 border rounded-t-2xl flex flex-row gap-2 items-center justify-between dark:bg-muted h-[57px] dark:border-zinc-700 border-b-0",
                children: [
                  (0, r.jsxs)("div", {
                    className: "flex flex-row items-center gap-3",
                    children: [
                      (0, r.jsx)("div", {
                        className: "text-muted-foreground",
                        children: (0, r.jsx)("div", {
                          className:
                            "animate-pulse rounded-md size-4 bg-muted-foreground/20",
                        }),
                      }),
                      (0, r.jsx)("div", {
                        className:
                          "animate-pulse rounded-lg h-4 bg-muted-foreground/20 w-24",
                      }),
                    ],
                  }),
                  (0, r.jsx)("div", { children: (0, r.jsx)(A, {}) }),
                ],
              }),
              "image" === t
                ? (0, r.jsx)("div", {
                    className:
                      "overflow-y-scroll border rounded-b-2xl bg-muted border-t-0 dark:border-zinc-700",
                    children: (0, r.jsx)("div", {
                      className:
                        "animate-pulse h-[257px] bg-muted-foreground/20 w-full",
                    }),
                  })
                : (0, r.jsx)("div", {
                    className:
                      "overflow-y-scroll border rounded-b-2xl p-8 pt-4 bg-muted border-t-0 dark:border-zinc-700",
                    children: (0, r.jsx)(ep, {}),
                  }),
            ],
          });
        },
        eK = (0, l.memo)(
          (e) => {
            let { hitboxRef: t, result: s, setArtifact: n } = e,
              i = (0, l.useCallback)(
                (e) => {
                  let t = e.currentTarget.getBoundingClientRect();
                  n((e) =>
                    "streaming" === e.status
                      ? { ...e, isVisible: !0 }
                      : {
                          ...e,
                          title: s.title,
                          documentId: s.id,
                          kind: s.kind,
                          isVisible: !0,
                          boundingBox: {
                            left: t.x,
                            top: t.y,
                            width: t.width,
                            height: t.height,
                          },
                        },
                  );
                },
                [n, s],
              );
            return (0, r.jsx)("div", {
              className: "size-full absolute top-0 left-0 rounded-xl z-10",
              ref: t,
              onClick: i,
              role: "presentation",
              "aria-hidden": "true",
              children: (0, r.jsx)("div", {
                className: "w-full p-4 flex justify-end items-center",
                children: (0, r.jsx)("div", {
                  className:
                    "absolute right-[9px] top-[13px] p-2 hover:dark:bg-zinc-700 rounded-md hover:bg-zinc-100",
                  children: (0, r.jsx)(A, {}),
                }),
              }),
            });
          },
          (e, t) => !!ee()(e.result, t.result),
        ),
        eQ = (0, l.memo)(
          (e) => {
            let { title: t, kind: s, isStreaming: n } = e;
            return (0, r.jsxs)("div", {
              className:
                "p-4 border rounded-t-2xl flex flex-row gap-2 items-start sm:items-center justify-between dark:bg-muted border-b-0 dark:border-zinc-700",
              children: [
                (0, r.jsxs)("div", {
                  className: "flex flex-row items-start sm:items-center gap-3",
                  children: [
                    (0, r.jsx)("div", {
                      className: "text-muted-foreground",
                      children: n
                        ? (0, r.jsx)("div", {
                            className: "animate-spin",
                            children: (0, r.jsx)(b, {}),
                          })
                        : "image" === s
                          ? (0, r.jsx)(_, {})
                          : (0, r.jsx)(C, {}),
                    }),
                    (0, r.jsx)("div", {
                      className: "-translate-y-1 sm:translate-y-0 font-medium",
                      children: t,
                    }),
                  ],
                }),
                (0, r.jsx)("div", { className: "w-8" }),
              ],
            });
          },
          (e, t) => e.title === t.title && e.isStreaming === t.isStreaming,
        ),
        eX = (e) => {
          var t, s;
          let { document: n } = e,
            { artifact: i } = (0, ei.ST)(),
            l = (0, m.cn)(
              "h-[257px] overflow-y-scroll border rounded-b-2xl dark:bg-muted border-t-0 dark:border-zinc-700",
              {
                "p-4 sm:px-14 sm:py-16": "text" === n.kind,
                "p-0": "code" === n.kind,
              },
            ),
            a = {
              content: null != (t = n.content) ? t : "",
              isCurrentVersion: !0,
              currentVersionIndex: 0,
              status: i.status,
              saveContent: () => {},
              suggestions: [],
            };
          return (0, r.jsx)("div", {
            className: l,
            children:
              "text" === n.kind
                ? (0, r.jsx)(eU, { ...a, onSaveContent: () => {} })
                : "code" === n.kind
                  ? (0, r.jsx)("div", {
                      className: "flex flex-1 relative w-full",
                      children: (0, r.jsx)("div", {
                        className: "absolute inset-0",
                        children: (0, r.jsx)(eh, {
                          ...a,
                          onSaveContent: () => {},
                        }),
                      }),
                    })
                  : "sheet" === n.kind
                    ? (0, r.jsx)("div", {
                        className: "flex flex-1 relative size-full p-4",
                        children: (0, r.jsx)("div", {
                          className: "absolute inset-0",
                          children: (0, r.jsx)(eC, { ...a }),
                        }),
                      })
                    : "image" === n.kind
                      ? (0, r.jsx)(eg, {
                          title: n.title,
                          content: null != (s = n.content) ? s : "",
                          isCurrentVersion: !0,
                          currentVersionIndex: 0,
                          status: i.status,
                          isInline: !0,
                        })
                      : null,
          });
        },
        eY = (0, l.memo)(
          function (e) {
            let {
                sessionId: t,
                message: s,
                vote: n,
                isLoading: i,
                currentUserId: l,
              } = e,
              { mutate: o } = (0, a.iX)(),
              [d, c] = (0, f.Cj)();
            return i ||
              "user" === s.role ||
              (s.toolInvocations && s.toolInvocations.length > 0)
              ? null
              : (0, r.jsx)(G.Bc, {
                  delayDuration: 0,
                  children: (0, r.jsxs)("div", {
                    className: "flex flex-row gap-2",
                    children: [
                      (0, r.jsxs)(G.m_, {
                        children: [
                          (0, r.jsx)(G.k$, {
                            asChild: !0,
                            children: (0, r.jsx)(v.$, {
                              className:
                                "py-1 px-2 h-fit text-muted-foreground",
                              variant: "outline",
                              onClick: async () => {
                                await c(s.content),
                                  B.oR.success("Copied to clipboard!");
                              },
                              children: (0, r.jsx)(M, {}),
                            }),
                          }),
                          (0, r.jsx)(G.ZI, { children: "Copy" }),
                        ],
                      }),
                      (0, r.jsxs)(G.m_, {
                        children: [
                          (0, r.jsx)(G.k$, {
                            asChild: !0,
                            children: (0, r.jsx)(v.$, {
                              "data-testid": "message-upvote",
                              className:
                                "py-1 px-2 h-fit text-muted-foreground !pointer-events-auto",
                              disabled:
                                !l || (null == n ? void 0 : n.isUpvoted) === !0,
                              variant: "outline",
                              onClick: async () => {
                                if (!l)
                                  return void B.oR.error(
                                    "You must be logged in to vote.",
                                  );
                                let e = fetch("/api/vote", {
                                  method: "PATCH",
                                  body: JSON.stringify({
                                    messageId: s.id,
                                    type: "up",
                                  }),
                                });
                                B.oR.promise(e, {
                                  loading: "Upvoting Response...",
                                  success: () => (
                                    o(
                                      "/api/vote?sessionId=".concat(t),
                                      (e) => {
                                        let t = {
                                          messageId: s.id,
                                          userId: l,
                                          isUpvoted: !0,
                                          createdAt: new Date(),
                                        };
                                        if (!e) return [t];
                                        let r = e.findIndex(
                                          (e) =>
                                            e.messageId === s.id &&
                                            e.userId === l,
                                        );
                                        if (-1 !== r) {
                                          let t = [...e];
                                          return (
                                            (t[r] = {
                                              ...t[r],
                                              isUpvoted: !0,
                                              createdAt: new Date(),
                                            }),
                                            t
                                          );
                                        }
                                        return [...e, t];
                                      },
                                      { revalidate: !1 },
                                    ),
                                    "Upvoted Response!"
                                  ),
                                  error: "Failed to upvote response.",
                                });
                              },
                              children: (0, r.jsx)(R, {}),
                            }),
                          }),
                          (0, r.jsx)(G.ZI, { children: "Upvote Response" }),
                        ],
                      }),
                      (0, r.jsxs)(G.m_, {
                        children: [
                          (0, r.jsx)(G.k$, {
                            asChild: !0,
                            children: (0, r.jsx)(v.$, {
                              "data-testid": "message-downvote",
                              className:
                                "py-1 px-2 h-fit text-muted-foreground !pointer-events-auto",
                              variant: "outline",
                              disabled: !l || (n && !1 === n.isUpvoted),
                              onClick: async () => {
                                if (!l)
                                  return void B.oR.error(
                                    "You must be logged in to vote.",
                                  );
                                let e = fetch("/api/vote", {
                                  method: "PATCH",
                                  body: JSON.stringify({
                                    messageId: s.id,
                                    type: "down",
                                  }),
                                });
                                B.oR.promise(e, {
                                  loading: "Downvoting Response...",
                                  success: () => (
                                    o(
                                      "/api/vote?sessionId=".concat(t),
                                      (e) => {
                                        let t = {
                                          messageId: s.id,
                                          userId: l,
                                          isUpvoted: !1,
                                          createdAt: new Date(),
                                        };
                                        if (!e) return [t];
                                        let r = e.findIndex(
                                          (e) =>
                                            e.messageId === s.id &&
                                            e.userId === l,
                                        );
                                        if (-1 !== r) {
                                          let t = [...e];
                                          return (
                                            (t[r] = {
                                              ...t[r],
                                              isUpvoted: !1,
                                              createdAt: new Date(),
                                            }),
                                            t
                                          );
                                        }
                                        return [...e, t];
                                      },
                                      { revalidate: !1 },
                                    ),
                                    "Downvoted Response!"
                                  ),
                                  error: "Failed to downvote response.",
                                });
                              },
                              children: (0, r.jsx)(I, {}),
                            }),
                          }),
                          (0, r.jsx)(G.ZI, { children: "Downvote Response" }),
                        ],
                      }),
                    ],
                  }),
                });
          },
          (e, t) =>
            e.currentUserId === t.currentUserId &&
            !!ee()(e.vote, t.vote) &&
            e.isLoading === t.isLoading,
        ),
        eJ = (0, c.createServerReference)(
          "40126ff470a43535ad3f3b5edbf6a896ae355d2d69",
          c.callServer,
          void 0,
          c.findSourceMapURL,
          "deleteTrailingMessages",
        );
      var e0 = s(1805);
      function e1(e) {
        let { message: t, setMode: s, setMessages: n, reload: i } = e,
          [a, o] = (0, l.useState)(!1),
          [d, c] = (0, l.useState)(t.content),
          u = (0, l.useRef)(null);
        (0, l.useEffect)(() => {
          u.current && x();
        }, []);
        let x = () => {
          u.current &&
            ((u.current.style.height = "auto"),
            (u.current.style.height = "".concat(
              u.current.scrollHeight + 2,
              "px",
            )));
        };
        return (0, r.jsxs)("div", {
          className: "flex flex-col gap-2 w-full",
          children: [
            (0, r.jsx)(e0.T, {
              "data-testid": "message-editor",
              ref: u,
              className:
                "bg-transparent outline-none overflow-hidden resize-none !text-base rounded-xl w-full",
              value: d,
              onChange: (e) => {
                c(e.target.value), x();
              },
            }),
            (0, r.jsxs)("div", {
              className: "flex flex-row gap-2 justify-end",
              children: [
                (0, r.jsx)(v.$, {
                  variant: "outline",
                  className: "h-fit py-2 px-3",
                  onClick: () => {
                    s("view");
                  },
                  children: "Cancel",
                }),
                (0, r.jsx)(v.$, {
                  "data-testid": "message-editor-send-button",
                  variant: "default",
                  className: "h-fit py-2 px-3",
                  disabled: a,
                  onClick: async () => {
                    o(!0),
                      await eJ({ id: t.id }),
                      n((e) => {
                        let s = e.findIndex((e) => e.id === t.id);
                        if (-1 !== s) {
                          let r = { ...t, content: d };
                          return [...e.slice(0, s), r];
                        }
                        return e;
                      }),
                      s("view"),
                      i();
                  },
                  children: a ? "Sending..." : "Send",
                }),
              ],
            }),
          ],
        });
      }
      function e2(e) {
        let { isLoading: t, reasoning: s } = e,
          [n, i] = (0, l.useState)(!0);
        return (0, r.jsxs)("div", {
          className: "flex flex-col",
          children: [
            t
              ? (0, r.jsxs)("div", {
                  className: "flex flex-row gap-2 items-center",
                  children: [
                    (0, r.jsx)("div", {
                      className: "font-medium",
                      children: "Reasoning",
                    }),
                    (0, r.jsx)("div", {
                      className: "animate-spin",
                      children: (0, r.jsx)(b, {}),
                    }),
                  ],
                })
              : (0, r.jsxs)("div", {
                  className: "flex flex-row gap-2 items-center",
                  children: [
                    (0, r.jsx)("div", {
                      className: "font-medium",
                      children: "Reasoned for a few seconds",
                    }),
                    (0, r.jsx)("button", {
                      "data-testid": "message-reasoning-toggle",
                      type: "button",
                      className: "cursor-pointer",
                      onClick: () => {
                        i(!n);
                      },
                      children: (0, r.jsx)(S, {}),
                    }),
                  ],
                }),
            (0, r.jsx)(er.N, {
              initial: !1,
              children:
                n &&
                (0, r.jsx)(
                  en.P.div,
                  {
                    "data-testid": "message-reasoning",
                    initial: "collapsed",
                    animate: "expanded",
                    exit: "collapsed",
                    variants: {
                      collapsed: {
                        height: 0,
                        opacity: 0,
                        marginTop: 0,
                        marginBottom: 0,
                      },
                      expanded: {
                        height: "auto",
                        opacity: 1,
                        marginTop: "1rem",
                        marginBottom: "0.5rem",
                      },
                    },
                    transition: { duration: 0.2, ease: "easeInOut" },
                    style: { overflow: "hidden" },
                    className:
                      "pl-4 text-zinc-600 dark:text-zinc-400 border-l flex flex-col gap-4",
                    children: (0, r.jsx)(ez, { children: s }),
                  },
                  "content",
                ),
            }),
          ],
        });
      }
      let e5 = (e) => {
        let { attachment: t, isUploading: s = !1 } = e,
          { name: n, url: i, contentType: l } = t;
        return (0, r.jsxs)("div", {
          "data-testid": "input-attachment-preview",
          className: "flex flex-col gap-2",
          children: [
            (0, r.jsxs)("div", {
              className:
                "w-20 h-16 aspect-video bg-muted rounded-md relative flex flex-col items-center justify-center",
              children: [
                l && l.startsWith("image")
                  ? (0, r.jsx)(
                      "img",
                      {
                        src: i,
                        alt: null != n ? n : "An image attachment",
                        className: "rounded-md size-full object-cover",
                      },
                      i,
                    )
                  : (0, r.jsx)("div", { className: "" }),
                s &&
                  (0, r.jsx)("div", {
                    "data-testid": "input-attachment-loader",
                    className: "animate-spin absolute text-zinc-500",
                    children: (0, r.jsx)(b, {}),
                  }),
              ],
            }),
            (0, r.jsx)("div", {
              className: "text-xs text-zinc-500 max-w-16 truncate",
              children: n,
            }),
          ],
        });
      };
      var e4 = s(21154),
        e3 = s(30230);
      let e6 = {
        latitude: 37.763283,
        longitude: -122.41286,
        generationtime_ms: 0.027894973754882813,
        utc_offset_seconds: 0,
        timezone: "GMT",
        timezone_abbreviation: "GMT",
        elevation: 18,
        current_units: {
          time: "iso8601",
          interval: "seconds",
          temperature_2m: "\xb0C",
        },
        current: {
          time: "2024-10-07T19:30",
          interval: 900,
          temperature_2m: 29.3,
        },
        hourly_units: { time: "iso8601", temperature_2m: "\xb0C" },
        hourly: {
          time: [
            "2024-10-07T00:00",
            "2024-10-07T01:00",
            "2024-10-07T02:00",
            "2024-10-07T03:00",
            "2024-10-07T04:00",
            "2024-10-07T05:00",
            "2024-10-07T06:00",
            "2024-10-07T07:00",
            "2024-10-07T08:00",
            "2024-10-07T09:00",
            "2024-10-07T10:00",
            "2024-10-07T11:00",
            "2024-10-07T12:00",
            "2024-10-07T13:00",
            "2024-10-07T14:00",
            "2024-10-07T15:00",
            "2024-10-07T16:00",
            "2024-10-07T17:00",
            "2024-10-07T18:00",
            "2024-10-07T19:00",
            "2024-10-07T20:00",
            "2024-10-07T21:00",
            "2024-10-07T22:00",
            "2024-10-07T23:00",
            "2024-10-08T00:00",
            "2024-10-08T01:00",
            "2024-10-08T02:00",
            "2024-10-08T03:00",
            "2024-10-08T04:00",
            "2024-10-08T05:00",
            "2024-10-08T06:00",
            "2024-10-08T07:00",
            "2024-10-08T08:00",
            "2024-10-08T09:00",
            "2024-10-08T10:00",
            "2024-10-08T11:00",
            "2024-10-08T12:00",
            "2024-10-08T13:00",
            "2024-10-08T14:00",
            "2024-10-08T15:00",
            "2024-10-08T16:00",
            "2024-10-08T17:00",
            "2024-10-08T18:00",
            "2024-10-08T19:00",
            "2024-10-08T20:00",
            "2024-10-08T21:00",
            "2024-10-08T22:00",
            "2024-10-08T23:00",
            "2024-10-09T00:00",
            "2024-10-09T01:00",
            "2024-10-09T02:00",
            "2024-10-09T03:00",
            "2024-10-09T04:00",
            "2024-10-09T05:00",
            "2024-10-09T06:00",
            "2024-10-09T07:00",
            "2024-10-09T08:00",
            "2024-10-09T09:00",
            "2024-10-09T10:00",
            "2024-10-09T11:00",
            "2024-10-09T12:00",
            "2024-10-09T13:00",
            "2024-10-09T14:00",
            "2024-10-09T15:00",
            "2024-10-09T16:00",
            "2024-10-09T17:00",
            "2024-10-09T18:00",
            "2024-10-09T19:00",
            "2024-10-09T20:00",
            "2024-10-09T21:00",
            "2024-10-09T22:00",
            "2024-10-09T23:00",
            "2024-10-10T00:00",
            "2024-10-10T01:00",
            "2024-10-10T02:00",
            "2024-10-10T03:00",
            "2024-10-10T04:00",
            "2024-10-10T05:00",
            "2024-10-10T06:00",
            "2024-10-10T07:00",
            "2024-10-10T08:00",
            "2024-10-10T09:00",
            "2024-10-10T10:00",
            "2024-10-10T11:00",
            "2024-10-10T12:00",
            "2024-10-10T13:00",
            "2024-10-10T14:00",
            "2024-10-10T15:00",
            "2024-10-10T16:00",
            "2024-10-10T17:00",
            "2024-10-10T18:00",
            "2024-10-10T19:00",
            "2024-10-10T20:00",
            "2024-10-10T21:00",
            "2024-10-10T22:00",
            "2024-10-10T23:00",
            "2024-10-11T00:00",
            "2024-10-11T01:00",
            "2024-10-11T02:00",
            "2024-10-11T03:00",
          ],
          temperature_2m: [
            36.6, 32.8, 29.5, 28.6, 29.2, 28.2, 27.5, 26.6, 26.5, 26, 25, 23.5,
            23.9, 24.2, 22.9, 21, 24, 28.1, 31.4, 33.9, 32.1, 28.9, 26.9, 25.2,
            23, 21.1, 19.6, 18.6, 17.7, 16.8, 16.2, 15.5, 14.9, 14.4, 14.2,
            13.7, 13.3, 12.9, 12.5, 13.5, 15.8, 17.7, 19.6, 21, 21.9, 22.3, 22,
            20.7, 18.9, 17.9, 17.3, 17, 16.7, 16.2, 15.6, 15.2, 15, 15, 15.1,
            14.8, 14.8, 14.9, 14.7, 14.8, 15.3, 16.2, 17.9, 19.6, 20.5, 21.6,
            21, 20.7, 19.3, 18.7, 18.4, 17.9, 17.3, 17, 17, 16.8, 16.4, 16.2,
            16, 15.8, 15.7, 15.4, 15.4, 16.1, 16.7, 17, 18.6, 19, 19.5, 19.4,
            18.5, 17.9, 17.5, 16.7, 16.3, 16.1,
          ],
        },
        daily_units: { time: "iso8601", sunrise: "iso8601", sunset: "iso8601" },
        daily: {
          time: [
            "2024-10-07",
            "2024-10-08",
            "2024-10-09",
            "2024-10-10",
            "2024-10-11",
          ],
          sunrise: [
            "2024-10-07T07:15",
            "2024-10-08T07:16",
            "2024-10-09T07:17",
            "2024-10-10T07:18",
            "2024-10-11T07:19",
          ],
          sunset: [
            "2024-10-07T19:00",
            "2024-10-08T18:58",
            "2024-10-09T18:57",
            "2024-10-10T18:55",
            "2024-10-11T18:54",
          ],
        },
      };
      function e9(e) {
        return Math.ceil(e);
      }
      function e7(e) {
        let { weatherAtLocation: t = e6 } = e,
          s = Math.max(...t.hourly.temperature_2m.slice(0, 24)),
          n = Math.min(...t.hourly.temperature_2m.slice(0, 24)),
          i = (0, e4.v)(new Date(t.current.time), {
            start: new Date(t.daily.sunrise[0]),
            end: new Date(t.daily.sunset[0]),
          }),
          [a, o] = (0, l.useState)(!1);
        (0, l.useEffect)(() => {
          let e = () => {
            o(window.innerWidth < 768);
          };
          return (
            e(),
            window.addEventListener("resize", e),
            () => window.removeEventListener("resize", e)
          );
        }, []);
        let d = a ? 5 : 6,
          c = t.hourly.time.findIndex(
            (e) => new Date(e) >= new Date(t.current.time),
          ),
          u = t.hourly.time.slice(c, c + d),
          x = t.hourly.temperature_2m.slice(c, c + d);
        return (0, r.jsxs)("div", {
          className: es()(
            "flex flex-col gap-4 rounded-2xl p-4 skeleton-bg max-w-[500px]",
            { "bg-blue-400": i },
            { "bg-indigo-900": !i },
          ),
          children: [
            (0, r.jsxs)("div", {
              className: "flex flex-row justify-between items-center",
              children: [
                (0, r.jsxs)("div", {
                  className: "flex flex-row gap-2 items-center",
                  children: [
                    (0, r.jsx)("div", {
                      className: es()(
                        "size-10 rounded-full skeleton-div",
                        { "bg-yellow-300": i },
                        { "bg-indigo-100": !i },
                      ),
                    }),
                    (0, r.jsxs)("div", {
                      className: "text-4xl font-medium text-blue-50",
                      children: [
                        e9(t.current.temperature_2m),
                        t.current_units.temperature_2m,
                      ],
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: "text-blue-50",
                  children: "H:".concat(e9(s), "\xb0 L:").concat(e9(n), "\xb0"),
                }),
              ],
            }),
            (0, r.jsx)("div", {
              className: "flex flex-row justify-between",
              children: u.map((e, s) =>
                (0, r.jsxs)(
                  "div",
                  {
                    className: "flex flex-col items-center gap-1",
                    children: [
                      (0, r.jsx)("div", {
                        className: "text-blue-100 text-xs",
                        children: (0, e3.GP)(new Date(e), "ha"),
                      }),
                      (0, r.jsx)("div", {
                        className: es()(
                          "size-6 rounded-full skeleton-div",
                          { "bg-yellow-300": i },
                          { "bg-indigo-200": !i },
                        ),
                      }),
                      (0, r.jsxs)("div", {
                        className: "text-blue-50 text-sm",
                        children: [e9(x[s]), t.hourly_units.temperature_2m],
                      }),
                    ],
                  },
                  e,
                ),
              ),
            }),
          ],
        });
      }
      let e8 = (0, l.memo)(
          (e) => {
            let {
                sessionId: t,
                message: s,
                vote: n,
                isLoading: i,
                setMessages: a,
                reload: o,
                isReadonly: d,
                currentUserId: c,
              } = e,
              [u, x] = (0, l.useState)("view");
            return (0, r.jsx)(er.N, {
              children: (0, r.jsx)(en.P.div, {
                "data-testid": "message-".concat(s.role),
                className: "w-full mx-auto max-w-3xl px-4 group/message",
                initial: { y: 5, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                "data-role": s.role,
                children: (0, r.jsxs)("div", {
                  className: (0, m.cn)(
                    "flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl",
                    {
                      "w-full": "edit" === u,
                      "group-data-[role=user]/message:w-fit": "edit" !== u,
                    },
                  ),
                  children: [
                    "assistant" === s.role &&
                      (0, r.jsx)("div", {
                        className:
                          "size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background",
                        children: (0, r.jsx)("div", {
                          className: "translate-y-px",
                          children: (0, r.jsx)(z, { size: 14 }),
                        }),
                      }),
                    (0, r.jsxs)("div", {
                      className: "flex flex-col gap-4 w-full",
                      children: [
                        s.experimental_attachments &&
                          (0, r.jsx)("div", {
                            "data-testid": "message-attachments",
                            className: "flex flex-row justify-end gap-2",
                            children: s.experimental_attachments.map((e) =>
                              (0, r.jsx)(e5, { attachment: e }, e.url),
                            ),
                          }),
                        s.reasoning &&
                          (0, r.jsx)(e2, {
                            isLoading: i,
                            reasoning: s.reasoning,
                          }),
                        (s.content || s.reasoning) &&
                          "view" === u &&
                          (0, r.jsxs)("div", {
                            "data-testid": "message-content",
                            className: "flex flex-row gap-2 items-start",
                            children: [
                              "user" === s.role &&
                                !d &&
                                (0, r.jsxs)(G.m_, {
                                  children: [
                                    (0, r.jsx)(G.k$, {
                                      asChild: !0,
                                      children: (0, r.jsx)(v.$, {
                                        "data-testid": "message-edit",
                                        variant: "ghost",
                                        className:
                                          "px-2 h-fit rounded-full text-muted-foreground opacity-0 group-hover/message:opacity-100",
                                        onClick: () => {
                                          x("edit");
                                        },
                                        children: (0, r.jsx)(y, {}),
                                      }),
                                    }),
                                    (0, r.jsx)(G.ZI, {
                                      children: "Edit message",
                                    }),
                                  ],
                                }),
                              (0, r.jsx)("div", {
                                className: (0, m.cn)("flex flex-col gap-4", {
                                  "bg-primary text-primary-foreground px-3 py-2 rounded-xl":
                                    "user" === s.role,
                                }),
                                children: (0, r.jsx)(ez, {
                                  content: s.content,
                                }),
                              }),
                            ],
                          }),
                        s.content &&
                          "edit" === u &&
                          (0, r.jsxs)("div", {
                            className: "flex flex-row gap-2 items-start",
                            children: [
                              (0, r.jsx)("div", { className: "size-8" }),
                              (0, r.jsx)(
                                e1,
                                {
                                  message: s,
                                  setMode: x,
                                  setMessages: a,
                                  reload: o,
                                },
                                s.id,
                              ),
                            ],
                          }),
                        s.toolInvocations &&
                          s.toolInvocations.length > 0 &&
                          (0, r.jsx)("div", {
                            className: "flex flex-col gap-4",
                            children: s.toolInvocations.map((e) => {
                              let {
                                toolName: t,
                                toolCallId: s,
                                state: n,
                                args: i,
                              } = e;
                              if ("result" === n) {
                                let { result: n } = e;
                                return (0, r.jsx)(
                                  "div",
                                  {
                                    children:
                                      "getWeather" === t
                                        ? (0, r.jsx)(e7, {
                                            weatherAtLocation: n,
                                          })
                                        : "createDocument" === t
                                          ? (0, r.jsx)(eG, {
                                              isReadonly: d,
                                              result: n,
                                            })
                                          : "updateDocument" === t
                                            ? (0, r.jsx)(ea, {
                                                type: "update",
                                                result: n,
                                                isReadonly: d,
                                              })
                                            : "requestSuggestions" === t
                                              ? (0, r.jsx)(ea, {
                                                  type: "request-suggestions",
                                                  result: n,
                                                  isReadonly: d,
                                                })
                                              : (0, r.jsx)("pre", {
                                                  children: JSON.stringify(
                                                    n,
                                                    null,
                                                    2,
                                                  ),
                                                }),
                                  },
                                  s,
                                );
                              }
                              return (0, r.jsx)(
                                "div",
                                {
                                  className: es()({
                                    skeleton: ["getWeather"].includes(t),
                                  }),
                                  children:
                                    "getWeather" === t
                                      ? (0, r.jsx)(e7, {})
                                      : "createDocument" === t
                                        ? (0, r.jsx)(eG, {
                                            isReadonly: d,
                                            args: i,
                                          })
                                        : "updateDocument" === t
                                          ? (0, r.jsx)(eo, {
                                              type: "update",
                                              args: i,
                                              isReadonly: d,
                                            })
                                          : "requestSuggestions" === t
                                            ? (0, r.jsx)(eo, {
                                                type: "request-suggestions",
                                                args: i,
                                                isReadonly: d,
                                              })
                                            : null,
                                },
                                s,
                              );
                            }),
                          }),
                        !d &&
                          (0, r.jsx)(
                            eY,
                            {
                              sessionId: t,
                              message: s,
                              vote: n,
                              isLoading: i,
                              currentUserId: c,
                            },
                            "action-".concat(s.id),
                          ),
                      ],
                    }),
                  ],
                }),
              }),
            });
          },
          (e, t) =>
            e.isLoading === t.isLoading &&
            e.message.reasoning === t.message.reasoning &&
            e.message.content === t.message.content &&
            !!ee()(e.message.toolInvocations, t.message.toolInvocations) &&
            !!ee()(e.vote, t.vote) &&
            e.currentUserId === t.currentUserId,
        ),
        te = () =>
          (0, r.jsx)(en.P.div, {
            "data-testid": "message-assistant-loading",
            className: "w-full mx-auto max-w-3xl px-4 group/message ",
            initial: { y: 5, opacity: 0 },
            animate: { y: 0, opacity: 1, transition: { delay: 1 } },
            "data-role": "assistant",
            children: (0, r.jsxs)("div", {
              className: es()(
                "flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
                { "group-data-[role=user]/message:bg-muted": !0 },
              ),
              children: [
                (0, r.jsx)("div", {
                  className:
                    "size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border",
                  children: (0, r.jsx)(z, { size: 14 }),
                }),
                (0, r.jsx)("div", {
                  className: "flex flex-col gap-2 w-full",
                  children: (0, r.jsx)("div", {
                    className: "flex flex-col gap-4 text-muted-foreground",
                    children: "Thinking...",
                  }),
                }),
              ],
            }),
          }),
        tt = () =>
          (0, r.jsx)(
            en.P.div,
            {
              className: "max-w-3xl mx-auto md:mt-20",
              initial: { opacity: 0, scale: 0.98 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.98 },
              transition: { delay: 0.5 },
              children: (0, r.jsxs)("div", {
                className:
                  "rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl",
                children: [
                  (0, r.jsxs)("p", {
                    className:
                      "flex flex-row justify-center gap-4 items-center",
                    children: [
                      (0, r.jsx)(j, { size: 32 }),
                      (0, r.jsx)("span", { children: "+" }),
                      (0, r.jsx)(k, { size: 32 }),
                    ],
                  }),
                  (0, r.jsxs)("p", {
                    children: [
                      "This is an",
                      " ",
                      (0, r.jsx)(g(), {
                        className: "font-medium underline underline-offset-4",
                        href: "https://github.com/vercel/ai-chatbot",
                        target: "_blank",
                        children: "open source",
                      }),
                      " ",
                      "chatbot template built with Next.js and the AI SDK by Vercel. It uses the",
                      " ",
                      (0, r.jsx)("code", {
                        className: "rounded-md bg-muted px-1 py-0.5",
                        children: "streamText",
                      }),
                      " ",
                      "function in the server and the",
                      " ",
                      (0, r.jsx)("code", {
                        className: "rounded-md bg-muted px-1 py-0.5",
                        children: "useChat",
                      }),
                      " hook on the client to create a seamless chat experience.",
                    ],
                  }),
                  (0, r.jsxs)("p", {
                    children: [
                      "You can learn more about the AI SDK by visiting the",
                      " ",
                      (0, r.jsx)(g(), {
                        className: "font-medium underline underline-offset-4",
                        href: "https://sdk.vercel.ai/docs",
                        target: "_blank",
                        children: "docs",
                      }),
                      ".",
                    ],
                  }),
                ],
              }),
            },
            "overview",
          ),
        ts = (0, l.memo)(
          function (e) {
            let {
                sessionId: t,
                status: s,
                votes: n,
                messages: i,
                setMessages: a,
                reload: o,
                isReadonly: d,
                currentUserId: c,
              } = e,
              [u, x] = (function () {
                let e = (0, l.useRef)(null),
                  t = (0, l.useRef)(null);
                return (
                  (0, l.useEffect)(() => {
                    let s = e.current,
                      r = t.current;
                    if (s && r) {
                      let e = new MutationObserver(() => {
                        r.scrollIntoView({ behavior: "instant", block: "end" });
                      });
                      return (
                        e.observe(s, {
                          childList: !0,
                          subtree: !0,
                          attributes: !0,
                          characterData: !0,
                        }),
                        () => e.disconnect()
                      );
                    }
                  }, []),
                  [e, t]
                );
              })();
            return (0, r.jsxs)("div", {
              ref: u,
              className:
                "flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4",
              children: [
                0 === i.length && (0, r.jsx)(tt, {}),
                i.map((e, l) => {
                  let u =
                    null == n
                      ? void 0
                      : n.find((t) => t.messageId === e.id && t.userId === c);
                  return (0, r.jsx)(
                    e8,
                    {
                      sessionId: t,
                      message: e,
                      isLoading: "streaming" === s && i.length - 1 === l,
                      vote: u,
                      setMessages: a,
                      reload: o,
                      isReadonly: d,
                      currentUserId: c,
                    },
                    e.id,
                  );
                }),
                "submitted" === s &&
                  i.length > 0 &&
                  "user" === i[i.length - 1].role &&
                  (0, r.jsx)(te, {}),
                (0, r.jsx)("div", {
                  ref: x,
                  className: "shrink-0 min-w-[24px] min-h-[24px]",
                }),
              ],
            });
          },
          (e, t) =>
            (!!e.isArtifactVisible && !!t.isArtifactVisible) ||
            (e.status === t.status &&
              e.messages.length === t.messages.length &&
              !!ee()(e.messages, t.messages) &&
              !!ee()(e.votes, t.votes) &&
              e.currentUserId === t.currentUserId),
        );
      var tr = s(7972);
      let tn = (0, l.memo)(
          function (e) {
            let { chatId: t, append: s } = e;
            return (0, r.jsx)("div", {
              "data-testid": "suggested-actions",
              className: "grid sm:grid-cols-2 gap-2 w-full",
              children: [
                {
                  title: "What are the advantages",
                  label: "of using Next.js?",
                  action: "What are the advantages of using Next.js?",
                },
                {
                  title: "Write code to",
                  label: "demonstrate djikstra's algorithm",
                  action: "Write code to demonstrate djikstra's algorithm",
                },
                {
                  title: "Help me write an essay",
                  label: "about silicon valley",
                  action: "Help me write an essay about silicon valley",
                },
                {
                  title: "What is the weather",
                  label: "in San Francisco?",
                  action: "What is the weather in San Francisco?",
                },
              ].map((e, n) =>
                (0, r.jsx)(
                  en.P.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 20 },
                    transition: { delay: 0.05 * n },
                    className: n > 1 ? "hidden sm:block" : "block",
                    children: (0, r.jsxs)(v.$, {
                      variant: "ghost",
                      onClick: async () => {
                        window.history.replaceState({}, "", "/chat/".concat(t)),
                          s({ role: "user", content: e.action });
                      },
                      className:
                        "text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start",
                      children: [
                        (0, r.jsx)("span", {
                          className: "font-medium",
                          children: e.title,
                        }),
                        (0, r.jsx)("span", {
                          className: "text-muted-foreground",
                          children: e.label,
                        }),
                      ],
                    }),
                  },
                  "suggested-action-".concat(e.title, "-").concat(n),
                ),
              ),
            });
          },
          () => !0,
        ),
        ti = (0, l.memo)(
          function (e) {
            let {
                chatId: t,
                input: s,
                setInput: n,
                status: i,
                stop: a,
                attachments: o,
                setAttachments: d,
                messages: c,
                setMessages: u,
                append: x,
                className: m,
              } = e,
              h = (0, l.useRef)(null),
              { width: p } = (0, f.lW)();
            (0, l.useEffect)(() => {
              h.current && g();
            }, []);
            let g = () => {
                h.current &&
                  ((h.current.style.height = "auto"),
                  (h.current.style.height = "".concat(
                    h.current.scrollHeight + 2,
                    "px",
                  )));
              },
              v = () => {
                h.current &&
                  ((h.current.style.height = "auto"),
                  (h.current.style.height = "98px"));
              },
              [j, C] = (0, f.Mj)("input", "");
            (0, l.useEffect)(() => {
              h.current && (n(h.current.value || j || ""), g());
            }, []),
              (0, l.useEffect)(() => {
                C(s);
              }, [s, C]);
            let b = (0, l.useRef)(null),
              [y, w] = (0, l.useState)([]),
              N = (0, l.useCallback)(() => {
                if (
                  (x(
                    { id: (0, tr.Ak)(), role: "user", content: s },
                    { experimental_attachments: o },
                  ),
                  n(""),
                  d([]),
                  C(""),
                  v(),
                  p && p > 768)
                ) {
                  var e;
                  null == (e = h.current) || e.focus();
                }
              }, [x, s, o, d, C, n, p]),
              L = async (e) => {
                let t = new FormData();
                t.append("file", e);
                try {
                  let e = await fetch("/api/files/upload", {
                    method: "POST",
                    body: t,
                  });
                  if (e.ok) {
                    let {
                      url: t,
                      pathname: s,
                      contentType: r,
                    } = await e.json();
                    return { url: t, name: s, contentType: r };
                  }
                  let { error: s } = await e.json();
                  B.oR.error(s);
                } catch (e) {
                  B.oR.error("Failed to upload file, please try again!");
                }
              },
              k = (0, l.useCallback)(
                async (e) => {
                  let t = Array.from(e.target.files || []);
                  w(t.map((e) => e.name));
                  try {
                    let e = t.map((e) => L(e)),
                      s = (await Promise.all(e)).filter((e) => void 0 !== e);
                    d((e) => [...e, ...s]);
                  } catch (e) {
                    console.error("Error uploading files!", e);
                  } finally {
                    w([]);
                  }
                },
                [d],
              );
            return (0, r.jsxs)("div", {
              className: "relative w-full flex flex-col gap-4",
              children: [
                0 === c.length &&
                  0 === o.length &&
                  0 === y.length &&
                  (0, r.jsx)(tn, { append: x, chatId: t }),
                (0, r.jsx)("input", {
                  type: "file",
                  className:
                    "fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none",
                  ref: b,
                  multiple: !0,
                  onChange: k,
                  tabIndex: -1,
                }),
                (o.length > 0 || y.length > 0) &&
                  (0, r.jsxs)("div", {
                    "data-testid": "attachments-preview",
                    className:
                      "flex flex-row gap-2 overflow-x-scroll items-end",
                    children: [
                      o.map((e) => (0, r.jsx)(e5, { attachment: e }, e.url)),
                      y.map((e) =>
                        (0, r.jsx)(
                          e5,
                          {
                            attachment: { url: "", name: e, contentType: "" },
                            isUploading: !0,
                          },
                          e,
                        ),
                      ),
                    ],
                  }),
                (0, r.jsx)(e0.T, {
                  "data-testid": "multimodal-input",
                  ref: h,
                  placeholder: "Send a message...",
                  value: s,
                  onChange: (e) => {
                    n(e.target.value), g();
                  },
                  className: es()(
                    "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700",
                    m,
                  ),
                  rows: 2,
                  autoFocus: !0,
                  onKeyDown: (e) => {
                    "Enter" === e.key &&
                      !e.shiftKey &&
                      !e.nativeEvent.isComposing &&
                      (e.preventDefault(),
                      "ready" !== i
                        ? B.oR.error(
                            "Please wait for the model to finish its response!",
                          )
                        : (s.trim().length > 0 || o.length > 0) && N());
                  },
                }),
                (0, r.jsx)("div", {
                  className:
                    "absolute bottom-0 p-2 w-fit flex flex-row justify-start",
                  children: (0, r.jsx)(tl, { fileInputRef: b, status: i }),
                }),
                (0, r.jsx)("div", {
                  className:
                    "absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end",
                  children:
                    "streaming" === i
                      ? (0, r.jsx)(ta, { stop: a, setMessages: u })
                      : (0, r.jsx)(to, {
                          input: s,
                          submitForm: N,
                          uploadQueue: y,
                        }),
                }),
              ],
            });
          },
          (e, t) =>
            e.input === t.input &&
            e.status === t.status &&
            !!ee()(e.attachments, t.attachments),
        ),
        tl = (0, l.memo)(function (e) {
          let { fileInputRef: t, status: s } = e;
          return (0, r.jsx)(v.$, {
            "data-testid": "attachments-button",
            className:
              "rounded-md rounded-bl-lg p-[7px] h-fit dark:border-zinc-700 hover:dark:bg-zinc-900 hover:bg-zinc-200",
            onClick: (e) => {
              var s;
              e.preventDefault(), null == (s = t.current) || s.click();
            },
            disabled: "ready" !== s,
            variant: "ghost",
            children: (0, r.jsx)(L, { size: 14 }),
          });
        }),
        ta = (0, l.memo)(function (e) {
          let { stop: t, setMessages: s } = e;
          return (0, r.jsx)(v.$, {
            "data-testid": "stop-button",
            className: "rounded-full p-1.5 h-fit border dark:border-zinc-600",
            onClick: (e) => {
              e.preventDefault(), t(), s((e) => (0, m.y8)(e));
            },
            children: (0, r.jsx)(N, { size: 14 }),
          });
        }),
        to = (0, l.memo)(
          function (e) {
            let { submitForm: t, input: s, uploadQueue: n } = e;
            return (0, r.jsx)(v.$, {
              "data-testid": "send-button",
              className: "rounded-full p-1.5 h-fit border dark:border-zinc-600",
              onClick: (e) => {
                e.preventDefault(), t();
              },
              disabled: 0 === s.trim().length || n.length > 0,
              children: (0, r.jsx)(w, { size: 14 }),
            });
          },
          (e, t) =>
            e.uploadQueue.length === t.uploadQueue.length &&
            e.input === t.input,
        );
      s(14024);
      let td = () => "/api/history";
      function tc(e) {
        var t;
        let {
            id: s,
            initialMessages: c,
            initialChatModel: u,
            initialVisibility: p,
            isReadonly: g,
            session: f,
            autoResume: v,
          } = e,
          { mutate: j } = (0, a.iX)(),
          C = null == f || null == (t = f.user) ? void 0 : t.id,
          { visibilityType: b } = x({ chatId: s, initialVisibility: p }),
          {
            messages: y,
            setMessages: w,
            handleSubmit: N,
            input: L,
            setInput: k,
            append: V,
            status: H,
            stop: T,
            reload: M,
          } = (0, n.Y_)({
            id: s,
            initialMessages: c,
            experimental_throttle: 100,
            sendExtraMessageFields: !0,
            generateId: m.lk,
            experimental_prepareRequestBody: (e) => ({
              id: s,
              messages: e.messages,
              selectedChatModel: u,
              visibility: b,
            }),
            onFinish: () => {
              j((0, d.WI)(td));
            },
            onError: (e) => {
              B.oR.error(e.message);
            },
          });
        (0, l.useEffect)(() => {}, []);
        let R = (0, i.useSearchParams)().get("query"),
          [I, S] = (0, l.useState)(!1);
        (0, l.useEffect)(() => {
          R &&
            !I &&
            (V({ role: "user", content: R }),
            S(!0),
            window.history.replaceState({}, "", "/chat/".concat(s)));
        }, [R, V, I, s]);
        let { data: z } = (0, o.Ay)(
            y.length >= 2 && s ? "/api/vote?sessionId=".concat(s) : null,
            m.GO,
          ),
          [Z, _] = (0, l.useState)([]);
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsxs)("div", {
              className: "flex flex-col min-w-0 h-dvh bg-background",
              children: [
                (0, r.jsx)(Y, {
                  chatId: s,
                  selectedModelId: u,
                  visibility: b,
                  isReadonly: g,
                }),
                (0, r.jsx)(ts, {
                  sessionId: s,
                  status: H,
                  votes: z,
                  messages: y,
                  setMessages: w,
                  reload: M,
                  isReadonly: g,
                  isArtifactVisible: !1,
                  currentUserId: C,
                }),
                (0, r.jsx)("form", {
                  className:
                    "flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl",
                  children:
                    !g &&
                    (0, r.jsx)(ti, {
                      chatId: s,
                      input: L,
                      setInput: k,
                      status: H,
                      stop: T,
                      attachments: Z,
                      setAttachments: _,
                      messages: y,
                      setMessages: w,
                      append: V,
                    }),
                }),
              ],
            }),
            (0, r.jsx)(h.Artifact, { id: s, viewOnly: g }),
          ],
        });
      }
      function tu(e) {
        let { id: t } = e,
          { data: s } = (0, n.Y_)({ id: t }),
          { artifact: r, setArtifact: i, setMetadata: a } = (0, ei.ST)(),
          o = (0, l.useRef)(-1);
        return (
          (0, l.useEffect)(() => {
            if (!(null == s ? void 0 : s.length)) return;
            let e = s.slice(o.current + 1);
            (o.current = s.length - 1),
              e.forEach((e) => {
                let t = e_.Rh.find((e) => e.kind === r.kind);
                (null == t ? void 0 : t.onStreamPart) &&
                  t.onStreamPart({
                    streamPart: e,
                    setArtifact: i,
                    setMetadata: a,
                  }),
                  i((t) => {
                    if (!t) return { ...e_.ls, status: "streaming" };
                    switch (e.type) {
                      case "id":
                        return {
                          ...t,
                          documentId: e.content,
                          status: "streaming",
                        };
                      case "title":
                        return { ...t, title: e.content, status: "streaming" };
                      case "kind":
                        return { ...t, kind: e.content, status: "streaming" };
                      case "clear":
                        return { ...t, content: "", status: "streaming" };
                      case "finish":
                        return { ...t, status: "idle" };
                      default:
                        return t;
                    }
                  });
              });
          }, [s, i, a, r]),
          null
        );
      }
      let tx = (e) => {
        let { session: t, id: s, initialChatModel: n } = e;
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(
              tc,
              {
                id: s,
                initialMessages: [],
                initialChatModel: n,
                initialVisibility: "private",
                isReadonly: !1,
                session: t,
                autoResume: !1,
              },
              s,
            ),
            (0, r.jsx)(tu, { id: s }),
          ],
        });
      };
    },
    27325: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 26653)),
        Promise.resolve().then(s.bind(s, 84418));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [3371, 6593, 4223, 3209, 7358], () => t(27325)), (_N_E = e.O());
  },
]);
