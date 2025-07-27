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
    (e._sentryDebugIds[s] = "102f3d90-eedf-4379-a409-a824ab241d19"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-102f3d90-eedf-4379-a409-a824ab241d19"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2313],
  {
    59216: (e, s, a) => {
      "use strict";
      a.d(s, { DocumentAnalyzer: () => S });
      var t = a(30602),
        n = a(21699),
        l = a(21301),
        r = a(44371),
        i = a(40972),
        c = a(41960),
        o = a(85218),
        d = a(60653),
        m = a(40459);
      a(78398).hp;
      let u = m.env.SUPABASE_SERVICE_ROLE_KEY || "",
        p = (0, d.UU)("http://localhost:54321", u),
        h = "documents";
      async function x(e, s) {
        let a =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : h,
          t = arguments.length > 3 ? arguments[3] : void 0;
        try {
          let n = Date.now(),
            l = Math.random().toString(36).substring(2, 10),
            r = encodeURIComponent(s.replace(/[^a-zA-Z0-9.-]/g, "_")),
            i = "".concat(n, "_").concat(l, "_").concat(r),
            { data: c, error: o } = await p.storage.from(a).upload(i, e, {
              contentType: (function (e) {
                var s;
                switch (
                  null == (s = e.split(".").pop()) ? void 0 : s.toLowerCase()
                ) {
                  case "pdf":
                    return "application/pdf";
                  case "png":
                    return "image/png";
                  case "jpg":
                  case "jpeg":
                    return "image/jpeg";
                  case "tiff":
                  case "tif":
                    return "image/tiff";
                  case "doc":
                    return "application/msword";
                  case "docx":
                    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                  case "xls":
                    return "application/vnd.ms-excel";
                  case "xlsx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                  case "ppt":
                    return "application/vnd.ms-powerpoint";
                  case "pptx":
                    return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                  default:
                    return "application/octet-stream";
                }
              })(s),
              upsert: !1,
              ...(t ? { metadata: t } : {}),
            });
          if (o)
            throw (
              (console.error("Supabase Storage upload error:", o),
              Error(
                "Failed to upload file to Supabase Storage: ".concat(o.message),
              ))
            );
          if (!c || !c.path)
            throw Error("Failed to upload file: No path returned");
          return c.path;
        } catch (e) {
          throw (
            (console.error("File upload error:", e),
            Error(
              "File upload failed: ".concat(
                e instanceof Error ? e.message : "Unknown error",
              ),
            ))
          );
        }
      }
      var f = a(17967),
        g = (function (e) {
          return (
            (e.PASSPORT = "passport"),
            (e.VISA = "visa"),
            (e.BIRTH_CERTIFICATE = "birth_certificate"),
            (e.MARRIAGE_CERTIFICATE = "marriage_certificate"),
            (e.EDUCATION_CREDENTIAL = "education_credential"),
            (e.EMPLOYMENT_LETTER = "employment_letter"),
            (e.BANK_STATEMENT = "bank_statement"),
            (e.TAX_DOCUMENT = "tax_document"),
            (e.MEDICAL_RECORD = "medical_record"),
            (e.POLICE_CLEARANCE = "police_clearance"),
            (e.OTHER = "other"),
            e
          );
        })({});
      f.Ik({
        documentType: f.fc(g),
        fileUrl: f.Yj().url(),
        fileName: f.Yj(),
        userId: f.Yj().uuid(),
        validateAgainstTemplate: f.zM().optional().default(!1),
        callbackUrl: f.Yj().url().optional(),
        metadata: f.g1(f.Yj(), f.bz()).optional(),
      });
      var j = a(69727),
        N = a(20435),
        y = a(26600),
        v = a(5271),
        E = a(77413),
        b = a(4401),
        T = a(60070),
        w = a(33511),
        A = a(61159),
        _ = a(86697),
        C = a(47482);
      function S(e) {
        let {
          onAnalysisComplete: s,
          allowedDocumentTypes: a,
          defaultDocumentType: d = g.PASSPORT,
          targetCountry: m,
          userId: u,
          className: f,
        } = e;
        (0, c.useRouter)();
        let { toast: S } = (0, C.d)(),
          [D, I] = (0, o.useState)(null),
          [R, U] = (0, o.useState)(d),
          [k, O] = (0, o.useState)(!1),
          [z, F] = (0, o.useState)(0),
          [L, P] = (0, o.useState)(!1),
          [M, V] = (0, o.useState)(null),
          [Y, B] = (0, o.useState)("upload"),
          J = a || Object.values(g),
          $ = (0, o.useCallback)(async () => {
            if (!D)
              return void S({
                title: "No file selected",
                description: "Please select a document file to analyze.",
                variant: "destructive",
              });
            try {
              O(!0), F(10);
              let e = "documents",
                a = {
                  documentType: R,
                  uploadedAt: new Date().toISOString(),
                  originalName: D.name,
                },
                t = await x(e, D, u ? "users/".concat(u) : "public", a);
              F(50);
              let n = (function (e) {
                let s =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : h,
                  { data: a } = p.storage.from(s).getPublicUrl(e);
                return a.publicUrl;
              })(e, t);
              O(!1), P(!0), F(70);
              let l = await fetch("/api/ai/document-analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  documentType: R,
                  fileUrl: n,
                  userId: u,
                  targetCountry: m,
                }),
              });
              if (!l.ok) throw Error("Analysis failed: ".concat(l.statusText));
              let r = await l.json();
              if ((F(100), !r.success))
                throw Error(r.error || "Analysis failed");
              V(r.data),
                s && s(r.data),
                B("results"),
                S({
                  title: "Document analysis complete",
                  description: r.data.isValid
                    ? "The document has been successfully analyzed."
                    : "The document has been analyzed with some issues.",
                });
            } catch (e) {
              console.error("Document analysis error:", e),
                S({
                  title: "Analysis failed",
                  description:
                    e instanceof Error
                      ? e.message
                      : "Failed to analyze document",
                  variant: "destructive",
                });
            } finally {
              O(!1), P(!1);
            }
          }, [D, R, u, m, S, s]);
        return (0, t.jsxs)(E.Zp, {
          className: f,
          children: [
            (0, t.jsxs)(E.aR, {
              children: [
                (0, t.jsxs)(E.ZB, {
                  className: "flex items-center gap-2",
                  children: [
                    (0, t.jsx)(n.A, { className: "h-5 w-5" }),
                    "Document Analyzer",
                  ],
                }),
                (0, t.jsx)(E.BT, {
                  children:
                    "Upload and analyze immigration documents for validation and information extraction",
                }),
              ],
            }),
            (0, t.jsxs)(_.Tabs, {
              defaultValue: "upload",
              children: [
                (0, t.jsxs)(_.TabsList, {
                  className: "mx-6",
                  children: [
                    (0, t.jsx)(_.TabsTrigger, {
                      value: "upload",
                      onClick: () => B("upload"),
                      children: "Upload",
                    }),
                    (0, t.jsx)(_.TabsTrigger, {
                      value: "results",
                      onClick: () => B("results"),
                      disabled: !M,
                      children: "Results",
                    }),
                  ],
                }),
                (0, t.jsxs)(E.Wu, {
                  className: "pt-6",
                  children: [
                    "upload" === Y &&
                      (0, t.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, t.jsx)(T.J, {
                                htmlFor: "documentType",
                                children: "Document Type",
                              }),
                              (0, t.jsxs)(A.l6, {
                                value: R,
                                onValueChange: (e) => {
                                  U(e), V(null);
                                },
                                disabled: k || L,
                                children: [
                                  (0, t.jsx)(A.bq, {
                                    id: "documentType",
                                    children: (0, t.jsx)(A.yv, {
                                      placeholder: "Select a document type",
                                    }),
                                  }),
                                  (0, t.jsx)(A.gC, {
                                    children: J.map((e) =>
                                      (0, t.jsx)(
                                        A.eb,
                                        {
                                          value: e,
                                          children: e
                                            .replace(/_/g, " ")
                                            .replace(/\b\w/g, (e) =>
                                              e.toUpperCase(),
                                            ),
                                        },
                                        e,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                              (0, t.jsx)(T.J, {
                                htmlFor: "file",
                                children: "Document File",
                              }),
                              (0, t.jsx)("div", {
                                className: "flex items-center gap-2",
                                children: (0, t.jsx)(b.p, {
                                  id: "file",
                                  type: "file",
                                  onChange: (e) => {
                                    e.target.files &&
                                      e.target.files[0] &&
                                      (I(e.target.files[0]), F(0), V(null));
                                  },
                                  accept: ".pdf,.jpg,.jpeg,.png",
                                  disabled: k || L,
                                  className: "flex-1",
                                }),
                              }),
                              D &&
                                (0, t.jsxs)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children: [
                                    "Selected: ",
                                    D.name,
                                    " (",
                                    (D.size / 1024 / 1024).toFixed(2),
                                    " MB)",
                                  ],
                                }),
                            ],
                          }),
                          (k || L) &&
                            (0, t.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    (0, t.jsx)(T.J, {
                                      children: k
                                        ? "Uploading..."
                                        : "Analyzing...",
                                    }),
                                    (0, t.jsxs)("span", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children: [z, "%"],
                                    }),
                                  ],
                                }),
                                (0, t.jsx)(w.k, { value: z, className: "h-2" }),
                              ],
                            }),
                        ],
                      }),
                    "results" === Y &&
                      M &&
                      (0, t.jsxs)("div", {
                        className: "space-y-6",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, t.jsx)(y.E, {
                                    variant: M.isValid
                                      ? "default"
                                      : "destructive",
                                    children: M.isValid ? "Valid" : "Invalid",
                                  }),
                                  (0, t.jsxs)("span", {
                                    className: "text-sm font-medium",
                                    children: [
                                      "Completeness:",
                                      " ",
                                      Math.round(100 * M.completeness),
                                      "%",
                                    ],
                                  }),
                                ],
                              }),
                              (0, t.jsxs)(y.E, {
                                variant: "outline",
                                children: [
                                  M.languageDetection.primary.toUpperCase(),
                                  M.languageDetection.secondary &&
                                    " / ".concat(
                                      M.languageDetection.secondary.toUpperCase(),
                                    ),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, t.jsxs)(N.Fc, {
                                variant:
                                  M.formatErrors.length > 0
                                    ? "destructive"
                                    : "default",
                                children: [
                                  (0, t.jsx)(l.A, { className: "h-4 w-4" }),
                                  (0, t.jsx)(N.XL, {
                                    className: "ml-2",
                                    children: "Format Issues",
                                  }),
                                  (0, t.jsx)(N.TN, {
                                    children:
                                      0 === M.formatErrors.length
                                        ? "No format issues detected"
                                        : ""
                                            .concat(
                                              M.formatErrors.length,
                                              " format ",
                                            )
                                            .concat(
                                              1 === M.formatErrors.length
                                                ? "issue"
                                                : "issues",
                                              " detected",
                                            ),
                                  }),
                                ],
                              }),
                              M.formatErrors.length > 0 &&
                                (0, t.jsx)(j.nD, {
                                  type: "single",
                                  collapsible: !0,
                                  className: "w-full",
                                  children: M.formatErrors.map((e, s) =>
                                    (0, t.jsxs)(
                                      j.As,
                                      {
                                        value: "format-error-".concat(s),
                                        children: [
                                          (0, t.jsxs)(j.$m, {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              (0, t.jsx)(y.E, {
                                                variant:
                                                  "critical" === e.type
                                                    ? "destructive"
                                                    : "outline",
                                                children: e.type,
                                              }),
                                              (0, t.jsx)("span", {
                                                children: e.message,
                                              }),
                                            ],
                                          }),
                                          (0, t.jsxs)(j.ub, {
                                            children: [
                                              e.suggestion &&
                                                (0, t.jsxs)("div", {
                                                  className:
                                                    "mt-2 rounded-md bg-muted p-3",
                                                  children: [
                                                    (0, t.jsx)("p", {
                                                      className:
                                                        "text-sm font-medium",
                                                      children: "Suggestion:",
                                                    }),
                                                    (0, t.jsx)("p", {
                                                      className: "text-sm",
                                                      children: e.suggestion,
                                                    }),
                                                  ],
                                                }),
                                              e.position &&
                                                (0, t.jsx)("div", {
                                                  className: "mt-2",
                                                  children: (0, t.jsxs)("p", {
                                                    className:
                                                      "text-sm text-muted-foreground",
                                                    children: [
                                                      "Position: x: ",
                                                      e.position.x,
                                                      ", y:",
                                                      " ",
                                                      e.position.y,
                                                    ],
                                                  }),
                                                }),
                                            ],
                                          }),
                                        ],
                                      },
                                      s,
                                    ),
                                  ),
                                }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, t.jsxs)(N.Fc, {
                                variant:
                                  M.contentErrors.length > 0
                                    ? "destructive"
                                    : "default",
                                children: [
                                  (0, t.jsx)(l.A, { className: "h-4 w-4" }),
                                  (0, t.jsx)(N.XL, {
                                    className: "ml-2",
                                    children: "Content Issues",
                                  }),
                                  (0, t.jsx)(N.TN, {
                                    children:
                                      0 === M.contentErrors.length
                                        ? "No content issues detected"
                                        : ""
                                            .concat(
                                              M.contentErrors.length,
                                              " content ",
                                            )
                                            .concat(
                                              1 === M.contentErrors.length
                                                ? "issue"
                                                : "issues",
                                              " detected",
                                            ),
                                  }),
                                ],
                              }),
                              M.contentErrors.length > 0 &&
                                (0, t.jsx)(j.nD, {
                                  type: "single",
                                  collapsible: !0,
                                  className: "w-full",
                                  children: M.contentErrors.map((e, s) =>
                                    (0, t.jsxs)(
                                      j.As,
                                      {
                                        value: "content-error-".concat(s),
                                        children: [
                                          (0, t.jsxs)(j.$m, {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              (0, t.jsx)(y.E, {
                                                variant:
                                                  "critical" === e.type
                                                    ? "destructive"
                                                    : "outline",
                                                children: e.type,
                                              }),
                                              (0, t.jsx)("span", {
                                                className: "ml-2",
                                                children: e.message,
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)(j.ub, {
                                            children: (0, t.jsxs)("div", {
                                              className: "space-y-2",
                                              children: [
                                                (0, t.jsxs)("div", {
                                                  children: [
                                                    (0, t.jsx)("p", {
                                                      className:
                                                        "text-sm font-medium",
                                                      children: "Section:",
                                                    }),
                                                    (0, t.jsx)("p", {
                                                      className: "text-sm",
                                                      children: e.section,
                                                    }),
                                                  ],
                                                }),
                                                e.suggestion &&
                                                  (0, t.jsxs)("div", {
                                                    className:
                                                      "rounded-md bg-muted p-3",
                                                    children: [
                                                      (0, t.jsx)("p", {
                                                        className:
                                                          "text-sm font-medium",
                                                        children: "Suggestion:",
                                                      }),
                                                      (0, t.jsx)("p", {
                                                        className: "text-sm",
                                                        children: e.suggestion,
                                                      }),
                                                    ],
                                                  }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      },
                                      s,
                                    ),
                                  ),
                                }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, t.jsx)("h3", {
                                className: "text-lg font-medium",
                                children: "Extracted Data",
                              }),
                              (0, t.jsx)("div", {
                                className: "rounded-md border",
                                children: (0, t.jsx)("div", {
                                  className: "grid grid-cols-2 gap-4 p-4",
                                  children: Object.entries(M.extractedData).map(
                                    (e) => {
                                      let [s, a] = e;
                                      return (0, t.jsxs)(
                                        "div",
                                        {
                                          className: "space-y-1",
                                          children: [
                                            (0, t.jsxs)("p", {
                                              className: "text-sm font-medium",
                                              children: [s, ":"],
                                            }),
                                            (0, t.jsx)("p", {
                                              className: "text-sm",
                                              children: a,
                                            }),
                                          ],
                                        },
                                        s,
                                      );
                                    },
                                  ),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
            (0, t.jsxs)(E.wL, {
              className: "flex justify-between",
              children: [
                (0, t.jsx)(v.$, {
                  variant: "outline",
                  onClick: () => {
                    I(null), U(d), F(0), V(null), B("upload");
                  },
                  children: "Reset",
                }),
                (0, t.jsx)(v.$, {
                  onClick: $,
                  disabled: !D || k || L,
                  children: k
                    ? (0, t.jsx)(r.A, {
                        className: "mr-2 h-4 w-4 animate-spin",
                      })
                    : L
                      ? (0, t.jsxs)("span", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, t.jsx)(i.A, { className: "h-4 w-4" }),
                            "Analyzing...",
                          ],
                        })
                      : (0, t.jsxs)("span", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, t.jsx)(i.A, { className: "h-4 w-4" }),
                            "Analyze Document",
                          ],
                        }),
                }),
              ],
            }),
          ],
        });
      }
    },
    70778: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 59216));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(70778)), (_N_E = e.O());
  },
]);
