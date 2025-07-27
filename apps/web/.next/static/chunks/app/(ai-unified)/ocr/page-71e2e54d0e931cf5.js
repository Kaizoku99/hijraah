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
    (e._sentryDebugIds[s] = "ed38b659-18ca-444d-b0c9-0b0d7cf4c451"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ed38b659-18ca-444d-b0c9-0b0d7cf4c451"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3252],
  {
    24124: (e, s, r) => {
      "use strict";
      r.d(s, { MistralDocumentUnderstanding: () => h });
      var t = r(30602),
        a = r(71188),
        n = r(24486),
        l = r(40972),
        i = r(85218),
        c = r(5271),
        d = r(77413),
        o = r(4401),
        m = r(60070),
        u = r(86697),
        p = r(1805);
      function h() {
        let [e, s] = (0, i.useState)(null),
          [r, h] = (0, i.useState)(""),
          [g, x] = (0, i.useState)(""),
          [f, j] = (0, i.useState)(!1),
          [w, b] = (0, i.useState)(null),
          N = async () => {
            if (e && g) {
              j(!0), b(null);
              try {
                let s = new FormData();
                s.append("file", e), s.append("question", g);
                let r = await fetch("/api/ocr/ask-document", {
                    method: "POST",
                    body: s,
                  }),
                  t = await r.json();
                b(t);
              } catch (e) {
                console.error("Error processing document question:", e),
                  b({
                    success: !1,
                    error:
                      e instanceof Error ? e.message : "Unknown error occurred",
                  });
              } finally {
                j(!1);
              }
            }
          },
          v = async () => {
            if (r && g) {
              j(!0), b(null);
              try {
                let e = await fetch("/api/ocr/ask-document-url", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: r, question: g }),
                  }),
                  s = await e.json();
                b(s);
              } catch (e) {
                console.error("Error processing document question:", e),
                  b({
                    success: !1,
                    error:
                      e instanceof Error ? e.message : "Unknown error occurred",
                  });
              } finally {
                j(!1);
              }
            }
          };
        return (0, t.jsxs)(d.Zp, {
          className: "w-full max-w-3xl mx-auto",
          children: [
            (0, t.jsxs)(d.aR, {
              children: [
                (0, t.jsx)(d.ZB, { children: "Document Understanding" }),
                (0, t.jsx)(d.BT, {
                  children:
                    "Upload a document or provide a URL to ask questions about its content",
                }),
              ],
            }),
            (0, t.jsxs)(d.Wu, {
              children: [
                (0, t.jsxs)(u.Tabs, {
                  defaultValue: "file",
                  className: "w-full",
                  children: [
                    (0, t.jsxs)(u.TabsList, {
                      className: "grid w-full grid-cols-2",
                      children: [
                        (0, t.jsx)(u.TabsTrigger, {
                          value: "file",
                          children: "File Upload",
                        }),
                        (0, t.jsx)(u.TabsTrigger, {
                          value: "url",
                          children: "URL",
                        }),
                      ],
                    }),
                    (0, t.jsx)(u.TabsContent, {
                      value: "file",
                      className: "space-y-4",
                      children: (0, t.jsxs)("div", {
                        className: "grid w-full gap-2",
                        children: [
                          (0, t.jsx)(m.J, {
                            htmlFor: "file",
                            children: "Upload Document",
                          }),
                          (0, t.jsx)(o.p, {
                            id: "file",
                            type: "file",
                            accept: ".pdf,.png,.jpg,.jpeg,.tiff,.tif",
                            onChange: (e) => {
                              e.target.files &&
                                e.target.files[0] &&
                                s(e.target.files[0]);
                            },
                          }),
                          e &&
                            (0, t.jsxs)("p", {
                              className: "text-sm text-muted-foreground",
                              children: [
                                "Selected: ",
                                e.name,
                                " (",
                                Math.round(e.size / 1024),
                                " KB)",
                              ],
                            }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(u.TabsContent, {
                      value: "url",
                      className: "space-y-4",
                      children: (0, t.jsxs)("div", {
                        className: "grid w-full gap-2",
                        children: [
                          (0, t.jsx)(m.J, {
                            htmlFor: "url",
                            children: "Document URL",
                          }),
                          (0, t.jsx)(o.p, {
                            id: "url",
                            type: "url",
                            placeholder: "https://example.com/document.pdf",
                            value: r,
                            onChange: (e) => h(e.target.value),
                          }),
                        ],
                      }),
                    }),
                    (0, t.jsx)("div", {
                      className: "flex flex-col gap-4 mt-4",
                      children: (0, t.jsxs)("div", {
                        className: "grid w-full gap-2",
                        children: [
                          (0, t.jsx)(m.J, {
                            htmlFor: "question",
                            children: "Your Question",
                          }),
                          (0, t.jsx)(p.T, {
                            id: "question",
                            placeholder:
                              "What is the main topic of this document?",
                            value: g,
                            onChange: (e) => x(e.target.value),
                            className: "min-h-[100px]",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                w &&
                  (0, t.jsxs)("div", {
                    className: "mt-6",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "font-medium mb-2",
                        children: "Answer",
                      }),
                      w.success
                        ? (0, t.jsx)("div", {
                            className:
                              "p-4 bg-muted rounded-md whitespace-pre-wrap",
                            children: w.answer,
                          })
                        : (0, t.jsxs)("div", {
                            className: "text-red-500",
                            children: [
                              "Error: ",
                              w.error || "Unknown error occurred",
                            ],
                          }),
                    ],
                  }),
              ],
            }),
            (0, t.jsxs)(d.wL, {
              className: "flex justify-between",
              children: [
                (0, t.jsx)(c.$, {
                  variant: "outline",
                  onClick: () => {
                    s(null), h(""), x(""), b(null);
                  },
                  children: "Clear",
                }),
                (0, t.jsx)(c.$, {
                  onClick: r ? v : N,
                  disabled: f || (!e && !r) || !g,
                  children: f
                    ? (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)(a.A, {
                            className: "mr-2 h-4 w-4 animate-spin",
                          }),
                          "Processing...",
                        ],
                      })
                    : (0, t.jsx)(t.Fragment, {
                        children: r
                          ? (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                                "Process URL",
                              ],
                            })
                          : (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                                "Process Document",
                              ],
                            }),
                      }),
                }),
              ],
            }),
          ],
        });
      }
    },
    43673: (e, s, r) => {
      "use strict";
      r.d(s, { MistralOcrUploader: () => p });
      var t = r(30602),
        a = r(71188),
        n = r(44371),
        l = r(85218),
        i = r(5271),
        c = r(77413),
        d = r(4401),
        o = r(60070),
        m = r(47482),
        u = r(14985);
      function p() {
        let e = (0, u.Iw)(),
          { toast: s } = (0, m.d)(),
          [r, p] = (0, l.useState)(null),
          [h, g] = (0, l.useState)({ status: "idle", message: "" }),
          x = async () => {
            if (!r) return;
            g({ status: "getting_user", message: "Starting upload..." });
            let t = null;
            try {
              let {
                data: { user: a },
                error: n,
              } = await e.auth.getUser();
              if (n || !a)
                throw Error(
                  (null == n ? void 0 : n.message) || "User not authenticated.",
                );
              g({
                status: "creating_record",
                message: "Creating document record...",
              });
              let l = {
                  owner_id: a.id,
                  name: r.name,
                  file_size: r.size,
                  mime_type: r.type,
                  status: "uploading",
                },
                { data: i, error: c } = await e
                  .from("documents")
                  .insert(l)
                  .select("id")
                  .single();
              if (c || !(null == i ? void 0 : i.id))
                throw (
                  (console.error("DB Insert Error Details:", c),
                  Error(
                    (null == c ? void 0 : c.message) ||
                      "Failed to create document record.",
                  ))
                );
              (t = i.id),
                g({
                  status: "uploading",
                  message: "Uploading file to secure storage...",
                });
              let d = "".concat(a.id, "/").concat(t, "/").concat(r.name),
                { error: o } = await e.storage.from("documents").upload(d, r);
              if (o)
                throw (
                  (console.warn(
                    "Upload failed for doc ".concat(
                      t,
                      ", attempting DB cleanup.",
                    ),
                  ),
                  await e.from("documents").delete().eq("id", t),
                  (t = null),
                  Error(o.message || "Failed to upload file."))
                );
              g({
                status: "updating_record",
                message: "Finalizing document record...",
              });
              let { error: m } = await e
                .from("documents")
                .update({ file_path: d, status: "uploaded" })
                .eq("id", t);
              if (m)
                throw (
                  (console.error(
                    "Failed to update doc ".concat(
                      t,
                      " status after successful upload:",
                    ),
                    m,
                  ),
                  Error(
                    m.message ||
                      "Failed to update document record after upload.",
                  ))
                );
              g({
                status: "triggering",
                message: "Initiating processing workflow...",
              });
              let u = await fetch("/api/documents/process", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    documentId: t,
                    filePath: d,
                    fileType: r.type,
                  }),
                }),
                p = await u.json();
              if (!u.ok || !p.success)
                throw (
                  (console.error(
                    "Failed to trigger processing via API for doc ".concat(
                      t,
                      ":",
                    ),
                    p.error,
                  ),
                  await e
                    .from("documents")
                    .update({
                      status: "processing_failed",
                      status_message: p.error || "Failed to trigger processing",
                    })
                    .eq("id", t),
                  Error(p.error || "Failed to trigger document processing."))
                );
              let h = p.eventId
                ? "Upload complete! Processing started (Event ID: ".concat(
                    p.eventId,
                    ").",
                  )
                : "Upload complete! Document verified, processing trigger temporarily disabled.";
              g({ status: "success", message: h }),
                s({
                  title: "Upload Successful",
                  description: "Document processing has started.",
                });
            } catch (r) {
              console.error("Error during document upload process:", r);
              let e = r instanceof Error ? r.message : "Unknown error occurred";
              g({ status: "error", message: "Upload failed", error: e }),
                s({
                  title: "Upload Failed",
                  description: e,
                  variant: "destructive",
                });
            } finally {
            }
          },
          f = [
            "getting_user",
            "creating_record",
            "uploading",
            "updating_record",
            "triggering",
          ].includes(h.status);
        return (0, t.jsxs)(c.Zp, {
          className: "w-full max-w-lg mx-auto",
          children: [
            (0, t.jsxs)(c.aR, {
              children: [
                (0, t.jsx)(c.ZB, {
                  children: "Upload Document for Processing",
                }),
                (0, t.jsx)(c.BT, {
                  children:
                    "Select a document (PDF, PNG, JPG, TIFF) to upload and start the processing pipeline.",
                }),
              ],
            }),
            (0, t.jsxs)(c.Wu, {
              className: "space-y-6",
              children: [
                (0, t.jsxs)("div", {
                  className: "grid w-full gap-2",
                  children: [
                    (0, t.jsx)(o.J, {
                      htmlFor: "file",
                      children: "Select Document",
                    }),
                    (0, t.jsx)(d.p, {
                      id: "file",
                      type: "file",
                      accept: ".pdf,.png,.jpg,.jpeg,.tiff,.tif",
                      onChange: (e) => {
                        e.target.files &&
                          e.target.files[0] &&
                          (p(e.target.files[0]),
                          g({ status: "idle", message: "" }));
                      },
                      disabled: f,
                    }),
                    r &&
                      (0, t.jsxs)("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                          "Selected: ",
                          r.name,
                          " (",
                          Math.round(r.size / 1024),
                          " KB)",
                        ],
                      }),
                  ],
                }),
                ("idle" !== h.status || h.message) &&
                  (0, t.jsxs)("div", {
                    className: "mt-4 p-3 rounded-md bg-muted/50 border",
                    children: [
                      (0, t.jsx)("h3", {
                        className: "font-medium mb-1 text-sm",
                        children: "Upload Status",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-sm ".concat(
                          "error" === h.status
                            ? "text-red-600"
                            : "text-muted-foreground",
                        ),
                        children: h.message,
                      }),
                      h.error &&
                        (0, t.jsxs)("p", {
                          className: "text-xs text-red-700 mt-1",
                          children: ["Error details: ", h.error],
                        }),
                    ],
                  }),
              ],
            }),
            (0, t.jsxs)(c.wL, {
              className: "flex justify-between",
              children: [
                (0, t.jsx)(i.$, {
                  variant: "outline",
                  onClick: () => {
                    p(null), g({ status: "idle", message: "" });
                  },
                  disabled: f,
                  children: "Clear",
                }),
                (0, t.jsx)(i.$, {
                  onClick: x,
                  disabled: f || !r,
                  children: f
                    ? (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)(a.A, {
                            className: "mr-2 h-4 w-4 animate-spin",
                          }),
                          h.message || "Processing...",
                        ],
                      })
                    : (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                          "Upload and Process",
                        ],
                      }),
                }),
              ],
            }),
          ],
        });
      }
    },
    70083: (e, s, r) => {
      "use strict";
      r.d(s, { BatchProcessor: () => N });
      var t = r(30602),
        a = r(58261),
        n = r(44371),
        l = r(26536),
        i = r(5071),
        c = r(71188),
        d = r(62839),
        o = r(85218),
        m = r(57684),
        u = r(20435),
        p = r(26600),
        h = r(5271),
        g = r(77413),
        x = r(77590),
        f = r(33511),
        j = r(79430),
        w = r(43213);
      let b = {
        "application/pdf": [".pdf"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/tiff": [".tiff", ".tif"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
      };
      function N(e) {
        let { onComplete: s, maxFiles: r = 10, showControls: N = !0 } = e,
          [v, y] = (0, o.useState)([]),
          [F, P] = (0, o.useState)(!1),
          [S, k] = (0, o.useState)(!0),
          [C, E] = (0, o.useState)(!0),
          [T, U] = (0, o.useState)(null),
          D = (0, o.useCallback)(
            (e) => {
              let s = e.map((e) => ({
                id: "file-"
                  .concat(Date.now(), "-")
                  .concat(Math.random().toString(36).substring(2, 9)),
                file: e,
                status: "pending",
                progress: 0,
              }));
              y((e) => {
                let t = [...e, ...s];
                return t.length > r
                  ? (alert(
                      "You can only upload a maximum of ".concat(
                        r,
                        " files at once.",
                      ),
                    ),
                    [...e, ...s.slice(0, r - e.length)])
                  : t;
              });
            },
            [r],
          ),
          {
            getRootProps: A,
            getInputProps: _,
            isDragActive: I,
          } = (0, m.VB)({ onDrop: D, accept: b, maxFiles: r }),
          B = (e) => {
            y((s) => s.filter((s) => s.id !== e));
          },
          O = (e) =>
            e < 1024
              ? "".concat(e, " B")
              : e < 1048576
                ? "".concat((e / 1024).toFixed(1), " KB")
                : "".concat((e / 1048576).toFixed(1), " MB"),
          R = async () => {
            try {
              let e = await fetch("/api/ocr/check-batch", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ fileCount: v.length }),
                }),
                s = await e.json();
              if (!s.success || !s.allowed)
                return (
                  U({
                    exceeded: !0,
                    message: s.message || "Rate limit exceeded",
                    allowed: s.maxBatchSize,
                    tier: s.tier,
                  }),
                  !1
                );
              return !0;
            } catch (e) {
              return (
                console.error("Error checking batch processing:", e),
                U({
                  exceeded: !0,
                  message:
                    e instanceof Error
                      ? e.message
                      : "Unknown error checking batch limits",
                }),
                !1
              );
            }
          },
          z = async (e) => {
            try {
              y((s) =>
                s.map((s) =>
                  s.id === e.id
                    ? { ...s, status: "processing", progress: 10 }
                    : s,
                ),
              );
              let s = new FormData();
              s.append("file", e.file),
                s.append("preserveFormatting", S.toString()),
                s.append("detectTables", C.toString());
              let r = await fetch("/api/ocr/process-file-batch", {
                method: "POST",
                body: s,
              });
              if (!r.ok) {
                let e = await r.json();
                throw Error(e.error || r.statusText);
              }
              let t = await r.json();
              return (
                y((s) =>
                  s.map((s) =>
                    s.id === e.id
                      ? {
                          ...s,
                          status: "completed",
                          progress: 100,
                          documentId: t.documentId,
                          result: t.result,
                        }
                      : s,
                  ),
                ),
                {
                  success: !0,
                  fileId: e.id,
                  documentId: t.documentId,
                  result: t.result,
                }
              );
            } catch (s) {
              return (
                console.error(
                  "Error processing file ".concat(e.file.name, ":"),
                  s,
                ),
                y((r) =>
                  r.map((r) =>
                    r.id === e.id
                      ? {
                          ...r,
                          status: "failed",
                          progress: 0,
                          error:
                            s instanceof Error ? s.message : "Unknown error",
                        }
                      : r,
                  ),
                ),
                {
                  success: !1,
                  fileId: e.id,
                  error: s instanceof Error ? s.message : "Unknown error",
                }
              );
            }
          },
          L = async () => {
            if (0 !== v.length && (await R())) {
              P(!0);
              try {
                let e = 0,
                  r = v.filter((e) => "pending" === e.status),
                  t = [];
                for (; e < r.length; ) {
                  let s = r.slice(e, e + 3).map((e) => z(e)),
                    a = await Promise.all(s);
                  t.push(...a), (e += 3);
                }
                s && s(v);
              } catch (e) {
                console.error("Batch processing error:", e);
              } finally {
                P(!1);
              }
            }
          },
          q = () =>
            0 === v.length
              ? 0
              : Math.floor(v.reduce((e, s) => e + s.progress, 0) / v.length),
          J = (e) => {
            switch (e) {
              case "pending":
                return (0, t.jsx)(p.E, {
                  variant: "outline",
                  children: "Pending",
                });
              case "processing":
                return (0, t.jsx)(p.E, {
                  variant: "secondary",
                  children: "Processing",
                });
              case "completed":
                return (0, t.jsx)(p.E, {
                  variant: "success",
                  className: "bg-green-100 text-green-800",
                  children: "Completed",
                });
              case "failed":
                return (0, t.jsx)(p.E, {
                  variant: "destructive",
                  children: "Failed",
                });
              default:
                return null;
            }
          };
        return (0, t.jsxs)("div", {
          className: "space-y-4",
          children: [
            (null == T ? void 0 : T.exceeded) &&
              (0, t.jsxs)(u.Fc, {
                variant: "destructive",
                children: [
                  (0, t.jsx)(a.A, { className: "h-4 w-4" }),
                  (0, t.jsx)(u.XL, { children: "Rate Limit Exceeded" }),
                  (0, t.jsxs)(u.TN, {
                    children: [
                      T.message,
                      T.allowed &&
                        (0, t.jsxs)("p", {
                          className: "mt-2",
                          children: [
                            "Maximum allowed batch size: ",
                            T.allowed,
                            " files.",
                          ],
                        }),
                      T.tier &&
                        (0, t.jsxs)("p", {
                          className: "mt-1",
                          children: ["Current tier: ", T.tier],
                        }),
                    ],
                  }),
                ],
              }),
            (0, t.jsxs)(g.Zp, {
              children: [
                (0, t.jsx)(g.aR, {
                  children: (0, t.jsx)(g.ZB, {
                    children: "Batch Document Processing",
                  }),
                }),
                (0, t.jsxs)(g.Wu, {
                  className: "space-y-4",
                  children: [
                    (0, t.jsxs)("div", {
                      ...A(),
                      className:
                        "border-2 border-dashed rounded-md p-6 text-center cursor-pointer ".concat(
                          I ? "border-primary bg-muted/50" : "border-border",
                        ),
                      children: [
                        (0, t.jsx)("input", { ..._() }),
                        (0, t.jsxs)("div", {
                          className:
                            "flex flex-col items-center justify-center space-y-2",
                          children: [
                            (0, t.jsx)(n.A, {
                              className: "h-8 w-8 text-muted-foreground",
                            }),
                            (0, t.jsx)("p", {
                              className: "font-medium",
                              children: I
                                ? "Drop the files here..."
                                : "Drag & drop files, or click to select",
                            }),
                            (0, t.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children:
                                "Supported formats: PDF, JPG, PNG, TIFF, DOC, DOCX",
                            }),
                            (0, t.jsxs)("p", {
                              className: "text-xs text-muted-foreground",
                              children: ["Maximum ", r, " files"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    N &&
                      (0, t.jsxs)("div", {
                        className:
                          "flex flex-col gap-4 sm:flex-row sm:items-center",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "flex items-center space-x-2",
                            children: [
                              (0, t.jsx)(x.S, {
                                id: "preserveFormatting",
                                checked: S,
                                onCheckedChange: (e) => k(!0 === e),
                                disabled: F,
                              }),
                              (0, t.jsx)("label", {
                                htmlFor: "preserveFormatting",
                                className:
                                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                children: "Preserve Formatting",
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex items-center space-x-2",
                            children: [
                              (0, t.jsx)(x.S, {
                                id: "detectTables",
                                checked: C,
                                onCheckedChange: (e) => E(!0 === e),
                                disabled: F,
                              }),
                              (0, t.jsx)("label", {
                                htmlFor: "detectTables",
                                className:
                                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                children: "Detect Tables",
                              }),
                            ],
                          }),
                        ],
                      }),
                    v.length > 0 &&
                      (0, t.jsx)("div", {
                        className: "mt-4",
                        children: (0, t.jsx)(j.F, {
                          className: "h-[300px]",
                          children: (0, t.jsxs)(w.XI, {
                            children: [
                              (0, t.jsx)(w.A0, {
                                children: (0, t.jsxs)(w.Hj, {
                                  children: [
                                    (0, t.jsx)(w.nd, { children: "File" }),
                                    (0, t.jsx)(w.nd, { children: "Size" }),
                                    (0, t.jsx)(w.nd, { children: "Status" }),
                                    (0, t.jsx)(w.nd, { children: "Progress" }),
                                    (0, t.jsx)(w.nd, {
                                      className: "w-[80px]",
                                      children: "Actions",
                                    }),
                                  ],
                                }),
                              }),
                              (0, t.jsx)(w.BF, {
                                children: v.map((e) =>
                                  (0, t.jsxs)(
                                    w.Hj,
                                    {
                                      children: [
                                        (0, t.jsx)(w.nA, {
                                          className: "font-medium",
                                          children: (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center space-x-2",
                                            children: [
                                              (0, t.jsx)(l.A, {
                                                className: "h-4 w-4",
                                              }),
                                              (0, t.jsx)("span", {
                                                className:
                                                  "truncate max-w-[200px]",
                                                children: e.file.name,
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, t.jsx)(w.nA, {
                                          children: O(e.file.size),
                                        }),
                                        (0, t.jsx)(w.nA, {
                                          children: J(e.status),
                                        }),
                                        (0, t.jsxs)(w.nA, {
                                          children: [
                                            (0, t.jsx)("div", {
                                              className: "w-[100px]",
                                              children: (0, t.jsx)(f.k, {
                                                value: e.progress,
                                                className: "h-2",
                                                color:
                                                  "failed" === e.status
                                                    ? "bg-red-600"
                                                    : "completed" === e.status
                                                      ? "bg-green-600"
                                                      : void 0,
                                              }),
                                            }),
                                            e.error &&
                                              (0, t.jsx)("p", {
                                                className:
                                                  "text-xs text-red-600 mt-1 truncate max-w-[200px]",
                                                title: e.error,
                                                children: e.error,
                                              }),
                                          ],
                                        }),
                                        (0, t.jsx)(w.nA, {
                                          children: (0, t.jsx)(h.$, {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: () => B(e.id),
                                            disabled: F,
                                            children: (0, t.jsx)(i.A, {
                                              className: "h-4 w-4",
                                            }),
                                          }),
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              }),
                            ],
                          }),
                        }),
                      }),
                    v.length > 0 &&
                      F &&
                      (0, t.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "flex justify-between text-sm",
                            children: [
                              (0, t.jsx)("span", {
                                children: "Overall Progress:",
                              }),
                              (0, t.jsxs)("span", { children: [q(), "%"] }),
                            ],
                          }),
                          (0, t.jsx)(f.k, { value: q(), className: "h-2" }),
                        ],
                      }),
                  ],
                }),
                v.length > 0 &&
                  (0, t.jsxs)(g.wL, {
                    className: "flex justify-between",
                    children: [
                      (0, t.jsx)(h.$, {
                        variant: "outline",
                        onClick: () => {
                          y([]), U(null);
                        },
                        disabled: F,
                        children: "Clear All",
                      }),
                      (0, t.jsx)(h.$, {
                        onClick: L,
                        disabled:
                          F ||
                          0 === v.length ||
                          v.every((e) => "pending" !== e.status),
                        children: F
                          ? (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsx)(c.A, {
                                  className: "mr-2 h-4 w-4 animate-spin",
                                }),
                                "Processing...",
                              ],
                            })
                          : (0, t.jsxs)(t.Fragment, {
                              children: [
                                "Process ",
                                v.filter((e) => "pending" === e.status).length,
                                " Files",
                              ],
                            }),
                      }),
                    ],
                  }),
              ],
            }),
            v.some((e) => "completed" === e.status) &&
              (0, t.jsxs)(g.Zp, {
                children: [
                  (0, t.jsx)(g.aR, {
                    children: (0, t.jsx)(g.ZB, {
                      children: "Processing Results",
                    }),
                  }),
                  (0, t.jsx)(g.Wu, {
                    children: (0, t.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex space-x-2",
                          children: [
                            (0, t.jsx)(d.A, {
                              className: "h-5 w-5 text-green-600",
                            }),
                            (0, t.jsxs)("span", {
                              children: [
                                "Successfully processed: ",
                                v.filter((e) => "completed" === e.status)
                                  .length,
                                " files",
                              ],
                            }),
                          ],
                        }),
                        v.some((e) => "failed" === e.status) &&
                          (0, t.jsxs)("div", {
                            className: "flex space-x-2",
                            children: [
                              (0, t.jsx)(a.A, {
                                className: "h-5 w-5 text-red-600",
                              }),
                              (0, t.jsxs)("span", {
                                children: [
                                  "Failed: ",
                                  v.filter((e) => "failed" === e.status).length,
                                  " files",
                                ],
                              }),
                            ],
                          }),
                        v.some(
                          (e) =>
                            "pending" === e.status || "processing" === e.status,
                        ) &&
                          (0, t.jsxs)("div", {
                            className: "flex space-x-2",
                            children: [
                              (0, t.jsx)(c.A, {
                                className: "h-5 w-5 animate-spin",
                              }),
                              (0, t.jsxs)("span", {
                                children: [
                                  "Pending/Processing: ",
                                  v.filter(
                                    (e) =>
                                      "pending" === e.status ||
                                      "processing" === e.status,
                                  ).length,
                                  " files",
                                ],
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
    },
    83713: (e, s, r) => {
      Promise.resolve().then(r.bind(r, 70083)),
        Promise.resolve().then(r.bind(r, 24124)),
        Promise.resolve().then(r.bind(r, 43673)),
        Promise.resolve().then(r.bind(r, 86697)),
        Promise.resolve().then(r.bind(r, 36494));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [4223, 6593, 3209, 7358], () => s(83713)), (_N_E = e.O());
  },
]);
