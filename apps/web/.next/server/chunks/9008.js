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
    (e._sentryDebugIds[t] = "df69edd7-19fb-43da-ac66-c466e153fae6"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-df69edd7-19fb-43da-ac66-c466e153fae6"));
} catch (e) {}
("use strict");
(exports.id = 9008),
  (exports.ids = [9008]),
  (exports.modules = {
    278: (e, t, s) => {
      s.d(t, { bL: () => w, zi: () => N });
      var a = s(84205),
        r = s(28777),
        i = s(71604),
        n = s(18047),
        l = s(48705),
        c = s(67155),
        o = s(91557),
        d = s(78593),
        m = s(61268),
        h = "Switch",
        [u, p] = (0, n.A)(h),
        [x, f] = u(h),
        g = a.forwardRef((e, t) => {
          let {
              __scopeSwitch: s,
              name: n,
              checked: c,
              defaultChecked: o,
              required: u,
              disabled: p,
              value: f = "on",
              onCheckedChange: g,
              form: j,
              ...y
            } = e,
            [w, N] = a.useState(null),
            k = (0, i.s)(t, (e) => N(e)),
            S = a.useRef(!1),
            C = !w || j || !!w.closest("form"),
            [A, T] = (0, l.i)({
              prop: c,
              defaultProp: o ?? !1,
              onChange: g,
              caller: h,
            });
          return (0, m.jsxs)(x, {
            scope: s,
            checked: A,
            disabled: p,
            children: [
              (0, m.jsx)(d.sG.button, {
                type: "button",
                role: "switch",
                "aria-checked": A,
                "aria-required": u,
                "data-state": b(A),
                "data-disabled": p ? "" : void 0,
                disabled: p,
                value: f,
                ...y,
                ref: k,
                onClick: (0, r.m)(e.onClick, (e) => {
                  T((e) => !e),
                    C &&
                      ((S.current = e.isPropagationStopped()),
                      S.current || e.stopPropagation());
                }),
              }),
              C &&
                (0, m.jsx)(v, {
                  control: w,
                  bubbles: !S.current,
                  name: n,
                  value: f,
                  checked: A,
                  required: u,
                  disabled: p,
                  form: j,
                  style: { transform: "translateX(-100%)" },
                }),
            ],
          });
        });
      g.displayName = h;
      var j = "SwitchThumb",
        y = a.forwardRef((e, t) => {
          let { __scopeSwitch: s, ...a } = e,
            r = f(j, s);
          return (0, m.jsx)(d.sG.span, {
            "data-state": b(r.checked),
            "data-disabled": r.disabled ? "" : void 0,
            ...a,
            ref: t,
          });
        });
      y.displayName = j;
      var v = a.forwardRef(
        (
          { __scopeSwitch: e, control: t, checked: s, bubbles: r = !0, ...n },
          l,
        ) => {
          let d = a.useRef(null),
            h = (0, i.s)(d, l),
            u = (0, c.Z)(s),
            p = (0, o.X)(t);
          return (
            a.useEffect(() => {
              let e = d.current;
              if (!e) return;
              let t = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "checked",
              ).set;
              if (u !== s && t) {
                let a = new Event("click", { bubbles: r });
                t.call(e, s), e.dispatchEvent(a);
              }
            }, [u, s, r]),
            (0, m.jsx)("input", {
              type: "checkbox",
              "aria-hidden": !0,
              defaultChecked: s,
              ...n,
              tabIndex: -1,
              ref: h,
              style: {
                ...n.style,
                ...p,
                position: "absolute",
                pointerEvents: "none",
                opacity: 0,
                margin: 0,
              },
            })
          );
        },
      );
      function b(e) {
        return e ? "checked" : "unchecked";
      }
      v.displayName = "SwitchBubbleInput";
      var w = g,
        N = y;
    },
    1480: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { y: () => d });
          var r = s(61268),
            i = s(67060),
            n = s(84205),
            l = s(28909),
            c = s(15942),
            o = e([l, c]);
          function d({ messages: e, append: t, className: s }) {
            let [a, o] = (0, n.useState)([]),
              [d, m] = (0, n.useState)(!0);
            if (!d || 0 === a.length) return null;
            let h = (e) => {
              t({ id: crypto.randomUUID(), content: e, role: "user" });
            };
            return (0, r.jsxs)("div", {
              className: (0, c.cn)("mb-4", s),
              children: [
                (0, r.jsxs)("div", {
                  className: "mb-2 flex items-center gap-2",
                  children: [
                    (0, r.jsx)(i.A, { className: "h-4 w-4 text-primary" }),
                    (0, r.jsx)("span", {
                      className: "text-sm font-medium",
                      children: "Suggested questions",
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: "flex flex-wrap gap-2",
                  children: a.map((e, t) =>
                    (0, r.jsx)(
                      l.$,
                      {
                        variant: "outline",
                        size: "sm",
                        className: "text-xs",
                        onClick: () => h(e),
                        children: e,
                      },
                      t,
                    ),
                  ),
                }),
              ],
            });
          }
          ([l, c] = o.then ? (await o)() : o), a();
        } catch (e) {
          a(e);
        }
      });
    },
    5451: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, {
            BT: () => h,
            Wu: () => u,
            ZB: () => m,
            Zp: () => o,
            aR: () => d,
            wL: () => p,
          });
          var r = s(61268),
            i = s(55728),
            n = s(84205),
            l = s(15942),
            c = e([l]);
          l = (c.then ? (await c)() : c)[0];
          let o = n.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)(i.P.div, {
              ref: s,
              className: (0, l.cn)(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                e,
              ),
              whileHover: {
                scale: 1.03,
                boxShadow:
                  "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
              },
              transition: { type: "spring", stiffness: 300, damping: 20 },
              ...t,
            }),
          );
          o.displayName = "Card";
          let d = n.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("div", {
              ref: s,
              className: (0, l.cn)("flex flex-col space-y-1.5 p-6", e),
              ...t,
            }),
          );
          d.displayName = "CardHeader";
          let m = n.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("h3", {
              ref: s,
              className: (0, l.cn)(
                "text-2xl font-semibold leading-none tracking-tight",
                e,
              ),
              ...t,
            }),
          );
          m.displayName = "CardTitle";
          let h = n.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("p", {
              ref: s,
              className: (0, l.cn)("text-sm text-muted-foreground", e),
              ...t,
            }),
          );
          h.displayName = "CardDescription";
          let u = n.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("div", {
              ref: s,
              className: (0, l.cn)("p-6 pt-0", e),
              ...t,
            }),
          );
          u.displayName = "CardContent";
          let p = n.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("div", {
              ref: s,
              className: (0, l.cn)("flex items-center p-6 pt-0", e),
              ...t,
            }),
          );
          (p.displayName = "CardFooter"), a();
        } catch (e) {
          a(e);
        }
      });
    },
    9671: (e, t, s) => {
      s.d(t, { A: () => c });
      var a = s(55511);
      let r = { randomUUID: a.randomUUID },
        i = new Uint8Array(256),
        n = i.length,
        l = [];
      for (let e = 0; e < 256; ++e) l.push((e + 256).toString(16).slice(1));
      let c = function (e, t, s) {
        if (r.randomUUID && !t && !e) return r.randomUUID();
        let c =
          (e = e || {}).random ??
          e.rng?.() ??
          (n > i.length - 16 && ((0, a.randomFillSync)(i), (n = 0)),
          i.slice(n, (n += 16)));
        if (c.length < 16) throw Error("Random bytes length must be >= 16");
        if (((c[6] = (15 & c[6]) | 64), (c[8] = (63 & c[8]) | 128), t)) {
          if ((s = s || 0) < 0 || s + 16 > t.length)
            throw RangeError(
              `UUID byte range ${s}:${s + 15} is out of buffer bounds`,
            );
          for (let e = 0; e < 16; ++e) t[s + e] = c[e];
          return t;
        }
        return (function (e, t = 0) {
          return (
            l[e[t + 0]] +
            l[e[t + 1]] +
            l[e[t + 2]] +
            l[e[t + 3]] +
            "-" +
            l[e[t + 4]] +
            l[e[t + 5]] +
            "-" +
            l[e[t + 6]] +
            l[e[t + 7]] +
            "-" +
            l[e[t + 8]] +
            l[e[t + 9]] +
            "-" +
            l[e[t + 10]] +
            l[e[t + 11]] +
            l[e[t + 12]] +
            l[e[t + 13]] +
            l[e[t + 14]] +
            l[e[t + 15]]
          ).toLowerCase();
        })(c);
      };
    },
    11102: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { Q: () => v });
          var r = s(61268),
            i = s(99793),
            n = s(90495),
            l = s(58882),
            c = s(89525),
            o = s(61950),
            d = s(84205),
            m = s(46532),
            h = s(28909),
            u = s(5451),
            p = s(92256),
            x = s(13242),
            f = s(77001),
            g = s(37787),
            j = s(62268),
            y = e([m, h, u, p, f, g, j]);
          function v({
            chatId: e,
            attachments: t,
            append: s,
            isLoading: a,
            isVisible: y,
            className: v,
          }) {
            let [b, w] = (0, d.useState)([]),
              [N, k] = (0, d.useState)(null),
              [S, C] = (0, d.useState)("documents"),
              [A, T] = (0, d.useState)(""),
              [$, R] = (0, d.useState)(!1),
              [D, I] = (0, d.useState)(!1);
            (0, d.useCallback)(
              async (s) => {
                w((e) =>
                  e.map((e) =>
                    e.id === s
                      ? { ...e, ocrStatus: "processing", progress: 10 }
                      : e,
                  ),
                );
                try {
                  let a = t.find((e) => e.id === s);
                  if (!a) throw Error("Attachment not found");
                  let r = "",
                    i = "";
                  a.url
                    ? (i = a.url)
                    : (r = await new Promise((e) => {
                        let t = new FileReader();
                        (t.onload = (t) => {
                          if (t.target?.result) {
                            let s = t.target.result.toString(),
                              a = s.includes("base64,")
                                ? s.split("base64,")[1]
                                : s;
                            e(a);
                          } else e("");
                        }),
                          t.readAsDataURL(a);
                      })),
                    w((e) =>
                      e.map((e) => (e.id === s ? { ...e, progress: 30 } : e)),
                    );
                  let n = await fetch("/api/documents/ocr", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fileId: s,
                      chatId: e,
                      fileName: a.name,
                      fileType: a.type,
                      fileUrl: i,
                      fileContent: r,
                    }),
                  });
                  if (!n.ok) {
                    let e = await n.json();
                    throw Error(e.error || "Failed to process document");
                  }
                  w((e) =>
                    e.map((e) => (e.id === s ? { ...e, progress: 90 } : e)),
                  );
                  let l = await n.json();
                  w((e) =>
                    e.map((e) =>
                      e.id === s
                        ? {
                            ...e,
                            ocrStatus: "complete",
                            progress: 100,
                            ocrText: l.text,
                          }
                        : e,
                    ),
                  );
                } catch (e) {
                  console.error("Error processing document:", e),
                    w((t) =>
                      t.map((t) =>
                        t.id === s
                          ? {
                              ...t,
                              ocrStatus: "error",
                              progress: 0,
                              errorMessage:
                                e instanceof Error
                                  ? e.message
                                  : "Unknown error",
                            }
                          : t,
                      ),
                    );
                }
              },
              [t, e],
            );
            let E = async () => {
              if (N && A.trim() && !$ && !a) {
                R(!0),
                  w((e) =>
                    e.map((e) =>
                      e.id === N.id
                        ? {
                            ...e,
                            questions: [
                              ...(e.questions || []),
                              {
                                question: A,
                                answer: "Processing...",
                                timestamp: Date.now(),
                              },
                            ],
                          }
                        : e,
                    ),
                  );
                try {
                  let t = await fetch("/api/documents/ocr/question", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fileId: N.id,
                      chatId: e,
                      question: A,
                    }),
                  });
                  if (!t.ok) {
                    let e = await t.json();
                    throw Error(e.error || "Failed to process question");
                  }
                  let a = await t.json();
                  w((e) =>
                    e.map((e) => {
                      if (e.id === N.id) {
                        let t = [...(e.questions || [])],
                          s = t.length - 1;
                        return (
                          s >= 0 && (t[s].answer = a.answer),
                          { ...e, questions: t }
                        );
                      }
                      return e;
                    }),
                  );
                  let r = {
                    id: Date.now().toString(),
                    role: "system",
                    content: `Document Q&A:
      
Document: ${N.name}
Question: ${A}
Answer: ${a.answer}`,
                  };
                  await s(r), T("");
                } catch (e) {
                  console.error("Error asking question:", e),
                    w((t) =>
                      t.map((t) => {
                        if (t.id === N.id) {
                          let s = [...(t.questions || [])],
                            a = s.length - 1;
                          return (
                            a >= 0 &&
                              (s[a].answer =
                                `Error: ${e instanceof Error ? e.message : "Failed to process question"}`),
                            { ...t, questions: s }
                          );
                        }
                        return t;
                      }),
                    );
                } finally {
                  R(!1);
                }
              }
            };
            return y
              ? (0, r.jsxs)("div", {
                  className: `h-full border-l bg-background overflow-auto ${v}`,
                  children: [
                    (0, r.jsxs)("div", {
                      className:
                        "flex items-center justify-between p-4 border-b",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex items-center",
                          children: [
                            (0, r.jsx)(i.A, { className: "h-5 w-5 mr-2" }),
                            (0, r.jsx)("h3", {
                              className: "font-semibold",
                              children: "Document Processor",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(h.$, {
                          size: "sm",
                          variant: "ghost",
                          className: "h-8 w-8 p-0",
                          onClick: () =>
                            document.dispatchEvent(
                              new CustomEvent("toggle-document-processor"),
                            ),
                          children: [
                            (0, r.jsx)(n.A, { className: "h-4 w-4" }),
                            (0, r.jsx)("span", {
                              className: "sr-only",
                              children: "Close",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "p-4",
                      children: [
                        (0, r.jsxs)(h.$, {
                          onClick: () => {
                            let e = document.createElement("input");
                            (e.type = "file"),
                              (e.accept =
                                "application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
                              (e.multiple = !1),
                              (e.onchange = (e) => {
                                let t = e.target.files;
                                if (!t || 0 === t.length) return;
                                let s = t[0],
                                  a = Math.random()
                                    .toString(36)
                                    .substring(2, 9),
                                  r = {
                                    id: a,
                                    name: s.name,
                                    type: s.type,
                                    size: s.size,
                                    ocrStatus: "idle",
                                    progress: 0,
                                  };
                                w((e) => [...e, r]);
                                let i = new FileReader();
                                (i.onload = async (e) => {
                                  if (e.target?.result) {
                                    I(!0);
                                    try {
                                      w((e) =>
                                        e.map((e) =>
                                          e.id === a
                                            ? {
                                                ...e,
                                                ocrStatus: "processing",
                                                progress: 10,
                                              }
                                            : e,
                                        ),
                                      ),
                                        await new Promise((e) =>
                                          setTimeout(e, 2e3),
                                        ),
                                        w((e) =>
                                          e.map((e) =>
                                            e.id === a
                                              ? { ...e, progress: 50 }
                                              : e,
                                          ),
                                        ),
                                        await new Promise((e) =>
                                          setTimeout(e, 1e3),
                                        ),
                                        w((e) =>
                                          e.map((e) =>
                                            e.id === a
                                              ? {
                                                  ...e,
                                                  ocrStatus: "complete",
                                                  progress: 100,
                                                  ocrText: `This is example extracted text from ${s.name}.

In a real implementation, this would be the actual content extracted from the document using OCR technology.`,
                                                }
                                              : e,
                                          ),
                                        );
                                    } catch (e) {
                                      console.error(
                                        "Error processing file:",
                                        e,
                                      ),
                                        w((e) =>
                                          e.map((e) =>
                                            e.id === a
                                              ? {
                                                  ...e,
                                                  ocrStatus: "error",
                                                  progress: 0,
                                                  errorMessage:
                                                    "Failed to process document",
                                                }
                                              : e,
                                          ),
                                        );
                                    } finally {
                                      I(!1);
                                    }
                                  }
                                }),
                                  (i.onerror = () => {
                                    w((e) =>
                                      e.map((e) =>
                                        e.id === a
                                          ? {
                                              ...e,
                                              ocrStatus: "error",
                                              errorMessage:
                                                "Failed to read file",
                                            }
                                          : e,
                                      ),
                                    ),
                                      I(!1);
                                  }),
                                  i.readAsDataURL(s);
                              }),
                              e.click();
                          },
                          className: "w-full mb-4",
                          disabled: D,
                          children: [
                            (0, r.jsx)(l.A, { className: "h-4 w-4 mr-2" }),
                            "Upload New Document",
                          ],
                        }),
                        (0, r.jsxs)(f.Tabs, {
                          defaultValue: "documents",
                          className: "w-full",
                          children: [
                            (0, r.jsxs)(f.TabsList, {
                              className: "grid w-full grid-cols-2",
                              children: [
                                (0, r.jsxs)(f.TabsTrigger, {
                                  value: "documents",
                                  onClick: () => C("documents"),
                                  children: ["Documents (", b.length, ")"],
                                }),
                                (0, r.jsx)(f.TabsTrigger, {
                                  value: "qa",
                                  onClick: () => C("qa"),
                                  disabled: !N || "complete" !== N.ocrStatus,
                                  children: "Q&A",
                                }),
                              ],
                            }),
                            (0, r.jsxs)(f.TabsContent, {
                              value: "documents",
                              className: "mt-2",
                              children: [
                                (0, r.jsxs)(u.Zp, {
                                  children: [
                                    (0, r.jsxs)(u.aR, {
                                      className: "pb-2",
                                      children: [
                                        (0, r.jsx)(u.ZB, {
                                          className: "text-base",
                                          children: "Processed Documents",
                                        }),
                                        (0, r.jsx)(u.BT, {
                                          children:
                                            "Documents processed with Mistral OCR to extract text",
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)(u.Wu, {
                                      children: (0, r.jsx)(x.F, {
                                        className: "h-[300px] pr-4",
                                        children: (0, r.jsx)("div", {
                                          className: "space-y-4",
                                          children: b.map((e) =>
                                            (0, r.jsxs)(
                                              u.Zp,
                                              {
                                                className: `overflow-hidden ${N?.id === e.id ? "border-primary" : ""}`,
                                                children: [
                                                  (0, r.jsx)(u.aR, {
                                                    className: "p-3",
                                                    children: (0, r.jsxs)(
                                                      "div",
                                                      {
                                                        className:
                                                          "flex items-start justify-between",
                                                        children: [
                                                          (0, r.jsxs)("div", {
                                                            className:
                                                              "flex items-center space-x-2",
                                                            children: [
                                                              (0, r.jsx)(c.A, {
                                                                className:
                                                                  "h-4 w-4 text-muted-foreground",
                                                              }),
                                                              (0, r.jsxs)(
                                                                "div",
                                                                {
                                                                  children: [
                                                                    (0, r.jsx)(
                                                                      "h4",
                                                                      {
                                                                        className:
                                                                          "text-sm font-medium leading-none",
                                                                        children:
                                                                          e.name,
                                                                      },
                                                                    ),
                                                                    (0, r.jsx)(
                                                                      "p",
                                                                      {
                                                                        className:
                                                                          "text-xs text-muted-foreground",
                                                                        children:
                                                                          e.type,
                                                                      },
                                                                    ),
                                                                  ],
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                          (0, r.jsx)(m.E, {
                                                            variant:
                                                              "complete" ===
                                                              e.ocrStatus
                                                                ? "default"
                                                                : "processing" ===
                                                                    e.ocrStatus
                                                                  ? "outline"
                                                                  : "error" ===
                                                                      e.ocrStatus
                                                                    ? "destructive"
                                                                    : "secondary",
                                                            children:
                                                              e.ocrStatus,
                                                          }),
                                                        ],
                                                      },
                                                    ),
                                                  }),
                                                  "processing" ===
                                                    e.ocrStatus &&
                                                    (0, r.jsxs)("div", {
                                                      className: "px-3 pb-3",
                                                      children: [
                                                        (0, r.jsx)(p.k, {
                                                          value: e.progress,
                                                          className: "h-1",
                                                        }),
                                                        (0, r.jsxs)("p", {
                                                          className:
                                                            "text-xs text-muted-foreground mt-1",
                                                          children: [
                                                            "Processing: ",
                                                            e.progress,
                                                            "%",
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                  "complete" === e.ocrStatus &&
                                                    (0, r.jsx)(u.wL, {
                                                      className: "p-3 pt-0",
                                                      children: (0, r.jsx)(
                                                        h.$,
                                                        {
                                                          variant: "outline",
                                                          size: "sm",
                                                          className: "w-full",
                                                          onClick: () => k(e),
                                                          children:
                                                            "View Content",
                                                        },
                                                      ),
                                                    }),
                                                  "error" === e.ocrStatus &&
                                                    (0, r.jsx)("div", {
                                                      className: "px-3 pb-3",
                                                      children: (0, r.jsxs)(
                                                        "div",
                                                        {
                                                          className:
                                                            "flex items-center text-destructive text-xs",
                                                          children: [
                                                            (0, r.jsx)(o.A, {
                                                              className:
                                                                "h-3 w-3 mr-1",
                                                            }),
                                                            e.errorMessage ||
                                                              "Processing failed",
                                                          ],
                                                        },
                                                      ),
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
                                N &&
                                  "complete" === N.ocrStatus &&
                                  (0, r.jsxs)(u.Zp, {
                                    className: "mt-4",
                                    children: [
                                      (0, r.jsxs)(u.aR, {
                                        className: "pb-2",
                                        children: [
                                          (0, r.jsx)(u.ZB, {
                                            className: "text-base",
                                            children: N.name,
                                          }),
                                          (0, r.jsx)(u.BT, {
                                            children:
                                              "Extracted document content with Mistral OCR",
                                          }),
                                        ],
                                      }),
                                      (0, r.jsx)(u.Wu, {
                                        children: (0, r.jsx)(x.F, {
                                          className: "h-[200px] pr-4",
                                          children: (0, r.jsx)("div", {
                                            className:
                                              "prose-sm dark:prose-invert",
                                            children: (0, r.jsx)(j.C, {
                                              content:
                                                N.ocrText ||
                                                "No content extracted",
                                            }),
                                          }),
                                        }),
                                      }),
                                      (0, r.jsx)(u.wL, {
                                        children: (0, r.jsx)(h.$, {
                                          onClick: () => C("qa"),
                                          className: "w-full",
                                          children:
                                            "Ask Questions About This Document",
                                        }),
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                            (0, r.jsx)(f.TabsContent, {
                              value: "qa",
                              className: "mt-2",
                              children:
                                N &&
                                (0, r.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, r.jsxs)(u.Zp, {
                                      children: [
                                        (0, r.jsxs)(u.aR, {
                                          className: "pb-2",
                                          children: [
                                            (0, r.jsxs)(u.ZB, {
                                              className: "text-base",
                                              children: ["Ask About ", N.name],
                                            }),
                                            (0, r.jsx)(u.BT, {
                                              children:
                                                "Ask questions about the document content using Mistral AI",
                                            }),
                                          ],
                                        }),
                                        (0, r.jsx)(u.Wu, {
                                          children: (0, r.jsxs)("form", {
                                            onSubmit: (e) => {
                                              e.preventDefault(), E();
                                            },
                                            className: "flex flex-col gap-4",
                                            children: [
                                              (0, r.jsx)(g.T, {
                                                value: A,
                                                onChange: (e) =>
                                                  T(e.target.value),
                                                placeholder:
                                                  "Ask a question about this document...",
                                                className: "min-h-[80px]",
                                              }),
                                              (0, r.jsx)(h.$, {
                                                type: "submit",
                                                disabled: !A.trim() || $ || a,
                                                children: $
                                                  ? "Processing..."
                                                  : "Ask Question",
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                    N.questions &&
                                      N.questions.length > 0 &&
                                      (0, r.jsxs)(u.Zp, {
                                        children: [
                                          (0, r.jsx)(u.aR, {
                                            className: "pb-2",
                                            children: (0, r.jsx)(u.ZB, {
                                              className: "text-base",
                                              children: "Document Q&A History",
                                            }),
                                          }),
                                          (0, r.jsx)(u.Wu, {
                                            children: (0, r.jsx)(x.F, {
                                              className: "h-[300px] pr-4",
                                              children: (0, r.jsx)("div", {
                                                className: "space-y-4",
                                                children: [...N.questions]
                                                  .reverse()
                                                  .map((e, t) =>
                                                    (0, r.jsxs)(
                                                      "div",
                                                      {
                                                        className:
                                                          "border-b pb-4 last:border-0 last:pb-0",
                                                        children: [
                                                          (0, r.jsxs)("p", {
                                                            className:
                                                              "font-medium text-sm",
                                                            children: [
                                                              "Q: ",
                                                              e.question,
                                                            ],
                                                          }),
                                                          (0, r.jsxs)("div", {
                                                            className:
                                                              "text-sm mt-2",
                                                            children: [
                                                              (0, r.jsx)("p", {
                                                                children: "A: ",
                                                              }),
                                                              (0, r.jsx)(j.C, {
                                                                content:
                                                                  e.answer,
                                                              }),
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      t,
                                                    ),
                                                  ),
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : null;
          }
          ([m, h, u, p, f, g, j] = y.then ? (await y)() : y), a();
        } catch (e) {
          a(e);
        }
      });
    },
    13909: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { d: () => o });
          var r = s(61268),
            i = s(278),
            n = s(84205),
            l = s(15942),
            c = e([l]);
          l = (c.then ? (await c)() : c)[0];
          let o = n.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)(i.bL, {
              className: (0, l.cn)(
                "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                e,
              ),
              ...t,
              ref: s,
              children: (0, r.jsx)(i.zi, {
                className: (0, l.cn)(
                  "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
                ),
              }),
            }),
          );
          (o.displayName = i.bL.displayName), a();
        } catch (e) {
          a(e);
        }
      });
    },
    14835: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { h: () => N });
          var r = s(61268),
            i = s(44803),
            n = s(90495),
            l = s(66135),
            c = s(61950),
            o = s(99927),
            d = s(84205),
            m = s(44619),
            h = s(46532),
            u = s(28909),
            p = s(5451),
            x = s(78337),
            f = s(16979),
            g = s(92256),
            j = s(13242),
            y = s(13909),
            v = s(37787),
            b = s(62268),
            w = e([m, h, u, p, x, f, g, y, v, b]);
          function N({
            chatId: e,
            append: t,
            isLoading: s,
            isVisible: a,
            className: w,
          }) {
            let [N, k] = (0, d.useState)(""),
              [S, C] = (0, d.useState)(""),
              [A, T] = (0, d.useState)(!1),
              [$, R] = (0, d.useState)(null),
              [D, I] = (0, d.useState)([]),
              [E, F] = (0, d.useState)(!0),
              [M, U] = (0, d.useState)(0),
              [z, P] = (0, d.useState)("form"),
              q = async () => {
                if (!N.trim()) return void R("Please enter a URL to scrape");
                T(!0), R(null), U(0);
                try {
                  let e = setInterval(() => {
                    U((e) => {
                      let t = e + 15 * Math.random();
                      return t > 90 ? 90 : t;
                    });
                  }, 500);
                  await new Promise((e) => setTimeout(e, 3e3)),
                    clearInterval(e),
                    U(100);
                  let s = {
                    url: N,
                    title: `Content from ${N}`,
                    content: `This is scraped content from ${N}. In a real implementation, this would contain actual content from the webpage.`,
                    timestamp: Date.now(),
                    metadata: {
                      status: 200,
                      contentType: "text/html",
                      immigrationData: E
                        ? {
                            documentType: "Government Website",
                            sourceType: "Official",
                            credibilityScore: 95,
                            countries: ["United States", "Canada"],
                            visaTypes: ["H-1B", "EB-5", "Student Visa"],
                            requirements: [
                              "Valid passport",
                              "Completed application form",
                              "Application fee payment",
                              "Supporting documents",
                            ],
                            keyPoints: [
                              "Processing time: 3-6 months",
                              "Fees vary by visa type",
                              "Medical examination may be required",
                              "Interviews are scheduled after application review",
                            ],
                          }
                        : void 0,
                    },
                  };
                  I((e) => [s, ...e]), P("results");
                  let a = {
                    id: `scrape-${Date.now()}`,
                    role: "assistant",
                    content: `### Web Scraping Results for ${N}

I've analyzed the content from this URL and found the following information:

${
  E
    ? `
#### Immigration Data
- Document Type: ${s.metadata?.immigrationData?.documentType}
- Source Type: ${s.metadata?.immigrationData?.sourceType}
- Credibility Score: ${s.metadata?.immigrationData?.credibilityScore}/100
- Countries: ${s.metadata?.immigrationData?.countries?.join(", ")}
- Visa Types: ${s.metadata?.immigrationData?.visaTypes?.join(", ")}

#### Key Requirements
${s.metadata?.immigrationData?.requirements?.map((e) => `- ${e}`).join("\n")}

#### Key Points
${s.metadata?.immigrationData?.keyPoints?.map((e) => `- ${e}`).join("\n")}
`
    : s.content
}

Would you like me to extract specific information from this content?`,
                  };
                  await t(a), k("");
                } catch (e) {
                  R(e.message || "Failed to scrape URL");
                } finally {
                  T(!1);
                }
              },
              L = async () => {
                if (!S.trim()) return void R("Please enter URLs to scrape");
                let e = S.split(/[\n,]/)
                  .map((e) => e.trim())
                  .filter((e) => e.length > 0);
                if (0 === e.length) return void R("No valid URLs found");
                T(!0), R(null), U(0);
                try {
                  let s = 0,
                    a = [];
                  for (let t of e)
                    U((s / e.length) * 100),
                      await new Promise((e) => setTimeout(e, 1e3)),
                      a.push({
                        url: t,
                        title: `Content from ${t}`,
                        content: `This is scraped content from ${t}. In a real implementation, this would contain actual content from the webpage.`,
                        timestamp: Date.now(),
                        metadata: {
                          status: 200,
                          contentType: "text/html",
                          immigrationData: E
                            ? {
                                documentType: "Immigration Resource",
                                sourceType: "Information Portal",
                                credibilityScore: 85,
                                countries: ["United States", "Canada"],
                                visaTypes: ["Work Visa", "Student Visa"],
                                requirements: [
                                  "Valid passport",
                                  "Completed application form",
                                  "Application fee payment",
                                ],
                                keyPoints: [
                                  "Processing time varies by visa type",
                                  "Fees are non-refundable",
                                  "Online application preferred",
                                ],
                              }
                            : void 0,
                        },
                      }),
                      s++;
                  U(100), I((e) => [...a, ...e]), P("results");
                  let r = {
                    id: `bulk-scrape-${Date.now()}`,
                    role: "assistant",
                    content: `### Bulk Web Scraping Results

I've analyzed content from ${e.length} URLs and found the following information:

${a
  .map(
    (e, t) => `
#### URL ${t + 1}: ${e.url}
${
  E && e.metadata?.immigrationData
    ? `
- Document Type: ${e.metadata.immigrationData.documentType}
- Source Type: ${e.metadata.immigrationData.sourceType}
- Credibility Score: ${e.metadata.immigrationData.credibilityScore}/100
- Visa Types: ${e.metadata.immigrationData.visaTypes?.join(", ")}
`
    : `- Content length: ${e.content.length} characters`
}
`,
  )
  .join("\n")}

Would you like me to analyze this information further?`,
                  };
                  await t(r), C("");
                } catch (e) {
                  R(e.message || "Failed to scrape URLs");
                } finally {
                  T(!1);
                }
              };
            return a
              ? (0, r.jsxs)("div", {
                  className: `h-full border-l bg-background overflow-auto ${w}`,
                  children: [
                    (0, r.jsxs)("div", {
                      className:
                        "flex items-center justify-between p-4 border-b",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex items-center",
                          children: [
                            (0, r.jsx)(i.A, { className: "h-5 w-5 mr-2" }),
                            (0, r.jsx)("h3", {
                              className: "font-semibold",
                              children: "Web Scraper",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "flex gap-2",
                          children: [
                            (0, r.jsx)(u.$, {
                              size: "sm",
                              variant: "outline",
                              onClick: () =>
                                P("form" === z ? "results" : "form"),
                              children:
                                "form" === z ? "View Results" : "New Scrape",
                            }),
                            (0, r.jsxs)(u.$, {
                              size: "sm",
                              variant: "ghost",
                              className: "h-8 w-8 p-0",
                              onClick: () =>
                                document.dispatchEvent(
                                  new CustomEvent("toggle-web-scraper"),
                                ),
                              children: [
                                (0, r.jsx)(n.A, { className: "h-4 w-4" }),
                                (0, r.jsx)("span", {
                                  className: "sr-only",
                                  children: "Close",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    "form" === z
                      ? (0, r.jsxs)(p.Zp, {
                          children: [
                            (0, r.jsxs)(p.aR, {
                              children: [
                                (0, r.jsx)(p.ZB, {
                                  className: "text-lg",
                                  children: "Extract Web Content",
                                }),
                                (0, r.jsx)(p.BT, {
                                  children:
                                    "Scrape websites for immigration information",
                                }),
                              ],
                            }),
                            (0, r.jsxs)(p.Wu, {
                              className: "space-y-4",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, r.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, r.jsx)(f.J, {
                                          htmlFor: "url",
                                          children: "URL to Scrape",
                                        }),
                                        (0, r.jsxs)("div", {
                                          className: "flex gap-2",
                                          children: [
                                            (0, r.jsx)(x.p, {
                                              id: "url",
                                              type: "url",
                                              placeholder:
                                                "https://example.com/immigration-info",
                                              value: N,
                                              onChange: (e) =>
                                                k(e.target.value),
                                              disabled: A,
                                            }),
                                            (0, r.jsx)(u.$, {
                                              onClick: q,
                                              disabled: A || !N.trim(),
                                              children: A
                                                ? (0, r.jsx)(l.A, {
                                                    className:
                                                      "h-4 w-4 animate-spin",
                                                  })
                                                : "Scrape",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "pt-2 border-t",
                                      children: [
                                        (0, r.jsx)(f.J, {
                                          htmlFor: "bulk-urls",
                                          className: "block mb-2",
                                          children: "Bulk URLs (one per line)",
                                        }),
                                        (0, r.jsx)(v.T, {
                                          id: "bulk-urls",
                                          placeholder:
                                            "https://example1.com/immigration-info https://example2.com/visa-info",
                                          value: S,
                                          onChange: (e) => C(e.target.value),
                                          disabled: A,
                                          rows: 5,
                                          className: "mb-2",
                                        }),
                                        (0, r.jsxs)(u.$, {
                                          onClick: L,
                                          disabled: A || !S.trim(),
                                          className: "w-full",
                                          children: [
                                            A
                                              ? (0, r.jsx)(l.A, {
                                                  className:
                                                    "h-4 w-4 animate-spin mr-2",
                                                })
                                              : null,
                                            A
                                              ? "Processing..."
                                              : "Scrape All URLs",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className:
                                        "flex items-center space-x-2 pt-2",
                                      children: [
                                        (0, r.jsx)(y.d, {
                                          id: "extract-data",
                                          checked: E,
                                          onCheckedChange: F,
                                          disabled: A,
                                        }),
                                        (0, r.jsx)(f.J, {
                                          htmlFor: "extract-data",
                                          children: "Extract immigration data",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                A &&
                                  (0, r.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, r.jsxs)("div", {
                                        className:
                                          "flex justify-between text-sm",
                                        children: [
                                          (0, r.jsx)("span", {
                                            children: "Scraping in progress...",
                                          }),
                                          (0, r.jsxs)("span", {
                                            children: [Math.round(M), "%"],
                                          }),
                                        ],
                                      }),
                                      (0, r.jsx)(g.k, {
                                        value: M,
                                        className: "h-2",
                                      }),
                                    ],
                                  }),
                                $ &&
                                  (0, r.jsxs)(m.Fc, {
                                    variant: "destructive",
                                    children: [
                                      (0, r.jsx)(c.A, { className: "h-4 w-4" }),
                                      (0, r.jsx)(m.XL, { children: "Error" }),
                                      (0, r.jsx)(m.TN, { children: $ }),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        })
                      : (0, r.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, r.jsxs)("h3", {
                              className: "font-medium",
                              children: ["Scraping Results (", D.length, ")"],
                            }),
                            0 === D.length
                              ? (0, r.jsx)("div", {
                                  className:
                                    "text-center p-4 text-muted-foreground",
                                  children:
                                    "No results yet. Start scraping to see content here.",
                                })
                              : (0, r.jsx)(j.F, {
                                  className: "h-[calc(100vh-120px)]",
                                  children: (0, r.jsx)("div", {
                                    className: "space-y-4 pr-4",
                                    children: D.map((e, s) =>
                                      (0, r.jsxs)(
                                        p.Zp,
                                        {
                                          className: "overflow-hidden",
                                          children: [
                                            (0, r.jsxs)(p.aR, {
                                              className: "pb-2",
                                              children: [
                                                (0, r.jsxs)(p.ZB, {
                                                  className:
                                                    "text-base flex items-center gap-2",
                                                  children: [
                                                    (0, r.jsx)(o.A, {
                                                      className: "h-4 w-4",
                                                    }),
                                                    (0, r.jsx)("a", {
                                                      href: e.url,
                                                      target: "_blank",
                                                      rel: "noopener noreferrer",
                                                      className:
                                                        "text-primary hover:underline overflow-hidden text-ellipsis",
                                                      children: e.url,
                                                    }),
                                                  ],
                                                }),
                                                (0, r.jsxs)("div", {
                                                  className:
                                                    "flex flex-wrap gap-1 mt-1",
                                                  children: [
                                                    (0, r.jsx)(h.E, {
                                                      variant: "outline",
                                                      className: "text-xs",
                                                      children: new Date(
                                                        e.timestamp,
                                                      ).toLocaleString(),
                                                    }),
                                                    e.metadata
                                                      ?.immigrationData &&
                                                      (0, r.jsxs)(h.E, {
                                                        variant: "secondary",
                                                        className: "text-xs",
                                                        children: [
                                                          "Score:",
                                                          " ",
                                                          e.metadata
                                                            .immigrationData
                                                            .credibilityScore,
                                                          "%",
                                                        ],
                                                      }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, r.jsxs)(p.Wu, {
                                              className: "text-sm",
                                              children: [
                                                e.metadata?.immigrationData
                                                  ? (0, r.jsxs)("div", {
                                                      className: "space-y-2",
                                                      children: [
                                                        (0, r.jsxs)("div", {
                                                          children: [
                                                            (0, r.jsx)("span", {
                                                              className:
                                                                "font-medium",
                                                              children: "Type:",
                                                            }),
                                                            " ",
                                                            e.metadata
                                                              .immigrationData
                                                              .documentType,
                                                            " (",
                                                            e.metadata
                                                              .immigrationData
                                                              .sourceType,
                                                            ")",
                                                          ],
                                                        }),
                                                        e.metadata
                                                          .immigrationData
                                                          .countries &&
                                                          (0, r.jsxs)("div", {
                                                            children: [
                                                              (0, r.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-medium",
                                                                  children:
                                                                    "Countries:",
                                                                },
                                                              ),
                                                              " ",
                                                              e.metadata.immigrationData.countries.join(
                                                                ", ",
                                                              ),
                                                            ],
                                                          }),
                                                        e.metadata
                                                          .immigrationData
                                                          .visaTypes &&
                                                          (0, r.jsxs)("div", {
                                                            children: [
                                                              (0, r.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-medium",
                                                                  children:
                                                                    "Visa Types:",
                                                                },
                                                              ),
                                                              " ",
                                                              e.metadata.immigrationData.visaTypes.join(
                                                                ", ",
                                                              ),
                                                            ],
                                                          }),
                                                        e.metadata
                                                          .immigrationData
                                                          .requirements &&
                                                          (0, r.jsxs)("div", {
                                                            children: [
                                                              (0, r.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-medium",
                                                                  children:
                                                                    "Requirements:",
                                                                },
                                                              ),
                                                              (0, r.jsx)("ul", {
                                                                className:
                                                                  "list-disc pl-5",
                                                                children:
                                                                  e.metadata.immigrationData.requirements.map(
                                                                    (e, t) =>
                                                                      (0,
                                                                      r.jsx)(
                                                                        "li",
                                                                        {
                                                                          children:
                                                                            e,
                                                                        },
                                                                        t,
                                                                      ),
                                                                  ),
                                                              }),
                                                            ],
                                                          }),
                                                      ],
                                                    })
                                                  : (0, r.jsx)(b.C, {
                                                      content:
                                                        e.content.substring(
                                                          0,
                                                          200,
                                                        ) + "...",
                                                    }),
                                                (0, r.jsx)(u.$, {
                                                  variant: "link",
                                                  className:
                                                    "p-0 h-auto text-xs mt-2",
                                                  onClick: () => {
                                                    let s = {
                                                      id: `result-${Date.now()}`,
                                                      role: "assistant",
                                                      content: `I've added the content from ${e.url} to our conversation. Would you like me to summarize the key points?`,
                                                    };
                                                    t(s);
                                                  },
                                                  children: "Add to chat",
                                                }),
                                              ],
                                            }),
                                          ],
                                        },
                                        `${e.url}-${s}`,
                                      ),
                                    ),
                                  }),
                                }),
                          ],
                        }),
                  ],
                })
              : null;
          }
          ([m, h, u, p, x, f, g, y, v, b] = w.then ? (await w)() : w), a();
        } catch (e) {
          a(e);
        }
      });
    },
    16979: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { J: () => c });
          var r = s(61268),
            i = s(30595);
          s(84205);
          var n = s(15942),
            l = e([n]);
          function c({ className: e, ...t }) {
            return (0, r.jsx)(i.b, {
              "data-slot": "label",
              className: (0, n.cn)(
                "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                e,
              ),
              ...t,
            });
          }
          (n = (l.then ? (await l)() : l)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    18936: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("BarChartHorizontal", [
        ["path", { d: "M3 3v18h18", key: "1s2lah" }],
        ["path", { d: "M7 16h8", key: "srdodz" }],
        ["path", { d: "M7 11h12", key: "127s9w" }],
        ["path", { d: "M7 6h3", key: "w9rmul" }],
      ]);
    },
    19538: (e, t, s) => {
      s.d(t, { V: () => n });
      var a = s(84205),
        r = s(58702);
      let i = (e = r.q) =>
          ({ en: "en-US", ar: "ar-SA", es: "es-ES", fr: "fr-FR" })[e] ||
          "en-US",
        n = ({ onResult: e, onError: t, onEnd: s, locale: n = r.q }) => {
          let [l, c] = (0, a.useState)(!1),
            [o, d] = (0, a.useState)(!1),
            m = (0, a.useRef)(null),
            h = i(n);
          (0, a.useEffect)(() => {
            let a = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (void 0 !== a) {
              d(!0);
              try {
                m.current = new a();
              } catch (e) {
                console.error("Failed to initialize SpeechRecognition:", e),
                  d(!1);
                return;
              }
              m.current &&
                ((m.current.continuous = !0),
                (m.current.interimResults = !0),
                (m.current.lang = h),
                (m.current.onresult = (t) => {
                  let s = "",
                    a = "",
                    r = t.results;
                  for (let e = t.resultIndex; e < r.length; ++e)
                    r[e].isFinal
                      ? (s += r[e][0].transcript + " ")
                      : (a += r[e][0].transcript);
                  let i = s.trim() || a.trim();
                  i && e(i);
                }),
                (m.current.onerror = (e) => {
                  let s = e.error || "unknown_error";
                  console.error("Speech recognition error:", s), t && t(s);
                  let a = () => {
                    if (m.current && l)
                      try {
                        m.current.stop();
                      } catch (e) {
                        console.error("Stop error", e), c(!1);
                      }
                  };
                  "no-speech" === s || "network" === s
                    ? a()
                    : ("not-allowed" === s || "service-not-allowed" === s) &&
                      (d(!1), a());
                }),
                (m.current.onend = () => {
                  s && s(), c(!1);
                }));
            } else
              console.warn(
                "Speech Recognition API not available in this browser.",
              ),
                d(!1);
            return () => {
              if (m.current) {
                (m.current.onresult = null),
                  (m.current.onerror = null),
                  (m.current.onend = null);
                try {
                  m.current.stop();
                } catch (e) {}
              }
            };
          }, [h]);
          let u = (0, a.useCallback)(() => {
              if (m.current && o && !l)
                try {
                  m.current.start(), c(!0);
                } catch (e) {
                  console.error("Error starting speech recognition:", e),
                    t && t(e),
                    c(!1);
                }
              else
                !o &&
                  (console.warn(
                    "Speech recognition not available or not permitted.",
                  ),
                  t && t("not-available"));
            }, [l, o, t]),
            p = (0, a.useCallback)(() => {
              if (m.current && l)
                try {
                  m.current.stop();
                } catch (e) {
                  console.error("Error stopping speech recognition:", e), c(!1);
                }
            }, [l]);
          return {
            isRecording: l,
            startRecording: u,
            stopRecording: p,
            isAvailable: o,
          };
        };
    },
    20493: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { B: () => h });
          var r = s(61268),
            i = s(90495);
          s(84205);
          var n = s(30567),
            l = s(28909),
            c = s(13242),
            o = s(39070),
            d = s(15942),
            m = e([n, l, o, d]);
          function h() {
            let { artifact: e } = (0, o.ST)(),
              t = (0, o.ZU)(),
              s = n.Rh.find((t) => t.kind === e.kind),
              a = s?.component;
            return (0, r.jsx)("div", {
              className: (0, d.cn)(
                "absolute right-0 top-0 bottom-0 z-10 w-full md:w-[30vw] bg-background border-l shadow-lg",
                "h-[calc(100vh-4rem)]",
                "mt-16",
              ),
              children: (0, r.jsxs)("div", {
                className: "flex flex-col h-full",
                children: [
                  (0, r.jsxs)("div", {
                    className:
                      "flex items-center justify-between p-4 border-b flex-shrink-0",
                    children: [
                      (0, r.jsxs)("div", {
                        className: "text-lg font-semibold",
                        children: [
                          e.title || s?.kind || "Artifact",
                          "streaming" === e.status &&
                            (0, r.jsx)("span", {
                              className: "text-sm text-muted-foreground ml-2",
                              children: "(Streaming...)",
                            }),
                        ],
                      }),
                      (0, r.jsx)(l.$, {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => {
                          t();
                        },
                        className: "h-8 w-8",
                        children: (0, r.jsx)(i.A, { className: "h-4 w-4" }),
                      }),
                    ],
                  }),
                  (0, r.jsx)("div", {
                    className: "flex-1 overflow-hidden",
                    children: (0, r.jsx)(c.F, {
                      className: "h-full",
                      children: (0, r.jsx)("div", {
                        className: "p-4",
                        children: a
                          ? (0, r.jsx)(a, { artifact: e })
                          : (0, r.jsx)("div", {
                              className:
                                "flex items-center justify-center h-full",
                              children: (0, r.jsx)("p", {
                                className: "text-muted-foreground",
                                children: e.kind
                                  ? `No renderer for ${e.kind} artifact.`
                                  : "No artifact selected.",
                              }),
                            }),
                      }),
                    }),
                  }),
                ],
              }),
            });
          }
          ([n, l, o, d] = m.then ? (await m)() : m), a();
        } catch (e) {
          a(e);
        }
      });
    },
    24317: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("MoreVertical", [
        ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
        ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
        ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }],
      ]);
    },
    28616: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { F: () => l });
          var r = s(61268),
            i = s(15942),
            n = e([i]);
          function l({ className: e }) {
            return (0, r.jsxs)("div", {
              className: (0, i.cn)("flex items-center gap-3", e),
              children: [
                (0, r.jsx)("div", {
                  className:
                    "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow",
                  children: (0, r.jsx)("span", {
                    className: "text-xs",
                    children: "AI",
                  }),
                }),
                (0, r.jsxs)("div", {
                  className:
                    "flex gap-1 items-center rounded-lg bg-muted px-4 py-2.5 text-sm",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "flex space-x-1",
                      children: [
                        (0, r.jsx)("div", {
                          className:
                            "h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.3s]",
                        }),
                        (0, r.jsx)("div", {
                          className:
                            "h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.15s]",
                        }),
                        (0, r.jsx)("div", {
                          className:
                            "h-2 w-2 rounded-full bg-foreground/50 animate-bounce",
                        }),
                      ],
                    }),
                    (0, r.jsx)("span", {
                      className: "ml-2 text-muted-foreground text-xs",
                      children: "Thinking...",
                    }),
                  ],
                }),
              ],
            });
          }
          (i = (n.then ? (await n)() : n)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    29771: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Earth", [
        ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
        [
          "path",
          {
            d: "M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17",
            key: "1fi5u6",
          },
        ],
        [
          "path",
          {
            d: "M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",
            key: "xsiumc",
          },
        ],
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
      ]);
    },
    30567: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { Rh: () => u, b3: () => m, ls: () => h });
          var r = s(99793),
            i = s(63942),
            n = s(87851);
          s(84205);
          var l = s(94262),
            c = s(68426),
            o = s(40530),
            d = e([l, c, o]);
          [l, c, o] = d.then ? (await d)() : d;
          var m = (function (e) {
            return (
              (e.Text = "text"),
              (e.Code = "code"),
              (e.Sheet = "sheet"),
              (e.Image = "image"),
              e
            );
          })({});
          let h = { kind: null, status: "idle", title: "", content: null },
            u = [
              {
                kind: "text",
                icon: r.A,
                component: o._,
                onStreamPart: ({ streamPart: e, setArtifact: t }) => {
                  "text-delta" === e.type &&
                    t((t) => ({
                      ...t,
                      content:
                        ("string" == typeof t.content ? t.content : "") +
                        e.content,
                      status: "streaming",
                    }));
                },
              },
              {
                kind: "code",
                icon: i.A,
                component: l.E,
                onStreamPart: ({ streamPart: e, setArtifact: t }) => {
                  "code-delta" === e.type &&
                    t((t) => ({
                      ...t,
                      content:
                        ("string" == typeof t.content ? t.content : "") +
                        e.content,
                      status: "streaming",
                    }));
                },
              },
              {
                kind: "sheet",
                icon: n.A,
                component: c.O,
                onStreamPart: ({ streamPart: e, setArtifact: t }) => {
                  t((t) => {
                    let s = t.content;
                    return ("sheet" !== t.kind ||
                      (null !== s &&
                        "object" == typeof s &&
                        s.rows &&
                        s.columns) ||
                      (s = { columns: [], rows: [] }),
                    "sheet-delta" === e.type &&
                      "object" == typeof e.content &&
                      Array.isArray(e.content))
                      ? {
                          ...t,
                          content: {
                            ...s,
                            rows: [...(s.rows || []), ...e.content],
                          },
                          status: "streaming",
                        }
                      : t;
                  });
                },
              },
            ];
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    31469: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Archive", [
        [
          "rect",
          { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" },
        ],
        [
          "path",
          { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" },
        ],
        ["path", { d: "M10 12h4", key: "a56b0p" }],
      ]);
    },
    36789: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Clock", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
      ]);
    },
    36939: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Paperclip", [
        [
          "path",
          {
            d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
            key: "1u3ebp",
          },
        ],
      ]);
    },
    37787: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { T: () => c });
          var r = s(61268),
            i = s(84205),
            n = s(15942),
            l = e([n]);
          n = (l.then ? (await l)() : l)[0];
          let c = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("textarea", {
              className: (0, n.cn)(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                e,
              ),
              ref: s,
              ...t,
            }),
          );
          (c.displayName = "Textarea"), a();
        } catch (e) {
          a(e);
        }
      });
    },
    39008: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { UnifiedChatContainer: () => S });
          var r = s(61268),
            i = s(15324),
            n = s(9671),
            l = s(84205),
            c = s(30567),
            o = s(5451),
            d = s(15090),
            m = s(39070),
            h = s(3519),
            u = s(32367),
            p = s(15942),
            x = s(78460),
            f = s(20493),
            g = s(84594),
            j = s(11102),
            y = s(48768),
            v = s(60066),
            b = s(83115),
            w = s(1480),
            N = s(14835),
            k = e([c, o, m, p, x, f, g, j, y, v, b, w, N, i]);
          function S({ id: e, className: t, isReadonly: s = !1 }) {
            let { user: a, session: c } = (0, h.useAuth)(),
              { toast: k } = (0, d.d)(),
              S = (0, u.Iw)(),
              [C, A] = (0, l.useState)(e || (0, n.A)()),
              [T, $] = (0, l.useState)("gpt-4o"),
              [R, D] = (0, l.useState)("private"),
              [I, E] = (0, l.useState)([]),
              [F, M] = (0, l.useState)("New Conversation"),
              U = (0, m.D4)((e) => e.artifact);
            (0, m.A0)();
            let z = (0, m.ZU)(),
              P = null !== U.kind,
              [q, L] = (0, l.useState)(!1),
              [_, Z] = (0, l.useState)(!1),
              [B, V] = (0, l.useState)(!1),
              [O, W] = (0, l.useState)(!1),
              H = (0, l.useCallback)(
                async (e) => {
                  if (!S) {
                    console.error(
                      "[UnifiedChatContainer] Supabase client not available in fetchSessionInfo.",
                    ),
                      M("New Conversation");
                    return;
                  }
                  if (!e) {
                    console.warn(
                      "[UnifiedChatContainer] fetchSessionInfo called with no chatId.",
                    ),
                      M("New Conversation");
                    return;
                  }
                  try {
                    let { data: t, error: s } = await S.auth.getSession();
                    s &&
                      console.error(
                        "[UnifiedChatContainer] Supabase auth error before fetching chat_sessions:",
                        s,
                      ),
                      t?.session ||
                        console.warn(
                          "[UnifiedChatContainer] No active Supabase session before fetching chat_sessions. This might lead to RLS issues.",
                        );
                    let { data: a, error: r } = await S.from("chat_sessions")
                      .select("*")
                      .eq("id", e)
                      .single();
                    if (r || !a) {
                      for (let t = 1; t <= 3; t++) {
                        await new Promise((e) => setTimeout(e, 500 * t));
                        let { data: s, error: a } = await S.from(
                          "chat_sessions",
                        )
                          .select("*")
                          .eq("id", e)
                          .single();
                        if (!a && s?.title) return void M(s.title);
                      }
                      console.error(
                        "[UnifiedChatContainer] Error fetching session info from 'chat_sessions' table. Chat ID:",
                        e,
                        "Supabase Error:",
                        r || "No data returned",
                      ),
                        M("New Conversation");
                      return;
                    }
                    a.title ? M(a.title) : M("New Conversation");
                  } catch (t) {
                    console.error(
                      "[UnifiedChatContainer] Catch block: Failed to fetch session info for chat ID:",
                      e,
                      "Error details:",
                      t,
                      "Error message:",
                      t?.message,
                      "Error stack:",
                      t?.stack,
                    ),
                      M("New Conversation");
                  }
                },
                [S],
              ),
              {
                messages: Q,
                input: J,
                setInput: G,
                handleInputChange: K,
                handleSubmit: X,
                stop: Y,
                isLoading: ee,
                error: et,
                data: es,
                setMessages: ea,
                append: er,
                reload: ei,
              } = (0, i.Y_)({
                api: "/api/chat",
                id: C,
                initialMessages: [],
                body: { selectedChatModel: T, visibility: R },
                headers: {
                  ...(c?.access_token && {
                    Authorization: `Bearer ${c.access_token}`,
                  }),
                },
                generateId: () => (0, n.A)(),
                onFinish: async (e) => {
                  C && (await H(C));
                },
                onError: (e) => {
                  console.error(
                    "[UnifiedChatContainer] useChat hook error:",
                    e,
                    "Stringified:",
                    JSON.stringify(e),
                  );
                  let t =
                    e?.message ||
                    "An error occurred in chat. Please try again.";
                  k({
                    title: "Chat Error",
                    description: t,
                    variant: "destructive",
                  });
                },
              });
            (0, l.useRef)(-1);
            let en = (0, l.useCallback)(
                async (e) => {
                  if ((e.preventDefault(), !J.trim() && 0 === I.length))
                    return Promise.resolve();
                  let t = I.filter((e) => void 0 !== e.url).map((e) => ({
                      id: e.id,
                      name: e.name,
                      url: e.url,
                      type: e.type,
                      size: e.size ?? 0,
                    })),
                    s = t.length > 0 ? t : void 0;
                  return (
                    X(e, { data: s ? { attachments: s } : void 0 }),
                    G(""),
                    E([]),
                    Promise.resolve()
                  );
                },
                [J, I, X, G],
              ),
              el = (0, l.useCallback)(
                async (e) => {
                  if (!e)
                    return (
                      console.warn(
                        "handleAppend called with empty message(s).",
                      ),
                      Promise.resolve()
                    );
                  if (Array.isArray(e))
                    for (let t of e) t.content && (await er(t));
                  else e.content && (await er(e));
                  return Promise.resolve();
                },
                [er],
              ),
              ec = (0, l.useCallback)(async () => {
                let e = (0, n.A)();
                return (
                  A(e),
                  ea([]),
                  E([]),
                  G(""),
                  z(),
                  M("New Conversation"),
                  k({
                    title: "New chat started",
                    description: `Session ID: ${e.substring(0, 6)}...`,
                  }),
                  Promise.resolve()
                );
              }, [G, k, ea, z]),
              eo = (0, l.useCallback)(
                (e) => {
                  e !== C && (A(e), E([]), G(""));
                },
                [C, G],
              ),
              ed = (0, l.useCallback)(() => {}, []),
              em = (0, l.useCallback)(() => L((e) => !e), []),
              eh = (0, l.useCallback)(() => Z((e) => !e), []),
              eu = (0, l.useCallback)(() => V((e) => !e), []),
              ep = (0, l.useCallback)(() => W((e) => !e), []),
              ex = (0, l.useCallback)((e) => $(e), []),
              ef = (0, l.useCallback)((e) => D(e), []),
              eg = (0, l.useCallback)((e) => {
                M(e);
              }, []);
            return a || s
              ? (0, r.jsxs)("div", {
                  className: (0, p.cn)("flex flex-col h-full", t),
                  children: [
                    (0, r.jsx)(g.q, {
                      chatId: C,
                      initialTitle: F,
                      selectedModel: T,
                      selectedVisibility: R,
                      onModelChange: ex,
                      onVisibilityChange: ef,
                      onTitleChange: eg,
                      isReadonly: s,
                      onNewSession: ec,
                      onSessionChange: eo,
                      toggleArtifact: ed,
                      toggleResearch: em,
                      toggleDocumentProcessor: eh,
                      toggleWebScraper: eu,
                      toggleAnalytics: ep,
                      isArtifactVisible: P,
                      isResearchVisible: q,
                      isDocumentProcessorVisible: _,
                      isWebScraperVisible: B,
                      isAnalyticsVisible: O,
                    }),
                    (0, r.jsxs)("div", {
                      className: "flex-1 overflow-hidden flex relative",
                      children: [
                        (0, r.jsx)("div", {
                          className: (0, p.cn)(
                            "flex-1 overflow-y-auto p-4",
                            B || q || _ || O ? "max-w-[calc(100%-350px)]" : "",
                          ),
                          children: (0, r.jsx)(v.u, {
                            messages: Q,
                            isLoading: ee,
                            chatId: C,
                          }),
                        }),
                        P && (0, r.jsx)(f.B, {}),
                        q &&
                          (0, r.jsx)(b.t, {
                            chatId: C,
                            append: el,
                            messages: Q,
                            isLoading: ee,
                            isVisible: q,
                            className: "w-[350px] flex-shrink-0",
                          }),
                        _ &&
                          (0, r.jsx)(j.Q, {
                            chatId: C,
                            append: el,
                            attachments: I,
                            isLoading: ee,
                            isVisible: _,
                            className: "w-[350px] flex-shrink-0",
                          }),
                        B &&
                          (0, r.jsx)(N.h, {
                            chatId: C,
                            append: el,
                            isLoading: ee,
                            isVisible: B,
                            className: "w-[350px] flex-shrink-0",
                          }),
                        O &&
                          (0, r.jsx)(x.x, {
                            chatId: C,
                            className: "w-[350px] flex-shrink-0",
                          }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "border-t p-4",
                      children: [
                        (0, r.jsx)(w.y, { append: el, messages: Q }),
                        (0, r.jsx)(y.U, {
                          input: J,
                          setInput: G,
                          handleSubmit: en,
                          isLoading: ee,
                          stop: Y,
                          attachments: I,
                          setAttachments: E,
                          chatId: C,
                          chatError: et && !ee ? (et.message ?? null) : null,
                        }),
                      ],
                    }),
                  ],
                })
              : (0, r.jsx)(o.Zp, {
                  className: "flex h-full items-center justify-center p-6",
                  children: (0, r.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "Please sign in to start chatting",
                  }),
                });
          }
          ([c, o, m, p, x, f, g, j, y, v, b, w, N, i] = k.then
            ? (await k)()
            : k),
            a();
        } catch (e) {
          a(e);
        }
      });
    },
    39070: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { A0: () => m, D4: () => d, ST: () => o, ZU: () => h });
          var r = s(84205),
            i = s(17407),
            n = s(88590),
            l = s(30567),
            c = e([l]);
          l = (c.then ? (await c)() : c)[0];
          let d = (0, n.vt)((e) => ({
              artifact: l.ls,
              metadata: {},
              setArtifact: (t) => e((e) => ({ artifact: t(e.artifact) })),
              setMetadata: (t) => e((e) => ({ metadata: t(e.metadata) })),
              resetArtifact: () => e({ artifact: l.ls, metadata: {} }),
            })),
            m = () => d((e) => e.setArtifact),
            h = () => d((e) => e.resetArtifact);
          function o() {
            let { data: e, mutate: t } = (0, i.Ay)("artifact", null, {
                fallbackData: l.ls,
              }),
              s = (0, r.useMemo)(() => e || l.ls, [e]),
              a = (0, r.useCallback)(
                (e) => {
                  t((t) => {
                    let s = t || l.ls;
                    return "function" == typeof e ? e(s) : e;
                  });
                },
                [t],
              ),
              { data: n, mutate: c } = (0, i.Ay)(
                () =>
                  s.documentId ? `artifact-metadata-${s.documentId}` : null,
                null,
                { fallbackData: null },
              );
            return (0, r.useMemo)(
              () => ({
                artifact: s,
                setArtifact: a,
                metadata: n,
                setMetadata: c,
              }),
              [s, a, n, c],
            );
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    40530: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { _: () => c });
          var r = s(61268);
          s(84205);
          var i = s(5451),
            n = s(62268),
            l = e([i, n]);
          [i, n] = l.then ? (await l)() : l;
          let c = ({ artifact: e }) =>
            (0, r.jsxs)(i.Zp, {
              className: "h-full flex flex-col",
              children: [
                (0, r.jsx)(i.aR, {
                  children: (0, r.jsx)(i.ZB, {
                    children: e.title || "Text Artifact",
                  }),
                }),
                (0, r.jsx)(i.Wu, {
                  className: "flex-1 overflow-auto",
                  children:
                    "string" == typeof e.content
                      ? (0, r.jsx)(n.C, { content: e.content })
                      : (0, r.jsx)("pre", {
                          className: "text-xs text-muted-foreground",
                          children: "Invalid content format",
                        }),
                }),
              ],
            });
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    42944: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("PlusCircle", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "M8 12h8", key: "1wcyev" }],
        ["path", { d: "M12 8v8", key: "napkw2" }],
      ]);
    },
    44761: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Pencil", [
        [
          "path",
          {
            d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
            key: "5qss01",
          },
        ],
        ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
      ]);
    },
    48768: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { U: () => b });
          var r = s(61268),
            i = s(90495),
            n = s(36939),
            l = s(73088),
            c = s(82028),
            o = s(67720),
            d = s(73878),
            m = s(3519),
            h = s(84205),
            u = s(35926),
            p = s(28909),
            x = s(37787),
            f = s(15090),
            g = s(19538),
            j = s(70724),
            y = s(15942),
            v = e([p, x, y]);
          function b({
            input: e,
            setInput: t,
            handleSubmit: s,
            isLoading: a,
            stop: v,
            attachments: b,
            setAttachments: w,
            chatId: N,
            chatError: k,
          }) {
            let { toast: S } = (0, f.d)(),
              { locale: C, t: A } = (0, j.useI18n)(),
              T = (0, h.useRef)(null),
              $ = (0, h.useRef)(null),
              R = (0, h.useRef)(null),
              [D, I] = (0, h.useState)(!1),
              [E, F] = (0, h.useState)(null),
              { session: M, user: U, isLoading: z } = (0, m.useSession)(),
              {
                isRecording: P,
                startRecording: q,
                stopRecording: L,
                isAvailable: _,
              } = (0, g.V)({
                locale: C,
                onResult: (e) => {
                  t(e), F(null);
                },
                onError: (e) => {
                  console.error("Speech recognition error in component:", e);
                  let t = A("chat.speechRecognition.errors.general");
                  "not-allowed" === e || "service-not-allowed" === e
                    ? (t = A("chat.speechRecognition.errors.notAllowed"))
                    : "no-speech" === e
                      ? (t = A("chat.speechRecognition.errors.noSpeech"))
                      : "network" === e
                        ? (t = A("chat.speechRecognition.errors.network"))
                        : "not-available" === e &&
                          (t = A("chat.speechRecognition.errors.notAvailable")),
                    F(t),
                    S({
                      title: A("error"),
                      description: t,
                      variant: "destructive",
                    });
                },
                onEnd: () => {
                  $.current?.focus();
                },
              }),
              { getRootProps: Z, getInputProps: B } = (0, u.VB)({
                noClick: !0,
                noKeyboard: !0,
                maxFiles: 10,
                maxSize: 0xa00000,
                accept: {
                  "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
                  "application/pdf": [".pdf"],
                  "text/plain": [".txt"],
                  "text/csv": [".csv"],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [".xlsx"],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [".docx"],
                },
                onDragEnter: () => I(!0),
                onDragLeave: () => I(!1),
                onDrop: async (e, t) => {
                  if (
                    (I(!1),
                    t.length > 0 &&
                      S({
                        title: "File upload failed",
                        description:
                          "Some files were rejected due to size or type restrictions",
                        variant: "destructive",
                      }),
                    0 !== e.length)
                  )
                    try {
                      let t = await Promise.all(
                        e.map(async (e) => {
                          let t = new FormData();
                          t.append("file", e), t.append("chatId", N);
                          let s = await fetch("/api/files/upload", {
                            method: "POST",
                            body: t,
                          });
                          if (!s.ok)
                            throw Error(`Failed to upload file: ${e.name}`);
                          let a = await s.json();
                          return {
                            id: a.id,
                            name: e.name,
                            type: e.type,
                            size: e.size,
                            url: a.url,
                          };
                        }),
                      );
                      w([...b, ...t]),
                        S({
                          title: "Files uploaded",
                          description: `Successfully uploaded ${e.length} file(s)`,
                        });
                    } catch (e) {
                      console.error("Error uploading files:", e),
                        S({
                          title: "Upload failed",
                          description:
                            "Failed to upload files. Please try again.",
                          variant: "destructive",
                        });
                    }
                },
              }),
              V = async (e) => {
                let t = e.target.files;
                t &&
                  0 !== t.length &&
                  (await O(Array.from(t)), R.current && (R.current.value = ""));
              },
              O = async (e) => {
                try {
                  let t = await Promise.all(
                    e.map(async (e) => {
                      let t = new FormData();
                      t.append("file", e), t.append("chatId", N);
                      let s = await fetch("/api/files/upload", {
                        method: "POST",
                        body: t,
                      });
                      if (!s.ok)
                        throw Error(`Failed to upload file: ${e.name}`);
                      let a = await s.json();
                      return {
                        id: a.id,
                        name: e.name,
                        type: e.type,
                        size: e.size,
                        url: a.url,
                      };
                    }),
                  );
                  w([...b, ...t]),
                    S({
                      title: "Files uploaded",
                      description: `Uploaded ${e.length} file(s)`,
                    });
                } catch (e) {
                  console.error("Error uploading files:", e),
                    S({ title: "Upload failed", variant: "destructive" });
                }
              },
              W = (e) => {
                w(b.filter((t) => t.id !== e));
              };
            return (0, r.jsx)("div", {
              ...Z(),
              className: (0, y.cn)(
                "relative border-t bg-background",
                D &&
                  "after:absolute after:inset-0 after:bg-primary/10 after:border-2 after:border-dashed after:border-primary after:rounded-md after:z-10",
              ),
              children: (0, r.jsxs)("form", {
                ref: T,
                onSubmit: (e) => {
                  P ? e.preventDefault() : s(e);
                },
                className: "relative flex flex-col p-2",
                children: [
                  (0, r.jsx)("input", { ...B() }),
                  (0, r.jsx)("input", {
                    type: "file",
                    ref: R,
                    className: "hidden",
                    multiple: !0,
                    accept: "image/*,.pdf,.txt,.csv,.xlsx,.docx",
                    onChange: V,
                  }),
                  (k || E) &&
                    (0, r.jsxs)("div", {
                      className:
                        "mb-2 p-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md",
                      children: [
                        k && (0, r.jsx)("div", { children: k }),
                        E && (0, r.jsx)("div", { children: E }),
                      ],
                    }),
                  b.length > 0 &&
                    (0, r.jsx)("div", {
                      className: "flex flex-wrap gap-2 mb-2",
                      children: b.map((e) =>
                        (0, r.jsxs)(
                          "div",
                          {
                            className:
                              "flex items-center gap-1.5 text-xs bg-muted rounded-md px-2 py-1",
                            children: [
                              (0, r.jsx)("span", {
                                className: "max-w-[150px] truncate",
                                children: e.name,
                              }),
                              (0, r.jsx)(p.$, {
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                className: "h-4 w-4",
                                onClick: () => W(e.id),
                                children: (0, r.jsx)(i.A, {
                                  className: "h-3 w-3",
                                }),
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    }),
                  (0, r.jsxs)("div", {
                    className: "relative flex items-end gap-2",
                    children: [
                      (0, r.jsx)(p.$, {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        disabled: a || P,
                        className: "text-muted-foreground flex-shrink-0",
                        onClick: () => {
                          R.current?.click();
                        },
                        "aria-label": A("chat.input.attachFile"),
                        children: (0, r.jsx)(n.A, { className: "h-5 w-5" }),
                      }),
                      (0, r.jsx)(x.T, {
                        ref: $,
                        tabIndex: 0,
                        placeholder: P
                          ? A("chat.input.recordingPlaceholder")
                          : A("chat.input.placeholder"),
                        value: e,
                        onChange: (e) => {
                          t(e.target.value);
                        },
                        onKeyDown: (e) => {
                          "Enter" === e.key &&
                            !e.shiftKey &&
                            (e.preventDefault(),
                            P || T.current?.requestSubmit());
                        },
                        className:
                          "flex-grow resize-none self-end max-h-36 min-h-[2.5rem] pr-20 py-2 leading-tight",
                        rows: 1,
                        disabled: a || P,
                      }),
                      (0, r.jsxs)("div", {
                        className:
                          "absolute right-2 bottom-1 flex items-center gap-1",
                        children: [
                          _
                            ? (0, r.jsx)(p.$, {
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                disabled: a,
                                className: (0, y.cn)(
                                  "text-muted-foreground",
                                  P && "text-red-500 animate-pulse",
                                ),
                                onClick: P ? L : q,
                                "aria-label": P
                                  ? A("chat.input.stopRecording")
                                  : A("chat.input.startRecording"),
                                children: P
                                  ? (0, r.jsx)(l.A, { className: "h-5 w-5" })
                                  : (0, r.jsx)(c.A, { className: "h-5 w-5" }),
                              })
                            : (0, r.jsx)(p.$, {
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                disabled: !0,
                                title: A("chat.input.speechUnavailable"),
                                children: (0, r.jsx)(l.A, {
                                  className: "h-5 w-5 text-muted-foreground/50",
                                }),
                              }),
                          a
                            ? (0, r.jsx)(p.$, {
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                onClick: v,
                                "aria-label": A("chat.input.stop"),
                                children: (0, r.jsx)(o.A, {
                                  className: "h-5 w-5",
                                }),
                              })
                            : (0, r.jsx)(p.$, {
                                type: "submit",
                                variant: "ghost",
                                size: "icon",
                                disabled: (!e.trim() && 0 === b.length) || P,
                                "aria-label": A("chat.input.send"),
                                children: (0, r.jsx)(d.A, {
                                  className: "h-5 w-5",
                                }),
                              }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            });
          }
          ([p, x, y] = v.then ? (await v)() : v), a();
        } catch (e) {
          a(e);
        }
      });
    },
    53855: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("ThumbsDown", [
        ["path", { d: "M17 14V2", key: "8ymqnk" }],
        [
          "path",
          {
            d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z",
            key: "s6e0r",
          },
        ],
      ]);
    },
    60066: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { u: () => d });
          var r = s(61268),
            i = s(84205),
            n = s(15942),
            l = s(80506),
            c = s(28616),
            o = e([n, l, c]);
          function d({
            messages: e,
            isLoading: t = !1,
            className: s,
            isArtifactVisible: a = !1,
            chatId: o,
          }) {
            let d = (0, i.useRef)(null);
            return (0, r.jsxs)("div", {
              className: (0, n.cn)(
                "flex flex-col gap-4 overflow-y-auto p-4",
                a ? "md:pr-[calc(30vw+1rem)]" : "",
                s,
              ),
              children: [
                0 === e.length
                  ? (0, r.jsxs)("div", {
                      className:
                        "flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center",
                      children: [
                        (0, r.jsx)("h3", {
                          className: "text-lg font-semibold",
                          children: "Welcome to AI Chat",
                        }),
                        (0, r.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Ask anything, from complex topics to creative ideas",
                        }),
                      ],
                    })
                  : e.map((t, s) =>
                      (0, r.jsx)(
                        "div",
                        {
                          className: "message-wrapper",
                          children: (0, r.jsx)(l.s, {
                            message: t,
                            isLastMessage: s === e.length - 1,
                            chatId: o,
                          }),
                        },
                        t.id || s,
                      ),
                    ),
                t && (0, r.jsx)(c.F, {}),
                (0, r.jsx)("div", { ref: d }),
              ],
            });
          }
          ([n, l, c] = o.then ? (await o)() : o), a();
        } catch (e) {
          a(e);
        }
      });
    },
    62268: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { C: () => m });
          var r = s(61268),
            i = s(84205),
            n = s(84894),
            l = s(50616),
            c = s(15942),
            o = s(71269),
            d = e([c, o]);
          [c, o] = d.then ? (await d)() : d;
          let m = (0, i.memo)(function ({ content: e, className: t }) {
            return e
              ? (0, r.jsx)(n.oz, {
                  className: (0, c.cn)("prose dark:prose-invert", t),
                  remarkPlugins: [l.A],
                  components: {
                    pre: ({ children: e }) =>
                      (0, r.jsx)(r.Fragment, { children: e }),
                    code({ node: e, className: t, children: s, ...a }) {
                      let i = /language-(\w+)/.exec(t || ""),
                        n = String(s).replace(/\n$/, "");
                      return i
                        ? (0, r.jsx)(o.$, {
                            language: i[1],
                            code: n,
                            className: t,
                            ...a,
                          })
                        : (0, r.jsx)("code", {
                            className: (0, c.cn)(
                              "rounded-md bg-muted px-1 py-0.5 font-mono text-sm",
                              t,
                            ),
                            ...a,
                            children: n,
                          });
                    },
                  },
                  children: e,
                })
              : (console.warn("Empty content in UnifiedMarkdown"), null);
          });
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    66321: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, {
            A0: () => o,
            BF: () => d,
            Hj: () => m,
            XI: () => c,
            nA: () => u,
            nd: () => h,
            r6: () => p,
          });
          var r = s(61268),
            i = s(84205),
            n = s(15942),
            l = e([n]);
          n = (l.then ? (await l)() : l)[0];
          let c = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("div", {
              className: "relative w-full overflow-auto",
              children: (0, r.jsx)("table", {
                ref: s,
                className: (0, n.cn)("w-full caption-bottom text-sm", e),
                ...t,
              }),
            }),
          );
          c.displayName = "Table";
          let o = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("thead", {
              ref: s,
              className: (0, n.cn)("[&_tr]:border-b", e),
              ...t,
            }),
          );
          o.displayName = "TableHeader";
          let d = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("tbody", {
              ref: s,
              className: (0, n.cn)("[&_tr:last-child]:border-0", e),
              ...t,
            }),
          );
          (d.displayName = "TableBody"),
            (i.forwardRef(({ className: e, ...t }, s) =>
              (0, r.jsx)("tfoot", {
                ref: s,
                className: (0, n.cn)(
                  "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
                  e,
                ),
                ...t,
              }),
            ).displayName = "TableFooter");
          let m = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("tr", {
              ref: s,
              className: (0, n.cn)(
                "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                e,
              ),
              ...t,
            }),
          );
          m.displayName = "TableRow";
          let h = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("th", {
              ref: s,
              className: (0, n.cn)(
                "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
                e,
              ),
              ...t,
            }),
          );
          h.displayName = "TableHead";
          let u = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("td", {
              ref: s,
              className: (0, n.cn)(
                "p-4 align-middle [&:has([role=checkbox])]:pr-0",
                e,
              ),
              ...t,
            }),
          );
          u.displayName = "TableCell";
          let p = i.forwardRef(({ className: e, ...t }, s) =>
            (0, r.jsx)("caption", {
              ref: s,
              className: (0, n.cn)("mt-4 text-sm text-muted-foreground", e),
              ...t,
            }),
          );
          (p.displayName = "TableCaption"), a();
        } catch (e) {
          a(e);
        }
      });
    },
    67720: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("StopCircle", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["rect", { width: "6", height: "6", x: "9", y: "9", key: "1wrtvo" }],
      ]);
    },
    68325: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Settings2", [
        ["path", { d: "M20 7h-9", key: "3s1dr2" }],
        ["path", { d: "M14 17H5", key: "gfn3mx" }],
        ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
        ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }],
      ]);
    },
    68426: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { O: () => c });
          var r = s(61268);
          s(84205);
          var i = s(5451),
            n = s(66321),
            l = e([i, n]);
          [i, n] = l.then ? (await l)() : l;
          let c = ({ artifact: e }) => {
            let t = e.content || { columns: [], rows: [] },
              s = t.columns || [],
              a = t.rows || [];
            return (0, r.jsxs)(i.Zp, {
              className: "h-full flex flex-col",
              children: [
                (0, r.jsx)(i.aR, {
                  children: (0, r.jsx)(i.ZB, {
                    children: e.title || "Data Sheet",
                  }),
                }),
                (0, r.jsx)(i.Wu, {
                  className: "flex-1 overflow-auto",
                  children:
                    s.length > 0
                      ? (0, r.jsxs)(n.XI, {
                          children: [
                            (0, r.jsx)(n.A0, {
                              children: (0, r.jsx)(n.Hj, {
                                children: s.map((e, t) =>
                                  (0, r.jsx)(
                                    n.nd,
                                    { children: e },
                                    `header-${t}`,
                                  ),
                                ),
                              }),
                            }),
                            (0, r.jsx)(n.BF, {
                              children: a.map((e, t) =>
                                (0, r.jsx)(
                                  n.Hj,
                                  {
                                    children: s.map((s, a) =>
                                      (0, r.jsx)(
                                        n.nA,
                                        { children: String(e[s] ?? "") },
                                        `cell-${t}-${a}`,
                                      ),
                                    ),
                                  },
                                  `row-${t}`,
                                ),
                              ),
                            }),
                            0 === a.length &&
                              "streaming" !== e.status &&
                              (0, r.jsx)(n.r6, {
                                children: "No data rows available.",
                              }),
                            "streaming" === e.status &&
                              (0, r.jsx)(n.r6, {
                                children: "Streaming data...",
                              }),
                          ],
                        })
                      : (0, r.jsx)("p", {
                          className: "text-sm text-muted-foreground p-4",
                          children:
                            "streaming" === e.status
                              ? "Waiting for sheet data..."
                              : "No sheet data available.",
                        }),
                }),
              ],
            });
          };
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    69394: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("ThumbsUp", [
        ["path", { d: "M7 10v12", key: "1qc93n" }],
        [
          "path",
          {
            d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z",
            key: "y3tblf",
          },
        ],
      ]);
    },
    71269: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { $: () => h });
          var r = s(61268),
            i = s(415),
            n = s(98638),
            l = s(84205),
            c = s(65638),
            o = s(28909),
            d = s(15942),
            m = e([o, d]);
          function h({ language: e, code: t, className: s }) {
            let [a, m] = (0, l.useState)(!1),
              h = async () => {
                await navigator.clipboard.writeText(t),
                  m(!0),
                  setTimeout(() => m(!1), 2e3);
              };
            return (0, r.jsxs)("div", {
              className: (0, d.cn)("relative my-4 rounded-md bg-muted", s),
              children: [
                (0, r.jsxs)("div", {
                  className:
                    "flex items-center justify-between rounded-t-md bg-muted px-4 py-2 font-mono text-xs",
                  children: [
                    (0, r.jsx)("div", {
                      className: "text-muted-foreground",
                      children: e,
                    }),
                    (0, r.jsxs)(o.$, {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7",
                      onClick: h,
                      children: [
                        a
                          ? (0, r.jsx)(i.A, {
                              className: "h-3.5 w-3.5 text-primary",
                            })
                          : (0, r.jsx)(n.A, { className: "h-3.5 w-3.5" }),
                        (0, r.jsx)("span", {
                          className: "sr-only",
                          children: "Copy code",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsx)(c.Prism, {
                  language: e,
                  customStyle: {
                    margin: 0,
                    borderRadius: "0 0 0.375rem 0.375rem",
                  },
                  children: t,
                }),
              ],
            });
          }
          ([o, d] = m.then ? (await m)() : m), a();
        } catch (e) {
          a(e);
        }
      });
    },
    73088: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("MicOff", [
        ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
        ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
        ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
        ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
        ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
        ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
      ]);
    },
    73878: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("SendHorizontal", [
        ["path", { d: "m3 3 3 9-3 9 19-9Z", key: "1aobqy" }],
        ["path", { d: "M6 12h16", key: "s4cdu5" }],
      ]);
    },
    77001: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, {
            Tabs: () => c,
            TabsContent: () => m,
            TabsList: () => o,
            TabsTrigger: () => d,
          });
          var r = s(61268),
            i = s(28366);
          s(84205);
          var n = s(15942),
            l = e([n]);
          function c({ className: e, ...t }) {
            return (0, r.jsx)(i.bL, {
              "data-slot": "tabs",
              className: (0, n.cn)("flex flex-col gap-2", e),
              ...t,
            });
          }
          function o({ className: e, ...t }) {
            return (0, r.jsx)(i.B8, {
              "data-slot": "tabs-list",
              className: (0, n.cn)(
                "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                e,
              ),
              ...t,
            });
          }
          function d({ className: e, ...t }) {
            return (0, r.jsx)(i.l9, {
              "data-slot": "tabs-trigger",
              className: (0, n.cn)(
                "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                e,
              ),
              ...t,
            });
          }
          function m({ className: e, ...t }) {
            return (0, r.jsx)(i.UC, {
              "data-slot": "tabs-content",
              className: (0, n.cn)("flex-1 outline-none", e),
              ...t,
            });
          }
          (n = (l.then ? (await l)() : l)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    78460: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { x: () => f });
          var r = s(61268),
            i = s(92206),
            n = s(52327),
            l = s(36789),
            c = s(91255),
            o = s(90495),
            d = s(84205),
            m = s(28909),
            h = s(5451),
            u = s(13242),
            p = s(15942),
            x = e([m, h, p]);
          function f({ chatId: e, className: t }) {
            let [s, a] = d.useState([
              {
                label: "Total Messages",
                value: 0,
                icon: (0, r.jsx)(i.A, { className: "h-4 w-4" }),
                description: "Messages in this session",
              },
              {
                label: "Active Users",
                value: 0,
                icon: (0, r.jsx)(n.A, { className: "h-4 w-4" }),
                description: "Currently active users",
              },
              {
                label: "Session Duration",
                value: "0m",
                icon: (0, r.jsx)(l.A, { className: "h-4 w-4" }),
                description: "Time since session start",
              },
              {
                label: "Response Rate",
                value: "0%",
                icon: (0, r.jsx)(c.A, { className: "h-4 w-4" }),
                description: "Average response time",
              },
            ]);
            return (
              d.useEffect(() => {
                if (!e) return;
                let t = async () => {};
                t();
                let s = setInterval(t, 3e4);
                return () => clearInterval(s);
              }, [e]),
              (0, r.jsxs)("div", {
                className: (0, p.cn)(
                  "h-full border-l bg-background overflow-auto",
                  t,
                ),
                children: [
                  (0, r.jsxs)("div", {
                    className: "flex items-center justify-between p-4 border-b",
                    children: [
                      (0, r.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                          (0, r.jsx)(c.A, { className: "h-5 w-5 mr-2" }),
                          (0, r.jsx)("h3", {
                            className: "font-semibold",
                            children: "Analytics",
                          }),
                        ],
                      }),
                      (0, r.jsxs)(m.$, {
                        size: "sm",
                        variant: "ghost",
                        className: "h-8 w-8 p-0",
                        onClick: () =>
                          document.dispatchEvent(
                            new CustomEvent("toggle-analytics"),
                          ),
                        children: [
                          (0, r.jsx)(o.A, { className: "h-4 w-4" }),
                          (0, r.jsx)("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsx)("div", {
                    className: "p-4",
                    children: (0, r.jsx)(u.F, {
                      className: "h-[calc(100vh-120px)]",
                      children: (0, r.jsx)("div", {
                        className: "grid gap-4",
                        children: s.map((e, t) =>
                          (0, r.jsx)(
                            h.Zp,
                            {
                              className: "p-4",
                              children: (0, r.jsxs)("div", {
                                className: "flex items-center gap-4",
                                children: [
                                  (0, r.jsx)("div", {
                                    className: "rounded-lg bg-muted p-2",
                                    children: e.icon,
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "flex-1 space-y-1",
                                    children: [
                                      (0, r.jsx)("p", {
                                        className:
                                          "text-sm font-medium leading-none",
                                        children: e.label,
                                      }),
                                      (0, r.jsx)("p", {
                                        className: "text-2xl font-bold",
                                        children: e.value,
                                      }),
                                      e.description &&
                                        (0, r.jsx)("p", {
                                          className:
                                            "text-xs text-muted-foreground",
                                          children: e.description,
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            t,
                          ),
                        ),
                      }),
                    }),
                  }),
                ],
              })
            );
          }
          ([m, h, p] = x.then ? (await x)() : x), a();
        } catch (e) {
          a(e);
        }
      });
    },
    80069: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("ExternalLink", [
        ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
        ["path", { d: "M10 14 21 3", key: "gplh6r" }],
        [
          "path",
          {
            d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
            key: "a6xqqp",
          },
        ],
      ]);
    },
    80506: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { s: () => j });
          var r = s(61268),
            i = s(69394),
            n = s(53855),
            l = s(24317),
            c = s(415),
            o = s(98638),
            d = s(84205),
            m = s(23734),
            h = s(28909),
            u = s(93336),
            p = s(15090),
            x = s(15942),
            f = s(62268),
            g = e([m, h, u, x, f]);
          function j({ message: e, isLastMessage: t, chatId: s }) {
            let { toast: a } = (0, p.d)(),
              [g, j] = (0, d.useState)(null),
              [y, v] = (0, d.useState)(!1),
              b = "user" === e.role,
              w = async () => {
                try {
                  await navigator.clipboard.writeText(e.content),
                    v(!0),
                    setTimeout(() => v(!1), 2e3),
                    a({
                      title: "Copied to clipboard",
                      description: "Message content copied to clipboard",
                    });
                } catch (e) {
                  a({
                    title: "Failed to copy",
                    description: "Could not copy message to clipboard",
                    variant: "destructive",
                  });
                }
              },
              N = async (t) => {
                try {
                  if ("assistant" !== e.role) return;
                  let a = "like" === t ? "liked" : "disliked";
                  if (
                    (g === a ? j(null) : j(a),
                    !(
                      await fetch("/api/chat/feedback", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          messageId: e.id,
                          chatId: s,
                          type: t,
                        }),
                      })
                    ).ok)
                  )
                    throw Error("Failed to submit feedback");
                } catch (e) {
                  a({
                    title: "Error",
                    description: "Failed to submit feedback",
                    variant: "destructive",
                  });
                }
              };
            return (0, r.jsxs)("div", {
              className: (0, x.cn)(
                "flex w-full gap-3 group relative",
                b ? "flex-row-reverse" : "flex-row",
              ),
              id: e.id,
              children: [
                (0, r.jsx)("div", {
                  className:
                    "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow",
                  children: b
                    ? (0, r.jsx)(m.eu, {
                        children: (0, r.jsx)(m.q5, { children: "U" }),
                      })
                    : (0, r.jsxs)(m.eu, {
                        children: [
                          (0, r.jsx)(m.BK, {
                            src: "/bot-avatar.png",
                            alt: "AI",
                          }),
                          (0, r.jsx)(m.q5, { children: "AI" }),
                        ],
                      }),
                }),
                (0, r.jsxs)("div", {
                  className: (0, x.cn)(
                    "flex flex-col gap-1 min-w-0 max-w-[calc(100%-4rem)]",
                    b ? "items-end" : "items-start",
                  ),
                  children: [
                    (0, r.jsx)("div", {
                      className: (0, x.cn)(
                        "flex flex-col gap-2 rounded-lg px-4 py-2.5 text-sm",
                        b ? "bg-primary text-primary-foreground" : "bg-muted",
                      ),
                      children: (0, r.jsx)(f.C, {
                        content: e.content,
                        className: b ? "prose-invert" : "",
                      }),
                    }),
                    !b &&
                      (0, r.jsxs)("div", {
                        className:
                          "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                        children: [
                          (0, r.jsx)(h.$, {
                            variant: "ghost",
                            size: "icon",
                            className: (0, x.cn)(
                              "h-7 w-7",
                              "liked" === g
                                ? "text-green-500"
                                : "text-muted-foreground",
                            ),
                            onClick: () => N("like"),
                            children: (0, r.jsx)(i.A, { className: "h-4 w-4" }),
                          }),
                          (0, r.jsx)(h.$, {
                            variant: "ghost",
                            size: "icon",
                            className: (0, x.cn)(
                              "h-7 w-7",
                              "disliked" === g
                                ? "text-red-500"
                                : "text-muted-foreground",
                            ),
                            onClick: () => N("dislike"),
                            children: (0, r.jsx)(n.A, { className: "h-4 w-4" }),
                          }),
                          (0, r.jsxs)(u.rI, {
                            children: [
                              (0, r.jsx)(u.ty, {
                                asChild: !0,
                                children: (0, r.jsx)(h.$, {
                                  variant: "ghost",
                                  size: "icon",
                                  className: "h-7 w-7 text-muted-foreground",
                                  children: (0, r.jsx)(l.A, {
                                    className: "h-4 w-4",
                                  }),
                                }),
                              }),
                              (0, r.jsx)(u.SQ, {
                                align: "end",
                                children: (0, r.jsxs)(u._2, {
                                  onClick: w,
                                  children: [
                                    y
                                      ? (0, r.jsx)(c.A, {
                                          className:
                                            "mr-2 h-4 w-4 text-green-500",
                                        })
                                      : (0, r.jsx)(o.A, {
                                          className: "mr-2 h-4 w-4",
                                        }),
                                    "Copy Message",
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              ],
            });
          }
          ([m, h, u, x, f] = g.then ? (await g)() : g), a();
        } catch (e) {
          a(e);
        }
      });
    },
    82028: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Mic", [
        [
          "path",
          {
            d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",
            key: "131961",
          },
        ],
        ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
        ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
      ]);
    },
    82985: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Trash", [
        ["path", { d: "M3 6h18", key: "d0wm0j" }],
        ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
        ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
      ]);
    },
    83115: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { t: () => v });
          var r = s(61268),
            i = s(92663),
            n = s(90495),
            l = s(89123),
            c = s(99793),
            o = s(80069),
            d = s(44803),
            m = s(84205),
            h = s(44619),
            u = s(46532),
            p = s(28909),
            x = s(5451),
            f = s(92256),
            g = s(13242),
            j = s(77001),
            y = e([h, u, p, x, f, j]);
          function v({
            chatId: e,
            messages: t,
            append: s,
            isLoading: a,
            isVisible: y,
            className: v,
          }) {
            let [b, w] = (0, m.useState)([]),
              [N, k] = (0, m.useState)([]),
              [S, C] = (0, m.useState)([]),
              [A, T] = (0, m.useState)({ current: 0, max: 3 }),
              [$, R] = (0, m.useState)({ completedSteps: 0, totalSteps: 0 }),
              [D, I] = (0, m.useState)("sources"),
              [E, F] = (0, m.useState)(!1),
              M =
                $.totalSteps > 0
                  ? Math.round(($.completedSteps / $.totalSteps) * 100)
                  : 0,
              U = async () => {
                if (E || a) return;
                F(!0);
                let e = [
                  {
                    type: "search",
                    message: "Starting research based on chat conversation",
                    status: "pending",
                    depth: 1,
                    timestamp: Date.now(),
                  },
                ];
                k(e),
                  R({ completedSteps: 0, totalSteps: 5 }),
                  T({ current: 1, max: 3 });
                let r = [...t].reverse().find((e) => "user" === e.role),
                  i = r?.content || "Research this topic",
                  n = {
                    id: Date.now().toString(),
                    role: "system",
                    content: `Perform deep research on: ${i}. 
      Format your response as a JSON object with the following keys:
      - sources: array of source objects {url, title, description, type, relevance}
      - activities: array of research activity objects {type, message, status, depth}
      - findings: array of finding objects {content, confidence, sources}`,
                  };
                await s(n), z();
              },
              z = () => {
                setTimeout(() => {
                  k((e) => [
                    { ...e[0], status: "complete" },
                    {
                      type: "search",
                      message: "Searching for relevant immigration resources",
                      status: "pending",
                      depth: 1,
                      timestamp: Date.now(),
                    },
                  ]),
                    R((e) => ({ ...e, completedSteps: 1 })),
                    w([
                      {
                        url: "https://travel.state.gov/content/travel/en/us-visas.html",
                        title: "U.S. Visas - United States Department of State",
                        description:
                          "Official U.S. visa information from the Department of State",
                        type: "web",
                        relevance: 0.95,
                      },
                    ]);
                }, 2e3),
                  setTimeout(() => {
                    k((e) => [
                      ...e.slice(0, 1),
                      { ...e[1], status: "complete" },
                      {
                        type: "extract",
                        message:
                          "Extracting key information from visa resources",
                        status: "pending",
                        depth: 1,
                        timestamp: Date.now(),
                      },
                    ]),
                      R((e) => ({ ...e, completedSteps: 2 })),
                      w((e) => [
                        ...e,
                        {
                          url: "https://www.uscis.gov/green-card",
                          title: "Green Card Eligibility Categories",
                          description:
                            "Information about permanent residence eligibility",
                          type: "web",
                          relevance: 0.9,
                        },
                      ]);
                  }, 4e3),
                  setTimeout(() => {
                    k((e) => [
                      ...e.slice(0, 2),
                      { ...e[2], status: "complete" },
                      {
                        type: "synthesis",
                        message: "Synthesizing immigration pathway information",
                        status: "pending",
                        depth: 2,
                        timestamp: Date.now(),
                      },
                    ]),
                      R((e) => ({ ...e, completedSteps: 3 })),
                      T((e) => ({ ...e, current: 2 })),
                      C([
                        {
                          content:
                            "There are multiple pathways to immigrate to the United States, including family-sponsored, employment-based, and humanitarian programs.",
                          confidence: 0.9,
                          sources: [
                            "U.S. Visas - United States Department of State",
                          ],
                          timestamp: Date.now(),
                        },
                      ]);
                  }, 6e3),
                  setTimeout(() => {
                    k((e) => [
                      ...e.slice(0, 3),
                      { ...e[3], status: "complete" },
                    ]),
                      R((e) => ({ ...e, completedSteps: 4 })),
                      C((e) => [
                        ...e,
                        {
                          content:
                            "Employment-based immigration typically requires employer sponsorship and may involve labor certification.",
                          confidence: 0.85,
                          sources: ["Green Card Eligibility Categories"],
                          timestamp: Date.now(),
                        },
                      ]),
                      F(!1);
                  }, 8e3);
              };
            return y
              ? 0 === b.length && 0 === N.length
                ? (0, r.jsxs)("div", {
                    className: `h-full border-l bg-background overflow-auto ${v}`,
                    children: [
                      (0, r.jsxs)("div", {
                        className:
                          "flex items-center justify-between p-4 border-b",
                        children: [
                          (0, r.jsxs)("div", {
                            className: "flex items-center",
                            children: [
                              (0, r.jsx)(i.A, { className: "h-5 w-5 mr-2" }),
                              (0, r.jsx)("h3", {
                                className: "font-semibold",
                                children: "Research Assistant",
                              }),
                            ],
                          }),
                          (0, r.jsxs)(p.$, {
                            size: "sm",
                            variant: "ghost",
                            className: "h-8 w-8 p-0",
                            onClick: () =>
                              document.dispatchEvent(
                                new CustomEvent("toggle-research"),
                              ),
                            children: [
                              (0, r.jsx)(n.A, { className: "h-4 w-4" }),
                              (0, r.jsx)("span", {
                                className: "sr-only",
                                children: "Close",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "p-4",
                        children: [
                          (0, r.jsxs)(h.Fc, {
                            children: [
                              (0, r.jsx)(l.A, { className: "h-4 w-4" }),
                              (0, r.jsx)(h.XL, {
                                children: "Research Assistant",
                              }),
                              (0, r.jsx)(h.TN, {
                                children:
                                  "Start a deep research session based on your chat conversation.",
                              }),
                            ],
                          }),
                          (0, r.jsx)(p.$, {
                            onClick: U,
                            disabled: E || a,
                            className: "w-full mt-4",
                            children: E ? "Researching..." : "Start Research",
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, r.jsxs)("div", {
                    className: `h-full border-l bg-background overflow-auto ${v}`,
                    children: [
                      (0, r.jsxs)("div", {
                        className:
                          "flex items-center justify-between p-4 border-b",
                        children: [
                          (0, r.jsxs)("div", {
                            className: "flex items-center",
                            children: [
                              (0, r.jsx)(i.A, { className: "h-5 w-5 mr-2" }),
                              (0, r.jsx)("h3", {
                                className: "font-semibold",
                                children: "Research Assistant",
                              }),
                            ],
                          }),
                          (0, r.jsxs)(p.$, {
                            size: "sm",
                            variant: "ghost",
                            className: "h-8 w-8 p-0",
                            onClick: () =>
                              document.dispatchEvent(
                                new CustomEvent("toggle-research"),
                              ),
                            children: [
                              (0, r.jsx)(n.A, { className: "h-4 w-4" }),
                              (0, r.jsx)("span", {
                                className: "sr-only",
                                children: "Close",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "p-4 space-y-4",
                        children: [
                          (0, r.jsxs)("div", {
                            className: "flex items-center gap-4",
                            children: [
                              (0, r.jsx)("div", {
                                className: "flex-1",
                                children: (0, r.jsx)(f.k, {
                                  value: M,
                                  className: "h-2",
                                }),
                              }),
                              (0, r.jsxs)("div", {
                                className:
                                  "text-sm text-muted-foreground whitespace-nowrap",
                                children: [
                                  $.completedSteps,
                                  " / ",
                                  $.totalSteps,
                                  " steps",
                                ],
                              }),
                            ],
                          }),
                          A.max > 0 &&
                            (0, r.jsxs)("div", {
                              className:
                                "flex items-center gap-2 text-sm text-muted-foreground",
                              children: [
                                (0, r.jsx)("span", {
                                  children: "Research depth:",
                                }),
                                (0, r.jsx)("div", {
                                  className: "flex-1",
                                  children: (0, r.jsx)(f.k, {
                                    value: (A.current / A.max) * 100,
                                    className: "h-1",
                                  }),
                                }),
                                (0, r.jsxs)("span", {
                                  children: [A.current, " / ", A.max],
                                }),
                              ],
                            }),
                          (0, r.jsxs)(j.Tabs, {
                            defaultValue: "sources",
                            className: "w-full",
                            children: [
                              (0, r.jsxs)(j.TabsList, {
                                className: "grid w-full grid-cols-3",
                                children: [
                                  (0, r.jsxs)(j.TabsTrigger, {
                                    value: "sources",
                                    children: ["Sources (", b.length, ")"],
                                  }),
                                  (0, r.jsxs)(j.TabsTrigger, {
                                    value: "activities",
                                    children: ["Activities (", N.length, ")"],
                                  }),
                                  (0, r.jsxs)(j.TabsTrigger, {
                                    value: "findings",
                                    children: ["Findings (", S.length, ")"],
                                  }),
                                ],
                              }),
                              (0, r.jsx)(j.TabsContent, {
                                value: "sources",
                                className: "mt-2",
                                children: (0, r.jsxs)(x.Zp, {
                                  children: [
                                    (0, r.jsxs)(x.aR, {
                                      className: "pb-2",
                                      children: [
                                        (0, r.jsx)(x.ZB, {
                                          className: "text-base",
                                          children: "Research Sources",
                                        }),
                                        (0, r.jsx)(x.BT, {
                                          children:
                                            "Web pages and documents used in this research",
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)(x.Wu, {
                                      children: (0, r.jsx)(g.F, {
                                        className: "h-[300px] pr-4",
                                        children: (0, r.jsx)("div", {
                                          className: "space-y-4",
                                          children: b.map((e, t) =>
                                            (0, r.jsx)(
                                              "div",
                                              {
                                                className:
                                                  "flex flex-col space-y-1",
                                                children: (0, r.jsxs)("div", {
                                                  className: "flex items-start",
                                                  children: [
                                                    (0, r.jsx)("div", {
                                                      className: "mr-2 mt-0.5",
                                                      children: (0, r.jsx)(
                                                        c.A,
                                                        {
                                                          className:
                                                            "h-4 w-4 text-muted-foreground",
                                                        },
                                                      ),
                                                    }),
                                                    (0, r.jsxs)("div", {
                                                      className: "flex-1",
                                                      children: [
                                                        (0, r.jsxs)("div", {
                                                          className:
                                                            "font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center",
                                                          children: [
                                                            e.title,
                                                            (0, r.jsx)(o.A, {
                                                              className:
                                                                "ml-1 h-3 w-3",
                                                            }),
                                                          ],
                                                        }),
                                                        (0, r.jsx)("p", {
                                                          className:
                                                            "text-sm text-muted-foreground",
                                                          children:
                                                            e.description,
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              },
                                              t,
                                            ),
                                          ),
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                              (0, r.jsx)(j.TabsContent, {
                                value: "activities",
                                className: "mt-2",
                                children: (0, r.jsxs)(x.Zp, {
                                  children: [
                                    (0, r.jsxs)(x.aR, {
                                      className: "pb-2",
                                      children: [
                                        (0, r.jsx)(x.ZB, {
                                          className: "text-base",
                                          children: "Research Activities",
                                        }),
                                        (0, r.jsx)(x.BT, {
                                          children:
                                            "Steps taken during the research process",
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)(x.Wu, {
                                      children: (0, r.jsx)(g.F, {
                                        className: "h-[300px] pr-4",
                                        children: (0, r.jsx)("div", {
                                          className: "space-y-4",
                                          children: N.map((e, t) =>
                                            (0, r.jsxs)(
                                              "div",
                                              {
                                                className:
                                                  "flex items-start pb-2 border-b border-muted last:border-0",
                                                children: [
                                                  (0, r.jsxs)("div", {
                                                    className: "mr-2 mt-1",
                                                    children: [
                                                      "search" === e.type &&
                                                        (0, r.jsx)(d.A, {
                                                          className:
                                                            "h-4 w-4 text-blue-500",
                                                        }),
                                                      "extract" === e.type &&
                                                        (0, r.jsx)(c.A, {
                                                          className:
                                                            "h-4 w-4 text-green-500",
                                                        }),
                                                      "analyze" === e.type &&
                                                        (0, r.jsx)(i.A, {
                                                          className:
                                                            "h-4 w-4 text-amber-500",
                                                        }),
                                                      "reasoning" === e.type &&
                                                        (0, r.jsx)(l.A, {
                                                          className:
                                                            "h-4 w-4 text-indigo-500",
                                                        }),
                                                      ("synthesis" === e.type ||
                                                        "thought" === e.type) &&
                                                        (0, r.jsx)(i.A, {
                                                          className:
                                                            "h-4 w-4 text-purple-500",
                                                        }),
                                                    ],
                                                  }),
                                                  (0, r.jsxs)("div", {
                                                    className: "flex-1",
                                                    children: [
                                                      (0, r.jsxs)("div", {
                                                        className:
                                                          "flex items-center gap-2",
                                                        children: [
                                                          (0, r.jsx)(u.E, {
                                                            variant:
                                                              "complete" ===
                                                              e.status
                                                                ? "default"
                                                                : "pending" ===
                                                                    e.status
                                                                  ? "outline"
                                                                  : "destructive",
                                                            className:
                                                              "text-xs font-normal",
                                                            children: e.status,
                                                          }),
                                                          (0, r.jsxs)("span", {
                                                            className:
                                                              "text-xs text-muted-foreground",
                                                            children: [
                                                              "Depth: ",
                                                              e.depth,
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      (0, r.jsx)("p", {
                                                        className:
                                                          "mt-1 text-sm",
                                                        children: e.message,
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              },
                                              t,
                                            ),
                                          ),
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                              (0, r.jsx)(j.TabsContent, {
                                value: "findings",
                                className: "mt-2",
                                children: (0, r.jsxs)(x.Zp, {
                                  children: [
                                    (0, r.jsxs)(x.aR, {
                                      className: "pb-2",
                                      children: [
                                        (0, r.jsx)(x.ZB, {
                                          className: "text-base",
                                          children: "Research Findings",
                                        }),
                                        (0, r.jsx)(x.BT, {
                                          children:
                                            "Key insights discovered during research",
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)(x.Wu, {
                                      children: (0, r.jsx)(g.F, {
                                        className: "h-[300px] pr-4",
                                        children:
                                          S.length > 0
                                            ? (0, r.jsx)("div", {
                                                className: "space-y-4",
                                                children: S.map((e, t) =>
                                                  (0, r.jsxs)(
                                                    "div",
                                                    {
                                                      className:
                                                        "border-b pb-4 last:border-0 last:pb-0",
                                                      children: [
                                                        (0, r.jsx)("p", {
                                                          className:
                                                            "text-sm mb-2",
                                                          children: e.content,
                                                        }),
                                                        (0, r.jsxs)("div", {
                                                          className:
                                                            "flex text-xs text-muted-foreground gap-2",
                                                          children: [
                                                            (0, r.jsxs)(
                                                              "span",
                                                              {
                                                                children: [
                                                                  "Confidence:",
                                                                  " ",
                                                                  (
                                                                    100 *
                                                                    e.confidence
                                                                  ).toFixed(0),
                                                                  "%",
                                                                ],
                                                              },
                                                            ),
                                                            (0, r.jsxs)(
                                                              "span",
                                                              {
                                                                children: [
                                                                  "Sources: ",
                                                                  e.sources.join(
                                                                    ", ",
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    t,
                                                  ),
                                                ),
                                              })
                                            : (0, r.jsx)("div", {
                                                className:
                                                  "text-center py-8 text-muted-foreground",
                                                children:
                                                  "Research findings will appear here when completed.",
                                              }),
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          E &&
                            (0, r.jsx)("div", {
                              className:
                                "text-center text-sm text-muted-foreground",
                              children: "AI is performing deep research...",
                            }),
                        ],
                      }),
                    ],
                  })
              : null;
          }
          ([h, u, p, x, f, j] = y.then ? (await y)() : y), a();
        } catch (e) {
          a(e);
        }
      });
    },
    84594: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { q: () => I });
          var r = s(61268),
            i = s(27896),
            n = s(99358),
            l = s(52327),
            c = s(92206),
            o = s(44761),
            d = s(70753),
            m = s(42944),
            h = s(44803),
            u = s(99793),
            p = s(29771),
            x = s(94910),
            f = s(18936),
            g = s(68325),
            j = s(98638),
            y = s(97911),
            v = s(31469),
            b = s(82985),
            w = s(84205),
            N = s(28909),
            k = s(93336),
            S = s(78337),
            C = s(89284),
            A = s(15090),
            T = s(3519),
            $ = s(32367),
            R = s(15942),
            D = e([N, k, S, C, R]);
          [N, k, S, C, R] = D.then ? (await D)() : D;
          let E = [
              {
                value: "private",
                label: "Private",
                icon: i.A,
                description: "Only you can view this chat",
              },
              {
                value: "public",
                label: "Public",
                icon: n.A,
                description: "Anyone with the link can view this chat",
              },
              {
                value: "team",
                label: "Team",
                icon: l.A,
                description: "Your team members can view this chat",
              },
            ],
            F = [
              { value: "gpt-4o", label: "GPT-4o" },
              { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
            ];
          function I({
            chatId: e,
            initialTitle: t,
            selectedModel: s,
            selectedVisibility: a,
            onModelChange: n,
            onVisibilityChange: l,
            onTitleChange: D,
            onNewSession: I,
            onSessionChange: M,
            isReadonly: U = !1,
            toggleArtifact: z,
            isArtifactVisible: P = !1,
            toggleResearch: q,
            isResearchVisible: L = !1,
            toggleDocumentProcessor: _,
            isDocumentProcessorVisible: Z = !1,
            toggleWebScraper: B,
            isWebScraperVisible: V = !1,
            toggleAnalytics: O,
            isAnalyticsVisible: W = !1,
          }) {
            let { user: H } = (0, T.useAuth)(),
              { toast: Q } = (0, A.d)(),
              J = (0, $.Iw)(),
              [G, K] = (0, w.useState)([]),
              [X, Y] = (0, w.useState)(!1),
              [ee, et] = (0, w.useState)(!1),
              [es, ea] = (0, w.useState)(!1),
              [er, ei] = (0, w.useState)(!1),
              [en, el] = (0, w.useState)(!1),
              [ec, eo] = (0, w.useState)(!1),
              [ed, em] = (0, w.useState)(!1),
              [eh, eu] = (0, w.useState)(t),
              [ep, ex] = (0, w.useState)(!1),
              [ef, eg] = (0, w.useState)(!1),
              ej = E.find((e) => e.value === a),
              ey = ej?.icon || i.A,
              ev = async () => {
                et(!0);
                try {
                  let t = `${window.location.origin}/chat/${e}`;
                  await navigator.clipboard.writeText(t),
                    Q({
                      title: "Link copied",
                      description: "Chat link copied to clipboard",
                    });
                } catch (e) {
                  console.error("Failed to copy link:", e),
                    Q({
                      title: "Failed to copy link",
                      description: "An error occurred while copying the link",
                      variant: "destructive",
                    });
                } finally {
                  et(!1);
                }
              },
              eb = async (t) => {
                if (t !== a && !es && J && H?.id) {
                  ea(!0);
                  try {
                    let { error: s } = await J.from("chat_sessions")
                      .update({
                        visibility: t,
                        updated_at: new Date().toISOString(),
                      })
                      .eq("id", e)
                      .eq("user_id", H.id);
                    if (s) throw s;
                    l(t),
                      Q({
                        title: "Chat visibility updated",
                        description: `Chat is now ${t}`,
                      });
                  } catch (e) {
                    console.error("Failed to update visibility:", e),
                      Q({
                        title: "Failed to update visibility",
                        description: e.message,
                        variant: "destructive",
                      });
                  } finally {
                    ea(!1);
                  }
                }
              },
              ew = async () => {
                if (!er) {
                  ei(!0);
                  try {
                    if (
                      !(
                        await fetch(`/api/chat/${e}/archive`, { method: "PUT" })
                      ).ok
                    )
                      throw Error("Failed to archive chat");
                    Q({ title: "Chat archived" }), eg(!0);
                  } catch (e) {
                    console.error("Failed to archive chat:", e),
                      Q({
                        title: "Failed to archive chat",
                        description: e.message,
                        variant: "destructive",
                      });
                  } finally {
                    ei(!1);
                  }
                }
              },
              eN = async () => {
                if (!en) {
                  el(!0);
                  try {
                    if (
                      !(
                        await fetch(`/api/chat/${e}/unarchive`, {
                          method: "PUT",
                        })
                      ).ok
                    )
                      throw Error("Failed to unarchive chat");
                    Q({ title: "Chat unarchived" }), eg(!1);
                  } catch (e) {
                    console.error("Failed to unarchive chat:", e),
                      Q({
                        title: "Failed to unarchive chat",
                        description: e.message,
                        variant: "destructive",
                      });
                  } finally {
                    el(!1);
                  }
                }
              },
              ek = async () => {
                if (!ec) {
                  eo(!0);
                  try {
                    if (
                      !(await fetch(`/api/chat/${e}`, { method: "DELETE" })).ok
                    )
                      throw Error("Failed to delete chat");
                    Q({ title: "Chat deleted" }), I();
                  } catch (e) {
                    console.error("Failed to delete chat:", e),
                      Q({
                        title: "Failed to delete chat",
                        description: e.message,
                        variant: "destructive",
                      });
                  } finally {
                    eo(!1);
                  }
                }
              },
              eS = (0, w.useCallback)(async () => {
                let s = eh.trim();
                if (!J || !H?.id || !s || s === t || ep) {
                  em(!1), s !== t && eu(t);
                  return;
                }
                ex(!0);
                try {
                  let { error: t } = await J.from("chat_sessions")
                    .update({ title: s, updated_at: new Date().toISOString() })
                    .eq("id", e);
                  if (t) throw t;
                  Q({ title: "Title updated" }),
                    em(!1),
                    K((t) =>
                      t.map((t) => (t.id === e ? { ...t, title: s } : t)),
                    ),
                    D && D(s);
                } catch (e) {
                  console.error("Failed to update title:", e),
                    Q({
                      title: "Failed to save title",
                      variant: "destructive",
                    }),
                    eu(t);
                } finally {
                  ex(!1), em(!1);
                }
              }, [J, H?.id, e, eh, t, Q, ep, D]),
              eC = async () => {
                try {
                  let t = await fetch(`/api/chat/${e}/messages`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  });
                  if (!t.ok) throw Error("Failed to fetch chat messages");
                  let s = await t.json();
                  if (!s || 0 === s.length)
                    return void Q({
                      title: "No messages to export",
                      description: "This chat has no messages to export.",
                    });
                  let a = eh || `Chat_${e}`,
                    r = new Date().toISOString().split("T")[0],
                    i = `# ${a}
`;
                  (i += `# Exported on: ${r}

`),
                    s.forEach((e) => {
                      let t = new Date(e.created_at).toLocaleString(),
                        s = e.role.charAt(0).toUpperCase() + e.role.slice(1);
                      i += `## ${s} (${t})
${e.content}

`;
                    });
                  let n = new Blob([i], { type: "text/plain" }),
                    l = URL.createObjectURL(n),
                    c = document.createElement("a");
                  (c.href = l),
                    (c.download = `${a.replace(/\s+/g, "_")}_${r}.txt`),
                    document.body.appendChild(c),
                    c.click(),
                    document.body.removeChild(c),
                    URL.revokeObjectURL(l),
                    Q({
                      title: "Chat exported successfully",
                      description: `Saved as ${c.download}`,
                    });
                } catch (e) {
                  console.error("Failed to export chat:", e),
                    Q({
                      title: "Failed to export chat",
                      description: e.message || "An unexpected error occurred",
                      variant: "destructive",
                    });
                }
              };
            return (
              G.find((t) => t.id === e)?.title || e?.substring(0, 6),
              (0, r.jsx)(C.Bc, {
                delayDuration: 0,
                children: (0, r.jsxs)("div", {
                  className:
                    "relative z-20 flex h-14 items-center justify-between border-b bg-background px-4",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        (0, r.jsx)("div", {
                          className: "flex items-center gap-1",
                          children: ed
                            ? (0, r.jsxs)(r.Fragment, {
                                children: [
                                  (0, r.jsx)(S.p, {
                                    value: eh,
                                    onChange: (e) => {
                                      eu(e.target.value);
                                    },
                                    onBlur: eS,
                                    onKeyDown: (e) => {
                                      "Enter" === e.key
                                        ? (e.preventDefault(), eS())
                                        : "Escape" === e.key && (eu(t), em(!1));
                                    },
                                    className: "h-8 flex-grow min-w-0",
                                    autoFocus: !0,
                                    disabled: ep,
                                    placeholder: "Chat title",
                                  }),
                                  (0, r.jsx)(N.$, {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: eS,
                                    disabled:
                                      ep || eh.trim() === t || !eh.trim(),
                                    children: ep ? "Saving..." : "Save",
                                  }),
                                  (0, r.jsx)(N.$, {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: () => {
                                      eu(t), em(!1);
                                    },
                                    disabled: ep,
                                    children: "Cancel",
                                  }),
                                ],
                              })
                            : (0, r.jsxs)(C.m_, {
                                children: [
                                  (0, r.jsx)(C.k$, {
                                    asChild: !0,
                                    children: (0, r.jsxs)(N.$, {
                                      variant: "ghost",
                                      className:
                                        "flex items-center gap-1.5 px-2 max-w-full text-left h-auto py-1",
                                      onClick: () => !U && em(!0),
                                      disabled: U,
                                      children: [
                                        (0, r.jsx)(c.A, {
                                          className:
                                            "h-4 w-4 text-muted-foreground flex-shrink-0",
                                        }),
                                        (0, r.jsx)("span", {
                                          className:
                                            "truncate text-base font-semibold flex-grow min-w-0",
                                          title: eh,
                                          children: eh || "New Chat",
                                        }),
                                        !U &&
                                          (0, r.jsx)(o.A, {
                                            className:
                                              "h-3.5 w-3.5 text-muted-foreground ml-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                                          }),
                                      ],
                                    }),
                                  }),
                                  (0, r.jsx)(C.ZI, {
                                    children: U ? eh : "Edit Title",
                                  }),
                                ],
                              }),
                        }),
                        (0, r.jsxs)(k.rI, {
                          children: [
                            (0, r.jsxs)(C.m_, {
                              children: [
                                (0, r.jsx)(C.k$, {
                                  asChild: !0,
                                  children: (0, r.jsx)(k.ty, {
                                    asChild: !0,
                                    children: (0, r.jsxs)(N.$, {
                                      variant: "ghost",
                                      size: "icon",
                                      className: "h-8 w-8 flex-shrink-0",
                                      disabled: X,
                                      children: [
                                        (0, r.jsx)(d.A, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "sr-only",
                                          children: "Switch Chat",
                                        }),
                                      ],
                                    }),
                                  }),
                                }),
                                (0, r.jsx)(C.ZI, { children: "Switch Chat" }),
                              ],
                            }),
                            (0, r.jsxs)(k.SQ, {
                              align: "start",
                              className: "w-64",
                              children: [
                                (0, r.jsx)(k.lp, { children: "Recent Chats" }),
                                (0, r.jsx)(k.mB, {}),
                                X
                                  ? (0, r.jsx)(k._2, {
                                      disabled: !0,
                                      children: "Loading...",
                                    })
                                  : G.length > 0
                                    ? G.map((t) =>
                                        (0, r.jsx)(
                                          k._2,
                                          {
                                            onClick: () => M(t.id),
                                            disabled: t.id === e,
                                            className: (0, R.cn)(
                                              t.id === e && "bg-accent",
                                            ),
                                            children: (0, r.jsx)("span", {
                                              className: "truncate",
                                              children:
                                                t.title ||
                                                `Chat (${t.id.substring(0, 6)}...)`,
                                            }),
                                          },
                                          t.id,
                                        ),
                                      )
                                    : (0, r.jsx)(k._2, {
                                        disabled: !0,
                                        children: "No recent chats",
                                      }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsxs)(C.m_, {
                          children: [
                            (0, r.jsx)(C.k$, {
                              asChild: !0,
                              children: (0, r.jsxs)(N.$, {
                                variant: "outline",
                                size: "icon",
                                onClick: I,
                                className: "h-8 w-8 flex-shrink-0",
                                children: [
                                  (0, r.jsx)(m.A, { className: "h-4 w-4" }),
                                  (0, r.jsx)("span", {
                                    className: "sr-only",
                                    children: "New Chat",
                                  }),
                                ],
                              }),
                            }),
                            (0, r.jsx)(C.ZI, { children: "New Chat" }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "flex items-center gap-1 flex-shrink-0",
                      children: [
                        q &&
                          (0, r.jsxs)(C.m_, {
                            children: [
                              (0, r.jsx)(C.k$, {
                                asChild: !0,
                                children: (0, r.jsx)(N.$, {
                                  variant: L ? "secondary" : "ghost",
                                  size: "icon",
                                  onClick: q,
                                  className: "h-8 w-8",
                                  children: (0, r.jsx)(h.A, {
                                    className: "h-4 w-4",
                                  }),
                                }),
                              }),
                              (0, r.jsx)(C.ZI, { children: "Research Panel" }),
                            ],
                          }),
                        _ &&
                          (0, r.jsxs)(C.m_, {
                            children: [
                              (0, r.jsx)(C.k$, {
                                asChild: !0,
                                children: (0, r.jsx)(N.$, {
                                  variant: Z ? "secondary" : "ghost",
                                  size: "icon",
                                  onClick: _,
                                  className: "h-8 w-8",
                                  children: (0, r.jsx)(u.A, {
                                    className: "h-4 w-4",
                                  }),
                                }),
                              }),
                              (0, r.jsx)(C.ZI, {
                                children: "Document Processor",
                              }),
                            ],
                          }),
                        B &&
                          (0, r.jsxs)(C.m_, {
                            children: [
                              (0, r.jsx)(C.k$, {
                                asChild: !0,
                                children: (0, r.jsx)(N.$, {
                                  variant: V ? "secondary" : "ghost",
                                  size: "icon",
                                  onClick: B,
                                  className: "h-8 w-8",
                                  children: (0, r.jsx)(p.A, {
                                    className: "h-4 w-4",
                                  }),
                                }),
                              }),
                              (0, r.jsx)(C.ZI, { children: "Web Scraper" }),
                            ],
                          }),
                        z &&
                          (0, r.jsxs)(C.m_, {
                            children: [
                              (0, r.jsx)(C.k$, {
                                asChild: !0,
                                children: (0, r.jsx)(N.$, {
                                  variant: P ? "secondary" : "ghost",
                                  size: "icon",
                                  onClick: z,
                                  className: "h-8 w-8",
                                  children: (0, r.jsx)(x.A, {
                                    className: "h-4 w-4",
                                  }),
                                }),
                              }),
                              (0, r.jsx)(C.ZI, { children: "Artifacts Panel" }),
                            ],
                          }),
                        O &&
                          (0, r.jsxs)(C.m_, {
                            children: [
                              (0, r.jsx)(C.k$, {
                                asChild: !0,
                                children: (0, r.jsx)(N.$, {
                                  variant: W ? "secondary" : "ghost",
                                  size: "icon",
                                  onClick: O,
                                  className: "h-8 w-8",
                                  children: (0, r.jsx)(f.A, {
                                    className: "h-4 w-4",
                                  }),
                                }),
                              }),
                              (0, r.jsx)(C.ZI, { children: "Chat Analytics" }),
                            ],
                          }),
                        (q || _ || B || z || O) &&
                          (0, r.jsx)("div", {
                            className: "h-6 w-px bg-border mx-1",
                          }),
                        (0, r.jsxs)(k.rI, {
                          children: [
                            (0, r.jsxs)(C.m_, {
                              children: [
                                (0, r.jsx)(C.k$, {
                                  asChild: !0,
                                  children: (0, r.jsx)(k.ty, {
                                    asChild: !0,
                                    children: (0, r.jsxs)(N.$, {
                                      variant: "outline",
                                      className:
                                        "flex items-center gap-1.5 px-2 h-8",
                                      children: [
                                        (0, r.jsx)(g.A, {
                                          className:
                                            "h-4 w-4 text-muted-foreground",
                                        }),
                                        (0, r.jsx)("span", {
                                          className:
                                            "text-sm max-w-[100px] truncate",
                                          children:
                                            F.find((e) => e.value === s)
                                              ?.label || s,
                                        }),
                                        (0, r.jsx)(d.A, {
                                          className:
                                            "h-4 w-4 text-muted-foreground",
                                        }),
                                      ],
                                    }),
                                  }),
                                }),
                                (0, r.jsx)(C.ZI, { children: "Select Model" }),
                              ],
                            }),
                            (0, r.jsxs)(k.SQ, {
                              align: "end",
                              children: [
                                (0, r.jsx)(k.lp, { children: "Select Model" }),
                                (0, r.jsx)(k.mB, {}),
                                (0, r.jsx)(k.Hr, {
                                  value: s,
                                  onValueChange: n,
                                  children: F.map((e) =>
                                    (0, r.jsx)(
                                      k.Ht,
                                      { value: e.value, children: e.label },
                                      e.value,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsxs)(k.rI, {
                          children: [
                            (0, r.jsxs)(C.m_, {
                              children: [
                                (0, r.jsx)(C.k$, {
                                  asChild: !0,
                                  children: (0, r.jsx)(k.ty, {
                                    asChild: !0,
                                    children: (0, r.jsxs)(N.$, {
                                      variant: "secondary",
                                      className:
                                        "flex items-center gap-1.5 px-3 h-8",
                                      children: [
                                        (0, r.jsx)(ey, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, r.jsx)("span", {
                                          className: "text-sm",
                                          children: ej?.label || "Share",
                                        }),
                                      ],
                                    }),
                                  }),
                                }),
                                (0, r.jsx)(C.ZI, {
                                  children: "Share & Actions",
                                }),
                              ],
                            }),
                            (0, r.jsxs)(k.SQ, {
                              align: "end",
                              className: "w-64",
                              children: [
                                (0, r.jsx)(k.lp, {
                                  children: "Sharing Settings",
                                }),
                                E.map((e) =>
                                  (0, r.jsxs)(
                                    k._2,
                                    {
                                      onClick: () => eb(e.value),
                                      disabled: es || e.value === a,
                                      children: [
                                        (0, r.jsx)(e.icon, {
                                          className: "h-4 w-4 mr-2",
                                        }),
                                        (0, r.jsxs)("div", {
                                          children: [
                                            (0, r.jsx)("div", {
                                              children: e.label,
                                            }),
                                            (0, r.jsx)("div", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children: e.description,
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e.value,
                                  ),
                                ),
                                (0, r.jsx)(k.mB, {}),
                                (0, r.jsx)(k.lp, { children: "Other Actions" }),
                                (0, r.jsxs)(k._2, {
                                  onClick: ev,
                                  disabled: ee,
                                  children: [
                                    (0, r.jsx)(j.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    " ",
                                    ee ? "Copying..." : "Copy Link",
                                  ],
                                }),
                                (0, r.jsxs)(k._2, {
                                  onClick: eC,
                                  children: [
                                    (0, r.jsx)(y.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    " Export Chat",
                                  ],
                                }),
                                ef
                                  ? (0, r.jsxs)(k._2, {
                                      onClick: eN,
                                      disabled: en,
                                      children: [
                                        (0, r.jsx)(v.A, {
                                          className: "mr-2 h-4 w-4",
                                        }),
                                        " ",
                                        en ? "Unarchiving..." : "Unarchive",
                                      ],
                                    })
                                  : (0, r.jsxs)(k._2, {
                                      onClick: ew,
                                      disabled: er,
                                      children: [
                                        (0, r.jsx)(v.A, {
                                          className: "mr-2 h-4 w-4",
                                        }),
                                        " ",
                                        er ? "Archiving..." : "Archive",
                                      ],
                                    }),
                                !U &&
                                  (0, r.jsxs)(k._2, {
                                    onClick: ek,
                                    disabled: ec,
                                    className:
                                      "text-destructive focus:text-destructive focus:bg-destructive/10",
                                    children: [
                                      (0, r.jsx)(b.A, {
                                        className: "mr-2 h-4 w-4",
                                      }),
                                      " ",
                                      ec ? "Deleting..." : "Delete Chat",
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
              })
            );
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    91255: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("BarChart", [
        ["line", { x1: "12", x2: "12", y1: "20", y2: "10", key: "1vz5eb" }],
        ["line", { x1: "18", x2: "18", y1: "20", y2: "4", key: "cun8e5" }],
        ["line", { x1: "6", x2: "6", y1: "20", y2: "16", key: "hq0ia6" }],
      ]);
    },
    92206: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("MessageSquare", [
        [
          "path",
          {
            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
            key: "1lielz",
          },
        ],
      ]);
    },
    94262: (e, t, s) => {
      s.a(e, async (e, a) => {
        try {
          s.d(t, { E: () => c });
          var r = s(61268);
          s(84205);
          var i = s(5451),
            n = s(71269),
            l = e([i, n]);
          [i, n] = l.then ? (await l)() : l;
          let c = ({ artifact: e }) => {
            let t = "",
              s = "plaintext";
            if ("string" == typeof e.content)
              try {
                let a = JSON.parse(e.content);
                "object" == typeof a && null !== a && a.code
                  ? ((t = a.code), (s = a.language || "plaintext"))
                  : (t = e.content);
              } catch (s) {
                t = e.content;
              }
            else
              "object" == typeof e.content &&
                null !== e.content &&
                e.content.code &&
                ((t = e.content.code), (s = e.content.language || "plaintext"));
            return (0, r.jsxs)(i.Zp, {
              className: "h-full flex flex-col",
              children: [
                (0, r.jsx)(i.aR, {
                  children: (0, r.jsx)(i.ZB, {
                    children: e.title || "Code Artifact",
                  }),
                }),
                (0, r.jsx)(i.Wu, {
                  className: "flex-1 overflow-auto p-0",
                  children: (0, r.jsx)(n.$, { language: s, value: t }),
                }),
              ],
            });
          };
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    94910: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Database", [
        ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
        ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
        ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
      ]);
    },
    97911: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Download", [
        [
          "path",
          { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
        ],
        ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
        ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
      ]);
    },
    99358: (e, t, s) => {
      s.d(t, { A: () => a });
      let a = (0, s(95255).A)("Globe", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        [
          "path",
          {
            d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
            key: "13o1zl",
          },
        ],
        ["path", { d: "M2 12h20", key: "9i4pu4" }],
      ]);
    },
  });
//# sourceMappingURL=9008.js.map
