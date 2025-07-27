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
    (e._sentryDebugIds[t] = "18c54604-a977-4019-b00f-b6a9deb108a5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-18c54604-a977-4019-b00f-b6a9deb108a5"));
} catch (e) {}
("use strict");
(exports.id = 7482),
  (exports.ids = [7482]),
  (exports.modules = {
    4839: (e, t, a) => {
      a.d(t, { l: () => r });
      var s = a(24277),
        i = a(14567),
        r = (e, t, a) =>
          (0, s.N)(e, async (s, r) => {
            let n = s;
            if ("header" === e && t instanceof i.bv) {
              let e = Object.fromEntries(
                Object.keys(t.shape).map((e) => [e.toLowerCase(), e]),
              );
              n = Object.fromEntries(
                Object.entries(s).map(([t, a]) => [e[t] || t, a]),
              );
            }
            let o = await t.safeParseAsync(n);
            if (a) {
              let t = await a({ data: n, ...o, target: e }, r);
              if (t) {
                if (t instanceof Response) return t;
                if ("response" in t) return t.response;
              }
            }
            return o.success ? o.data : r.json(o, 400);
          });
    },
    24277: (e, t, a) => {
      a.d(t, { N: () => u });
      var s = a(62745),
        i = a(54016),
        r = (e, t) =>
          new Response(e, { headers: { "Content-Type": t } }).formData(),
        n = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
        o = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
        d =
          /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
        u = (e, t) => async (a, u) => {
          let c = {},
            m = a.req.header("Content-Type");
          switch (e) {
            case "json":
              if (!m || !n.test(m)) break;
              try {
                c = await a.req.json();
              } catch {
                throw new i.y(400, {
                  message: "Malformed JSON in request body",
                });
              }
              break;
            case "form": {
              let e;
              if (!m || !(o.test(m) || d.test(m))) break;
              if (a.req.bodyCache.formData) e = await a.req.bodyCache.formData;
              else
                try {
                  let t = await a.req.arrayBuffer();
                  (e = await r(t, m)), (a.req.bodyCache.formData = e);
                } catch (t) {
                  let e = "Malformed FormData request.";
                  throw (
                    ((e +=
                      t instanceof Error ? ` ${t.message}` : ` ${String(t)}`),
                    new i.y(400, { message: e }))
                  );
                }
              let t = {};
              e.forEach((e, a) => {
                a.endsWith("[]")
                  ? (t[a] ??= []).push(e)
                  : Array.isArray(t[a])
                    ? t[a].push(e)
                    : a in t
                      ? (t[a] = [t[a], e])
                      : (t[a] = e);
              }),
                (c = t);
              break;
            }
            case "query":
              c = Object.fromEntries(
                Object.entries(a.req.queries()).map(([e, t]) =>
                  1 === t.length ? [e, t[0]] : [e, t],
                ),
              );
              break;
            case "param":
              c = a.req.param();
              break;
            case "header":
              c = a.req.header();
              break;
            case "cookie":
              c = (0, s.Ri)(a);
          }
          let p = await t(c, a);
          if (p instanceof Response) return p;
          a.req.addValidatedData(e, p), await u();
        };
    },
    54016: (e, t, a) => {
      a.d(t, { y: () => s });
      var s = class extends Error {
        res;
        status;
        constructor(e = 500, t) {
          super(t?.message, { cause: t?.cause }),
            (this.res = t?.res),
            (this.status = e);
        }
        getResponse() {
          return this.res
            ? new Response(this.res.body, {
                status: this.status,
                headers: this.res.headers,
              })
            : new Response(this.message, { status: this.status });
        }
      };
    },
    62745: (e, t, a) => {
      a.d(t, { Yj: () => l, Ri: () => m, TV: () => p });
      var s = a(79533),
        i = { name: "HMAC", hash: "SHA-256" },
        r = async (e) => {
          let t = "string" == typeof e ? new TextEncoder().encode(e) : e;
          return await crypto.subtle.importKey("raw", t, i, !1, [
            "sign",
            "verify",
          ]);
        },
        n = /^[\w!#$%&'*.^`|~+-]+$/,
        o = /^[ !#-:<-[\]-~]*$/,
        d = (e, t) => {
          if (t && -1 === e.indexOf(t)) return {};
          let a = e.trim().split(";"),
            i = {};
          for (let e of a) {
            let a = (e = e.trim()).indexOf("=");
            if (-1 === a) continue;
            let r = e.substring(0, a).trim();
            if ((t && t !== r) || !n.test(r)) continue;
            let d = e.substring(a + 1).trim();
            if (
              (d.startsWith('"') && d.endsWith('"') && (d = d.slice(1, -1)),
              o.test(d) && ((i[r] = (0, s.Rp)(d)), t))
            )
              break;
          }
          return i;
        },
        u = (e, t, a = {}) => {
          let s = `${e}=${t}`;
          if (e.startsWith("__Secure-") && !a.secure)
            throw Error("__Secure- Cookie must have Secure attributes");
          if (e.startsWith("__Host-")) {
            if (!a.secure)
              throw Error("__Host- Cookie must have Secure attributes");
            if ("/" !== a.path)
              throw Error('__Host- Cookie must have Path attributes with "/"');
            if (a.domain)
              throw Error("__Host- Cookie must not have Domain attributes");
          }
          if (a && "number" == typeof a.maxAge && a.maxAge >= 0) {
            if (a.maxAge > 3456e4)
              throw Error(
                "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.",
              );
            s += `; Max-Age=${0 | a.maxAge}`;
          }
          if (
            (a.domain && "host" !== a.prefix && (s += `; Domain=${a.domain}`),
            a.path && (s += `; Path=${a.path}`),
            a.expires)
          ) {
            if (a.expires.getTime() - Date.now() > 3456e7)
              throw Error(
                "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.",
              );
            s += `; Expires=${a.expires.toUTCString()}`;
          }
          if (
            (a.httpOnly && (s += "; HttpOnly"),
            a.secure && (s += "; Secure"),
            a.sameSite &&
              (s += `; SameSite=${a.sameSite.charAt(0).toUpperCase() + a.sameSite.slice(1)}`),
            a.priority && (s += `; Priority=${a.priority}`),
            a.partitioned)
          ) {
            if (!a.secure)
              throw Error("Partitioned Cookie must have Secure attributes");
            s += "; Partitioned";
          }
          return s;
        },
        c = (e, t, a) => u(e, (t = encodeURIComponent(t)), a),
        m = (e, t, a) => {
          let s = e.req.raw.headers.get("Cookie");
          if ("string" == typeof t) {
            if (!s) return;
            let e = t;
            return (
              "secure" === a
                ? (e = "__Secure-" + t)
                : "host" === a && (e = "__Host-" + t),
              d(s, e)[e]
            );
          }
          return s ? d(s) : {};
        },
        p = (e, t, a, s) => {
          let i;
          (i =
            s?.prefix === "secure"
              ? c("__Secure-" + t, a, { path: "/", ...s, secure: !0 })
              : s?.prefix === "host"
                ? c("__Host-" + t, a, {
                    ...s,
                    path: "/",
                    secure: !0,
                    domain: void 0,
                  })
                : c(t, a, { path: "/", ...s })),
            e.header("Set-Cookie", i, { append: !0 });
        },
        l = (e, t, a) => {
          let s = m(e, t, a?.prefix);
          return p(e, t, "", { ...a, maxAge: 0 }), s;
        };
    },
    62817: (e, t, a) => {
      a.d(t, { VV: () => s, X3: () => i, di: () => r });
      var s = (function (e) {
          return (
            (e.DRAFT = "draft"),
            (e.SUBMITTED = "submitted"),
            (e.IN_REVIEW = "in_review"),
            (e.ADDITIONAL_INFO_REQUIRED = "additional_info_required"),
            (e.APPROVED = "approved"),
            (e.REJECTED = "rejected"),
            (e.COMPLETED = "completed"),
            (e.CANCELLED = "cancelled"),
            e
          );
        })({}),
        i = (function (e) {
          return (
            (e.ASYLUM = "asylum"),
            (e.VISA_APPLICATION = "visa_application"),
            (e.WORK_PERMIT = "work_permit"),
            (e.FAMILY_SPONSORSHIP = "family_sponsorship"),
            (e.CITIZENSHIP = "citizenship"),
            (e.RESIDENCY = "residency"),
            (e.REFUGEE = "refugee"),
            (e.OTHER = "other"),
            e
          );
        })({});
      class r {
        constructor(e) {
          (this.id = e.id),
            (this.caseNumber = e.caseNumber),
            (this.title = e.title),
            (this.description = e.description ?? null),
            (this.status = e.status ?? "draft"),
            (this.caseType = e.caseType),
            (this.clientId = e.clientId),
            (this.timeline = e.timeline ?? []),
            (this.assignments = e.assignments ?? []),
            (this.priority = e.priority ?? "medium"),
            (this.dueDate = e.dueDate ? new Date(e.dueDate) : null),
            (this.tags = e.tags ?? []),
            (this.metadata = e.metadata ?? {}),
            (this.createdAt = e.createdAt ? new Date(e.createdAt) : new Date()),
            (this.updatedAt = e.updatedAt ? new Date(e.updatedAt) : new Date());
        }
        isUserAssigned(e) {
          return this.assignments.some((t) => t.userId === e);
        }
        getUserRole(e) {
          let t = this.assignments.find((t) => t.userId === e);
          return t ? t.role : null;
        }
        userHasRole(e, t) {
          let a = this.getUserRole(e);
          return !!a && (Array.isArray(t) ? t.includes(a) : a === t);
        }
        changeStatus(e, t, a) {
          let s = {
            id: crypto.randomUUID(),
            eventType: "status_change",
            title: `Status changed to ${e}`,
            description:
              a || `Case status was changed from ${this.status} to ${e}`,
            createdBy: t,
            timestamp: new Date(),
            metadata: { previousStatus: this.status, newStatus: e },
          };
          return new r({
            ...this,
            status: e,
            timeline: [...this.timeline, s],
            updatedAt: new Date(),
          });
        }
        assignUser(e, t, a) {
          if (this.assignments.find((a) => a.userId === e && a.role === t))
            return this;
          let s = { userId: e, role: t, assignedAt: new Date(), assignedBy: a },
            i = {
              id: crypto.randomUUID(),
              eventType: "user_assigned",
              title: `User assigned as ${t}`,
              description: `User ${e} was assigned to the case as ${t}`,
              createdBy: a,
              timestamp: new Date(),
              metadata: { userId: e, role: t },
            };
          return new r({
            ...this,
            assignments: [...this.assignments, s],
            timeline: [...this.timeline, i],
            updatedAt: new Date(),
          });
        }
        removeAssignment(e, t, a) {
          let s = this.assignments.find((t) => t.userId === e);
          if (!s) return this;
          let i = {
            id: crypto.randomUUID(),
            eventType: "user_unassigned",
            title: "User unassigned",
            description: a || `User ${e} was removed from the case`,
            createdBy: t,
            timestamp: new Date(),
            metadata: { userId: e, previousRole: s.role },
          };
          return new r({
            ...this,
            assignments: this.assignments.filter((t) => t.userId !== e),
            timeline: [...this.timeline, i],
            updatedAt: new Date(),
          });
        }
        addTimelineEvent(e) {
          let t = { ...e, id: crypto.randomUUID(), timestamp: new Date() };
          return new r({
            ...this,
            timeline: [...this.timeline, t],
            updatedAt: new Date(),
          });
        }
        update(e, t) {
          let a = {
            id: crypto.randomUUID(),
            eventType: "case_updated",
            title: "Case details updated",
            description: "Case details were updated",
            createdBy: t,
            timestamp: new Date(),
            metadata: { updatedFields: Object.keys(e) },
          };
          return new r({
            ...this,
            ...e,
            timeline: [...this.timeline, a],
            updatedAt: new Date(),
          });
        }
        toObject() {
          return {
            id: this.id,
            caseNumber: this.caseNumber,
            title: this.title,
            description: this.description,
            status: this.status,
            caseType: this.caseType,
            clientId: this.clientId,
            timeline: this.timeline.map((e) => ({
              ...e,
              timestamp: e.timestamp.toISOString(),
            })),
            assignments: this.assignments.map((e) => ({
              ...e,
              assignedAt: e.assignedAt.toISOString(),
            })),
            priority: this.priority,
            dueDate: this.dueDate?.toISOString() || null,
            tags: this.tags,
            metadata: this.metadata,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
          };
        }
        static fromDatabase(e) {
          return new r({
            id: e.id,
            caseNumber: e.case_number,
            title: e.title,
            description: e.description,
            status: e.status,
            caseType: e.case_type,
            clientId: e.client_id,
            timeline: e.timeline.map((e) => ({
              ...e,
              timestamp: new Date(e.timestamp),
            })),
            assignments: e.assignments.map((e) => ({
              ...e,
              assignedAt: new Date(e.assigned_at),
            })),
            priority: e.priority,
            dueDate: e.due_date,
            tags: e.tags,
            metadata: e.metadata,
            createdAt: e.created_at,
            updatedAt: e.updated_at,
          });
        }
      }
    },
    63258: (e, t, a) => {
      a.d(t, { U: () => i });
      var s = a(62817);
      class i {
        generateCaseNumber(e) {
          let t = new Date(),
            a = t.getFullYear().toString().slice(2),
            s = (t.getMonth() + 1).toString().padStart(2, "0"),
            i = t.getDate().toString().padStart(2, "0"),
            r = Date.now().toString().slice(-6),
            n = this.getCaseTypePrefix(e);
          return `${n}-${a}${s}${i}-${r}`;
        }
        getCaseTypePrefix(e) {
          switch (e) {
            case s.X3.ASYLUM:
              return "ASY";
            case s.X3.VISA_APPLICATION:
              return "VISA";
            case s.X3.WORK_PERMIT:
              return "WORK";
            case s.X3.FAMILY_SPONSORSHIP:
              return "FAM";
            case s.X3.CITIZENSHIP:
              return "CIT";
            case s.X3.RESIDENCY:
              return "RES";
            case s.X3.REFUGEE:
              return "REF";
            case s.X3.OTHER:
              return "OTH";
            default:
              return "CASE";
          }
        }
        isValidStatusTransition(e, t) {
          let a = {
            [s.VV.DRAFT]: [s.VV.SUBMITTED, s.VV.CANCELLED],
            [s.VV.SUBMITTED]: [s.VV.IN_REVIEW, s.VV.CANCELLED],
            [s.VV.IN_REVIEW]: [
              s.VV.ADDITIONAL_INFO_REQUIRED,
              s.VV.APPROVED,
              s.VV.REJECTED,
              s.VV.CANCELLED,
            ],
            [s.VV.ADDITIONAL_INFO_REQUIRED]: [s.VV.IN_REVIEW, s.VV.CANCELLED],
            [s.VV.APPROVED]: [s.VV.COMPLETED, s.VV.CANCELLED],
            [s.VV.REJECTED]: [s.VV.DRAFT, s.VV.CANCELLED],
            [s.VV.COMPLETED]: [s.VV.CANCELLED],
            [s.VV.CANCELLED]: [s.VV.DRAFT],
          };
          return a[e]?.includes(t) || !1;
        }
        canPerformAction(e, t) {
          return (
            !!e &&
            ({
              owner: [
                "view",
                "edit",
                "delete",
                "assign",
                "change_status",
                "add_document",
                "add_comment",
              ],
              collaborator: [
                "view",
                "edit",
                "assign",
                "change_status",
                "add_document",
                "add_comment",
              ],
              reviewer: ["view", "change_status", "add_comment"],
              client: ["view", "add_document", "add_comment"],
            }[e]?.includes(t) ||
              !1)
          );
        }
        getRequiredDocuments(e) {
          return (
            {
              [s.X3.ASYLUM]: [
                "Asylum Application (Form I-589)",
                "Identity Documents",
                "Evidence of Persecution",
                "Country Conditions Reports",
              ],
              [s.X3.VISA_APPLICATION]: [
                "Visa Application Form",
                "Passport",
                "Photographs",
                "Financial Documents",
                "Invitation Letter",
              ],
              [s.X3.WORK_PERMIT]: [
                "Employment Authorization (Form I-765)",
                "Identity Documents",
                "Evidence of Eligibility",
              ],
              [s.X3.FAMILY_SPONSORSHIP]: [
                "Petition for Relative (Form I-130)",
                "Birth Certificates",
                "Marriage Certificate",
                "Financial Support Evidence",
              ],
              [s.X3.CITIZENSHIP]: [
                "Naturalization Application (Form N-400)",
                "Permanent Resident Card",
                "Tax Returns",
                "Travel History",
              ],
              [s.X3.RESIDENCY]: [
                "Green Card Application (Form I-485)",
                "Medical Examination",
                "Birth Certificate",
                "Financial Support Evidence",
              ],
              [s.X3.REFUGEE]: [
                "Refugee Application",
                "Identity Documents",
                "Evidence of Refugee Status",
              ],
              [s.X3.OTHER]: [],
            }[e] || []
          );
        }
        calculateCompletionPercentage(e, t) {
          let a = {
              [s.VV.DRAFT]: 0.2,
              [s.VV.SUBMITTED]: 0.4,
              [s.VV.IN_REVIEW]: 0.6,
              [s.VV.ADDITIONAL_INFO_REQUIRED]: 0.7,
              [s.VV.APPROVED]: 0.9,
              [s.VV.REJECTED]: 1,
              [s.VV.COMPLETED]: 1,
              [s.VV.CANCELLED]: 0,
            },
            i = this.getRequiredDocuments(e.caseType);
          return Math.min(
            Math.round(
              ((i.length > 0 ? (t.length / i.length) * 0.5 : 0.5) +
                0.5 * a[e.status]) *
                100,
            ),
            100,
          );
        }
        createDocumentEvent(e, t, a) {
          return {
            id: crypto.randomUUID(),
            eventType: "document_uploaded",
            title: "Document uploaded",
            description: `Document "${t}" was uploaded`,
            createdBy: a,
            timestamp: new Date(),
            metadata: { documentId: e, documentName: t },
          };
        }
        estimateProcessingTime(e) {
          return {
            [s.X3.ASYLUM]: { minDays: 180, maxDays: 730, averageDays: 365 },
            [s.X3.VISA_APPLICATION]: {
              minDays: 30,
              maxDays: 180,
              averageDays: 90,
            },
            [s.X3.WORK_PERMIT]: { minDays: 90, maxDays: 180, averageDays: 120 },
            [s.X3.FAMILY_SPONSORSHIP]: {
              minDays: 180,
              maxDays: 730,
              averageDays: 365,
            },
            [s.X3.CITIZENSHIP]: {
              minDays: 180,
              maxDays: 365,
              averageDays: 240,
            },
            [s.X3.RESIDENCY]: { minDays: 180, maxDays: 730, averageDays: 365 },
            [s.X3.REFUGEE]: { minDays: 180, maxDays: 730, averageDays: 365 },
            [s.X3.OTHER]: { minDays: 90, maxDays: 365, averageDays: 180 },
          }[e];
        }
      }
    },
  });
//# sourceMappingURL=7482.js.map
