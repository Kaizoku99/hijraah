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
    (e._sentryDebugIds[t] = "6fdaa708-d189-4ec5-9282-cf8efd2b3c46"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6fdaa708-d189-4ec5-9282-cf8efd2b3c46"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5166),
    (e.ids = [5166]),
    (e.modules = {
      6934: () => {},
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8963: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44870: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      72906: (e, t, i) => {
        "use strict";
        i.r(t),
          i.d(t, {
            patchFetch: () => Y,
            routeModule: () => F,
            serverHooks: () => X,
            workAsyncStorage: () => z,
            workUnitAsyncStorage: () => N,
          });
        var r = {};
        i.r(r),
          i.d(r, {
            DELETE: () => k,
            GET: () => b,
            HEAD: () => O,
            OPTIONS: () => M,
            PATCH: () => E,
            POST: () => j,
            PUT: () => R,
          });
        var a = i(94168),
          s = i(51293),
          o = i(64588),
          n = i(63033),
          d = i(4839),
          c = i(77719),
          p = i(43774),
          l = i(58342),
          u = i(62817);
        class m {
          constructor(e) {
            (this.id = e.id),
              (this.title = e.title),
              (this.description = e.description),
              (this.caseId = e.caseId),
              (this.caseType = e.caseType),
              (this.userId = e.userId),
              (this.phases = e.phases || []),
              (this.startDate = e.startDate
                ? new Date(e.startDate)
                : new Date()),
              (this.targetEndDate = e.targetEndDate
                ? new Date(e.targetEndDate)
                : new Date()),
              (this.estimatedEndDate = e.estimatedEndDate
                ? new Date(e.estimatedEndDate)
                : new Date()),
              (this.completionPercentage = e.completionPercentage || 0),
              (this.lastUpdated = e.lastUpdated
                ? new Date(e.lastUpdated)
                : new Date()),
              (this.metadata = e.metadata || {});
          }
          calculateCompletionPercentage() {
            return 0 === this.phases.length
              ? 0
              : Math.round(
                  this.phases.reduce((e, t) => e + t.completionPercentage, 0) /
                    this.phases.length,
                );
          }
          getCurrentPhase() {
            let e = this.phases.filter((e) => "in_progress" === e.status);
            return e.length > 0
              ? e[0]
              : this.phases
                  .filter((e) => "not_started" === e.status)
                  .sort(
                    (e, t) => e.startDate.getTime() - t.startDate.getTime(),
                  )[0] || null;
          }
          getCurrentMilestone() {
            let e = this.getCurrentPhase();
            if (!e) return null;
            let t = e.milestones.filter((e) => "in_progress" === e.status);
            return t.length > 0
              ? t[0]
              : e.milestones
                  .filter((e) => "not_started" === e.status)
                  .sort(
                    (e, t) => e.startDate.getTime() - t.startDate.getTime(),
                  )[0] || null;
          }
          hasOverdueMilestones() {
            return this.phases.some((e) =>
              e.milestones.some((e) => "overdue" === e.status),
            );
          }
          getAllMilestones() {
            return this.phases.flatMap((e) => e.milestones);
          }
          updateMilestoneStatus(e, t, i) {
            let r = this.phases.map((r) => {
              let a = r.milestones.findIndex((t) => t.id === e);
              if (-1 !== a) {
                let e = [...r.milestones];
                e[a] = { ...e[a], status: t, completionPercentage: i };
                let s =
                    e.reduce((e, t) => e + t.completionPercentage, 0) /
                    e.length,
                  o = r.status,
                  n = e.every((e) => "completed" === e.status),
                  d = e.some((e) => "in_progress" === e.status),
                  c = e.some((e) => "blocked" === e.status),
                  p = e.some((e) => "overdue" === e.status);
                return (
                  n
                    ? (o = "completed")
                    : c
                      ? (o = "blocked")
                      : p
                        ? (o = "overdue")
                        : d && (o = "in_progress"),
                  {
                    ...r,
                    milestones: e,
                    completionPercentage: Math.round(s),
                    status: o,
                  }
                );
              }
              return r;
            });
            return new m({
              ...this,
              phases: r,
              lastUpdated: new Date(),
              completionPercentage: this.calculateCompletionPercentage(),
            });
          }
          toObject() {
            return {
              id: this.id,
              title: this.title,
              description: this.description,
              caseId: this.caseId,
              caseType: this.caseType,
              userId: this.userId,
              phases: this.phases.map((e) => ({
                ...e,
                startDate: e.startDate.toISOString(),
                endDate: e.endDate.toISOString(),
                milestones: e.milestones.map((e) => ({
                  ...e,
                  startDate: e.startDate.toISOString(),
                  endDate: e.endDate.toISOString(),
                })),
              })),
              startDate: this.startDate.toISOString(),
              targetEndDate: this.targetEndDate.toISOString(),
              estimatedEndDate: this.estimatedEndDate.toISOString(),
              completionPercentage: this.completionPercentage,
              lastUpdated: this.lastUpdated.toISOString(),
              metadata: this.metadata,
            };
          }
          static fromDatabase(e) {
            return new m({
              id: e.id,
              title: e.title,
              description: e.description,
              caseId: e.case_id,
              caseType: e.case_type,
              userId: e.user_id,
              phases: Array.isArray(e.phases)
                ? e.phases.map((e) => ({
                    ...e,
                    startDate: new Date(e.start_date),
                    endDate: new Date(e.end_date),
                    milestones: Array.isArray(e.milestones)
                      ? e.milestones.map((e) => ({
                          ...e,
                          startDate: new Date(e.start_date),
                          endDate: new Date(e.end_date),
                        }))
                      : [],
                  }))
                : [],
              startDate: e.start_date,
              targetEndDate: e.target_end_date,
              estimatedEndDate: e.estimated_end_date,
              completionPercentage: e.completion_percentage,
              lastUpdated: e.last_updated,
              metadata: e.metadata || {},
            });
          }
        }
        var h = i(63258);
        class y {
          constructor(e) {
            this.caseService = e;
          }
          generateRoadmap(e, t, i) {
            let r = {
                urgency: i?.urgency || "normal",
                complexity: i?.complexity || "standard",
                priorityDocuments: i?.priorityDocuments || [],
              },
              a = this.generatePhases(e.caseType, r),
              {
                startDate: s,
                targetEndDate: o,
                estimatedEndDate: n,
              } = this.calculateTimeline(e.caseType, a, r);
            return new m({
              id: crypto.randomUUID(),
              title: `${this.getRoadmapTitle(e.caseType)} - ${e.caseNumber}`,
              description: this.getRoadmapDescription(e.caseType),
              caseId: e.id,
              caseType: e.caseType,
              userId: t,
              phases: a,
              startDate: s,
              targetEndDate: o,
              estimatedEndDate: n,
              completionPercentage: 0,
              lastUpdated: new Date(),
              metadata: { customizationParams: r, generated: !0 },
            });
          }
          getRoadmapTitle(e) {
            switch (e) {
              case u.X3.ASYLUM:
                return "Asylum Application Roadmap";
              case u.X3.VISA_APPLICATION:
                return "Visa Application Roadmap";
              case u.X3.WORK_PERMIT:
                return "Work Permit Roadmap";
              case u.X3.FAMILY_SPONSORSHIP:
                return "Family Sponsorship Roadmap";
              case u.X3.CITIZENSHIP:
                return "Citizenship Application Roadmap";
              case u.X3.RESIDENCY:
                return "Residency Application Roadmap";
              case u.X3.REFUGEE:
                return "Refugee Application Roadmap";
              case u.X3.OTHER:
              default:
                return "Immigration Process Roadmap";
            }
          }
          getRoadmapDescription(e) {
            switch (e) {
              case u.X3.ASYLUM:
                return "Step-by-step timeline for your asylum application process. Follow this roadmap to navigate through application preparation, filing, interview, and decision phases.";
              case u.X3.VISA_APPLICATION:
                return "Personalized timeline for your visa application. This roadmap outlines document preparation, submission, interview, and approval phases.";
              case u.X3.WORK_PERMIT:
                return "Detailed roadmap for your work permit application. Follow these steps to prepare, file, and obtain your employment authorization.";
              case u.X3.FAMILY_SPONSORSHIP:
                return "Comprehensive timeline for your family sponsorship process. This roadmap guides you through petition filing, documentation, interview, and approval phases.";
              case u.X3.CITIZENSHIP:
                return "Step-by-step guide for your citizenship application. Follow this roadmap to navigate through application, biometrics, interview, test, and oath ceremony.";
              case u.X3.RESIDENCY:
                return "Detailed timeline for your permanent residency application. This roadmap outlines the process from petition to green card approval.";
              case u.X3.REFUGEE:
                return "Personalized roadmap for your refugee application process. Follow these steps from initial screening to final settlement.";
              case u.X3.OTHER:
                return "Customized timeline for your immigration process. This roadmap provides a step-by-step guide to navigate through your specific case.";
              default:
                return "Personalized timeline for your immigration process. Follow this roadmap to navigate through all phases efficiently.";
            }
          }
          generatePhases(e, t) {
            let i = this.getPhaseConfiguration(e);
            return this.adjustPhaseTimings(i, t).map((i) => {
              let r = this.generateMilestones(
                i.id,
                i.milestoneTypes,
                i.startDate,
                i.endDate,
                e,
                t,
              );
              return {
                id: i.id,
                title: i.title,
                description: i.description,
                startDate: i.startDate,
                endDate: i.endDate,
                status: "not_started",
                completionPercentage: 0,
                milestones: r,
                metadata: i.metadata || {},
              };
            });
          }
          getPhaseConfiguration(e) {
            let t = new Date(),
              i = [];
            switch (e) {
              case u.X3.ASYLUM:
                i.push(
                  {
                    id: crypto.randomUUID(),
                    title: "Preparation",
                    description:
                      "Gather all necessary documents and evidence for your asylum application.",
                    milestoneTypes: [
                      "document_collection",
                      "document_translation",
                      "form_preparation",
                    ],
                    startDate: t,
                    endDate: this.addDays(t, 30),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Application Filing",
                    description:
                      "Complete and submit your asylum application (Form I-589).",
                    milestoneTypes: [
                      "application_review",
                      "application_submission",
                      "receipt_notice",
                    ],
                    startDate: this.addDays(t, 31),
                    endDate: this.addDays(t, 45),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Biometrics and Interview",
                    description:
                      "Attend biometrics appointment and asylum interview.",
                    milestoneTypes: [
                      "biometrics_appointment",
                      "interview_preparation",
                      "interview",
                    ],
                    startDate: this.addDays(t, 46),
                    endDate: this.addDays(t, 180),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Decision and Next Steps",
                    description:
                      "Receive decision on your asylum application and take appropriate next steps.",
                    milestoneTypes: [
                      "decision_waiting",
                      "decision_response",
                      "post_decision_steps",
                    ],
                    startDate: this.addDays(t, 181),
                    endDate: this.addDays(t, 365),
                    metadata: { importance: "critical" },
                  },
                );
                break;
              case u.X3.VISA_APPLICATION:
                i.push(
                  {
                    id: crypto.randomUUID(),
                    title: "Preparation",
                    description:
                      "Gather all necessary documents for your visa application.",
                    milestoneTypes: [
                      "document_collection",
                      "document_verification",
                      "form_preparation",
                    ],
                    startDate: t,
                    endDate: this.addDays(t, 15),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Application Submission",
                    description: "Complete and submit your visa application.",
                    milestoneTypes: [
                      "application_review",
                      "fee_payment",
                      "application_submission",
                    ],
                    startDate: this.addDays(t, 16),
                    endDate: this.addDays(t, 30),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Interview and Processing",
                    description: "Prepare for and attend visa interview.",
                    milestoneTypes: [
                      "interview_preparation",
                      "interview",
                      "additional_processing",
                    ],
                    startDate: this.addDays(t, 31),
                    endDate: this.addDays(t, 90),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Decision and Travel",
                    description:
                      "Receive visa decision and prepare for travel.",
                    milestoneTypes: [
                      "decision_waiting",
                      "visa_issuance",
                      "travel_preparation",
                    ],
                    startDate: this.addDays(t, 91),
                    endDate: this.addDays(t, 120),
                    metadata: { importance: "critical" },
                  },
                );
                break;
              case u.X3.CITIZENSHIP:
                i.push(
                  {
                    id: crypto.randomUUID(),
                    title: "Preparation",
                    description:
                      "Gather all necessary documents for your citizenship application.",
                    milestoneTypes: [
                      "eligibility_verification",
                      "document_collection",
                      "form_preparation",
                    ],
                    startDate: t,
                    endDate: this.addDays(t, 30),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Application Filing",
                    description:
                      "Complete and submit your naturalization application (Form N-400).",
                    milestoneTypes: [
                      "application_review",
                      "fee_payment",
                      "application_submission",
                    ],
                    startDate: this.addDays(t, 31),
                    endDate: this.addDays(t, 45),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Biometrics and Processing",
                    description:
                      "Attend biometrics appointment and wait for application processing.",
                    milestoneTypes: [
                      "biometrics_appointment",
                      "background_check",
                      "processing_updates",
                    ],
                    startDate: this.addDays(t, 46),
                    endDate: this.addDays(t, 180),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Interview and Test",
                    description:
                      "Prepare for and attend citizenship interview and test.",
                    milestoneTypes: [
                      "interview_preparation",
                      "interview",
                      "civics_test",
                    ],
                    startDate: this.addDays(t, 181),
                    endDate: this.addDays(t, 270),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Oath Ceremony and Certificate",
                    description:
                      "Attend oath ceremony and receive certificate of naturalization.",
                    milestoneTypes: [
                      "ceremony_scheduling",
                      "oath_ceremony",
                      "certificate_issuance",
                    ],
                    startDate: this.addDays(t, 271),
                    endDate: this.addDays(t, 300),
                    metadata: { importance: "critical" },
                  },
                );
                break;
              default:
                i.push(
                  {
                    id: crypto.randomUUID(),
                    title: "Preparation",
                    description:
                      "Gather all necessary documents for your application.",
                    milestoneTypes: [
                      "document_collection",
                      "document_verification",
                      "form_preparation",
                    ],
                    startDate: t,
                    endDate: this.addDays(t, 30),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Application Filing",
                    description: "Complete and submit your application.",
                    milestoneTypes: [
                      "application_review",
                      "fee_payment",
                      "application_submission",
                    ],
                    startDate: this.addDays(t, 31),
                    endDate: this.addDays(t, 60),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Processing and Review",
                    description:
                      "Application processing and review by authorities.",
                    milestoneTypes: [
                      "processing_updates",
                      "additional_documents",
                      "status_checks",
                    ],
                    startDate: this.addDays(t, 61),
                    endDate: this.addDays(t, 150),
                    metadata: { importance: "critical" },
                  },
                  {
                    id: crypto.randomUUID(),
                    title: "Decision and Next Steps",
                    description:
                      "Receive decision and take appropriate next steps.",
                    milestoneTypes: [
                      "decision_waiting",
                      "decision_response",
                      "post_decision_steps",
                    ],
                    startDate: this.addDays(t, 151),
                    endDate: this.addDays(t, 180),
                    metadata: { importance: "critical" },
                  },
                );
            }
            return i;
          }
          adjustPhaseTimings(e, t) {
            let i =
                ("expedited" === t.urgency ? 0.7 : 1) *
                ("simple" === t.complexity
                  ? 0.8
                  : "complex" === t.complexity
                    ? 1.3
                    : 1),
              r = new Date();
            return e.map((e, t) => {
              let a = Math.round(this.daysBetween(e.startDate, e.endDate) * i),
                s = r,
                o = this.addDays(s, a);
              return (
                (r = this.addDays(o, 1)), { ...e, startDate: s, endDate: o }
              );
            });
          }
          generateMilestones(e, t, i, r, a, s) {
            let o = this.caseService.getRequiredDocuments(a),
              n = this.daysBetween(i, r),
              d = t.length,
              c = Math.floor(n / d);
            return t.map((t, n) => {
              let p = this.addDays(i, n * c),
                l = n === d - 1 ? r : this.addDays(i, (n + 1) * c - 1),
                {
                  title: u,
                  description: m,
                  isCritical: h,
                } = this.getMilestoneDetails(t, a),
                y = this.getDocumentsForMilestone(t, o, s.priorityDocuments),
                g = n > 0 ? [crypto.randomUUID()] : [];
              return {
                id: crypto.randomUUID(),
                title: u,
                description: m,
                startDate: p,
                endDate: l,
                status: "not_started",
                completionPercentage: 0,
                requiredDocuments: y,
                dependsOn: g,
                isCritical: h,
                metadata: { type: t, phaseId: e },
              };
            });
          }
          getMilestoneDetails(e, t) {
            return (
              {
                document_collection: {
                  title: "Gather Required Documents",
                  description:
                    "Collect all required documents for your application.",
                  isCritical: !0,
                },
                document_translation: {
                  title: "Translate Documents",
                  description:
                    "Translate any non-English documents with certified translations.",
                  isCritical: !0,
                },
                document_verification: {
                  title: "Verify Document Authenticity",
                  description:
                    "Ensure all documents are authentic and properly certified.",
                  isCritical: !0,
                },
                form_preparation: {
                  title: "Complete Application Forms",
                  description:
                    "Fill out all required application forms accurately.",
                  isCritical: !0,
                },
                application_review: {
                  title: "Review Application Package",
                  description:
                    "Review your complete application package before submission.",
                  isCritical: !0,
                },
                fee_payment: {
                  title: "Pay Application Fees",
                  description:
                    "Pay all required application and processing fees.",
                  isCritical: !0,
                },
                application_submission: {
                  title: "Submit Application",
                  description:
                    "Submit your complete application package to the appropriate authority.",
                  isCritical: !0,
                },
                receipt_notice: {
                  title: "Receive Receipt Notice",
                  description:
                    "Receive confirmation that your application has been received.",
                  isCritical: !1,
                },
                biometrics_appointment: {
                  title: "Attend Biometrics Appointment",
                  description:
                    "Attend appointment for fingerprinting and photos.",
                  isCritical: !0,
                },
                background_check: {
                  title: "Background Check Processing",
                  description: "Your background check is being processed.",
                  isCritical: !1,
                },
                interview_preparation: {
                  title: "Prepare for Interview",
                  description:
                    "Prepare documents and practice for your upcoming interview.",
                  isCritical: !0,
                },
                interview: {
                  title: "Attend Interview",
                  description:
                    "Attend your scheduled interview with all required documents.",
                  isCritical: !0,
                },
                civics_test: {
                  title: "Complete Civics Test",
                  description:
                    "Complete the U.S. civics and English language tests.",
                  isCritical: !0,
                },
                processing_updates: {
                  title: "Check Application Status",
                  description:
                    "Regularly check for updates on your application status.",
                  isCritical: !1,
                },
                additional_documents: {
                  title: "Submit Additional Documents",
                  description:
                    "Respond to any requests for additional evidence or documentation.",
                  isCritical: !0,
                },
                status_checks: {
                  title: "Regular Status Checks",
                  description:
                    "Perform regular checks on your application status.",
                  isCritical: !1,
                },
                decision_waiting: {
                  title: "Wait for Decision",
                  description:
                    "Your application is under review for a final decision.",
                  isCritical: !1,
                },
                decision_response: {
                  title: "Receive Decision",
                  description: "Receive the decision on your application.",
                  isCritical: !0,
                },
                post_decision_steps: {
                  title: "Complete Post-Decision Steps",
                  description:
                    "Complete any required steps after receiving your decision.",
                  isCritical: !0,
                },
                ceremony_scheduling: {
                  title: "Oath Ceremony Scheduling",
                  description: "Receive your oath ceremony scheduling notice.",
                  isCritical: !1,
                },
                oath_ceremony: {
                  title: "Attend Oath Ceremony",
                  description:
                    "Attend your oath ceremony to complete the naturalization process.",
                  isCritical: !0,
                },
                certificate_issuance: {
                  title: "Receive Certificate",
                  description: "Receive your official certificate.",
                  isCritical: !0,
                },
                visa_issuance: {
                  title: "Receive Visa",
                  description: "Receive your approved visa in your passport.",
                  isCritical: !0,
                },
                travel_preparation: {
                  title: "Prepare for Travel",
                  description:
                    "Make necessary travel arrangements and preparations.",
                  isCritical: !0,
                },
              }[e] || {
                title: this.toTitleCase(e.replace(/_/g, " ")),
                description: `Complete the ${e.replace(/_/g, " ")} step in your application process.`,
                isCritical: !1,
              }
            );
          }
          getDocumentsForMilestone(e, t, i) {
            return (
              {
                document_collection: t,
                document_translation: t.filter(
                  (e) =>
                    e.includes("Birth") ||
                    e.includes("Marriage") ||
                    e.includes("Certificate") ||
                    e.includes("Court") ||
                    e.includes("Foreign"),
                ),
                document_verification: t.filter(
                  (e) =>
                    e.includes("Identity") ||
                    e.includes("Passport") ||
                    e.includes("Certificate"),
                ),
                form_preparation: [],
                application_review: t,
                application_submission: t,
                interview: t,
                additional_documents: i,
              }[e] || []
            );
          }
          calculateTimeline(e, t, i) {
            let r = new Date(),
              a = t[t.length - 1].endDate,
              s = this.caseService.estimateProcessingTime(e),
              o = "expedited" === i.urgency ? 0.8 : 1,
              n =
                "simple" === i.complexity
                  ? 0.9
                  : "complex" === i.complexity
                    ? 1.2
                    : 1,
              d = Math.round(s.averageDays * o * n),
              c = this.addDays(r, d);
            return { startDate: r, targetEndDate: a, estimatedEndDate: c };
          }
          addDays(e, t) {
            let i = new Date(e);
            return i.setDate(i.getDate() + t), i;
          }
          daysBetween(e, t) {
            return Math.round((t.getTime() - e.getTime()) / 864e5);
          }
          toTitleCase(e) {
            return e.replace(
              /\w\S*/g,
              (e) => e.charAt(0).toUpperCase() + e.substring(1).toLowerCase(),
            );
          }
        }
        var g = i(60442);
        let D = (0, c.createClient)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          ),
          f = new y(new h.U()),
          _ = new p.$().basePath("/api/roadmap"),
          v = async (e, t) => {
            let i = e.req.header("Authorization");
            if (!i || !i.startsWith("Bearer "))
              return e.json({ error: "Unauthorized" }, 401);
            let r = i.split(" ")[1],
              {
                data: { user: a },
                error: s,
              } = await D.auth.getUser(r);
            if (s || !a) return e.json({ error: "Unauthorized" }, 401);
            e.set("user", a), await t();
          },
          w = l.Ik({
            caseId: l.Yj().uuid(),
            customizationParams: l
              .Ik({
                urgency: l.k5(["normal", "expedited"]).optional(),
                complexity: l.k5(["simple", "standard", "complex"]).optional(),
                priorityDocuments: l.YO(l.Yj()).optional(),
              })
              .optional(),
          }),
          I = l.Ik({
            roadmapId: l.Yj().uuid(),
            milestoneId: l.Yj().uuid(),
            status: l.k5([
              "not_started",
              "in_progress",
              "completed",
              "blocked",
              "overdue",
            ]),
            completionPercentage: l.ai().min(0).max(100),
          }),
          S = l.Ik({
            roadmapId: l.Yj().uuid(),
            title: l.Yj().optional(),
            description: l.Yj().optional(),
            metadata: l.g1(l.bz()).optional(),
          });
        _.post("/", v, (0, d.l)("json", w), async (e) => {
          try {
            let t = e.get("user");
            if (!t)
              return e.json(
                { error: "Unauthorized - User not found in context" },
                401,
              );
            let { caseId: i, customizationParams: r } = e.req.valid("json"),
              { data: a, error: s } = await D.from("cases")
                .select("*")
                .eq("id", i)
                .single();
            if (s || !a) return e.json({ error: "Case not found" }, 404);
            if (
              !a.assignments.some((e) => e.userId === t.id) &&
              a.client_id !== t.id
            )
              return e.json({ error: "Access denied to this case" }, 403);
            let o = u.di.fromDatabase(a),
              n = f.generateRoadmap(o, t.id, r),
              { data: d, error: c } = await D.from("roadmaps")
                .insert({
                  id: n.id,
                  title: n.title,
                  description: n.description,
                  case_id: n.caseId,
                  case_type: n.caseType,
                  user_id: n.userId,
                  phases: n.phases,
                  start_date: n.startDate.toISOString(),
                  target_end_date: n.targetEndDate.toISOString(),
                  estimated_end_date: n.estimatedEndDate.toISOString(),
                  completion_percentage: n.completionPercentage,
                  last_updated: n.lastUpdated.toISOString(),
                  metadata: n.metadata,
                })
                .select()
                .single();
            if (c)
              return e.json(
                { error: `Failed to create roadmap: ${c.message}` },
                500,
              );
            return e.json(d);
          } catch (t) {
            return e.json({ error: `Server error: ${t.message}` }, 500);
          }
        }),
          _.get("/:id", v, async (e) => {
            try {
              let t = e.get("user");
              if (!t)
                return e.json(
                  { error: "Unauthorized - User not found in context" },
                  401,
                );
              let i = e.req.param("id"),
                { data: r, error: a } = await D.from("roadmaps")
                  .select("*, cases:case_id(*)")
                  .eq("id", i)
                  .single();
              if (a || !r) return e.json({ error: "Roadmap not found" }, 404);
              if (
                r.user_id !== t.id &&
                !r.cases.assignments.some((e) => e.userId === t.id)
              )
                return e.json({ error: "Access denied to this roadmap" }, 403);
              return e.json(r);
            } catch (t) {
              return e.json({ error: `Server error: ${t.message}` }, 500);
            }
          }),
          _.get("/case/:caseId", v, async (e) => {
            try {
              let t = e.get("user");
              if (!t)
                return e.json(
                  { error: "Unauthorized - User not found in context" },
                  401,
                );
              let i = e.req.param("caseId"),
                { data: r, error: a } = await D.from("cases")
                  .select("*")
                  .eq("id", i)
                  .single();
              if (a || !r) return e.json({ error: "Case not found" }, 404);
              if (
                !r.assignments.some((e) => e.userId === t.id) &&
                r.client_id !== t.id
              )
                return e.json({ error: "Access denied to this case" }, 403);
              let { data: s, error: o } = await D.from("roadmaps")
                .select("*")
                .eq("case_id", i)
                .order("created_at", { ascending: !1 });
              if (o)
                return e.json(
                  { error: `Failed to fetch roadmaps: ${o.message}` },
                  500,
                );
              return e.json(s);
            } catch (t) {
              return e.json({ error: `Server error: ${t.message}` }, 500);
            }
          }),
          _.get("/", v, async (e) => {
            try {
              let t = e.get("user"),
                { data: i, error: r } = await D.from("roadmaps")
                  .select("*")
                  .eq("user_id", t.id)
                  .order("last_updated", { ascending: !1 });
              if (r)
                return e.json(
                  { error: `Failed to fetch roadmaps: ${r.message}` },
                  500,
                );
              return e.json(i);
            } catch (t) {
              return e.json({ error: `Server error: ${t.message}` }, 500);
            }
          }),
          _.patch("/milestone", v, (0, d.l)("json", I), async (e) => {
            try {
              let t = e.get("user");
              if (!t)
                return e.json(
                  { error: "Unauthorized - User not found in context" },
                  401,
                );
              let {
                  roadmapId: i,
                  milestoneId: r,
                  status: a,
                  completionPercentage: s,
                } = e.req.valid("json"),
                { data: o, error: n } = await D.from("roadmaps")
                  .select("*")
                  .eq("id", i)
                  .single();
              if (n || !o) return e.json({ error: "Roadmap not found" }, 404);
              if (o.user_id !== t.id) {
                let { data: i, error: r } = await D.from("cases")
                  .select("assignments")
                  .eq("id", o.case_id)
                  .single();
                if (r || !i || !i.assignments.some((e) => e.userId === t.id))
                  return e.json(
                    { error: "Access denied to this roadmap" },
                    403,
                  );
              }
              let d = m.fromDatabase(o).updateMilestoneStatus(r, a, s),
                { data: c, error: p } = await D.from("roadmaps")
                  .update({
                    phases: d.phases,
                    completion_percentage: d.completionPercentage,
                    last_updated: d.lastUpdated.toISOString(),
                  })
                  .eq("id", i)
                  .select()
                  .single();
              if (p)
                return e.json(
                  { error: `Failed to update milestone: ${p.message}` },
                  500,
                );
              return e.json(c);
            } catch (t) {
              return e.json({ error: `Server error: ${t.message}` }, 500);
            }
          }),
          _.patch("/:id", v, (0, d.l)("json", S), async (e) => {
            try {
              let t = e.get("user");
              if (!t)
                return e.json(
                  { error: "Unauthorized - User not found in context" },
                  401,
                );
              let i = e.req.param("id"),
                { title: r, description: a, metadata: s } = e.req.valid("json"),
                { data: o, error: n } = await D.from("roadmaps")
                  .select("*")
                  .eq("id", i)
                  .single();
              if (n || !o) return e.json({ error: "Roadmap not found" }, 404);
              if (o.user_id !== t.id)
                return e.json({ error: "Access denied to this roadmap" }, 403);
              let d = { last_updated: new Date().toISOString() };
              r && (d.title = r),
                a && (d.description = a),
                s && (d.metadata = { ...o.metadata, ...s });
              let { data: c, error: p } = await D.from("roadmaps")
                .update(d)
                .eq("id", i)
                .select()
                .single();
              if (p)
                return e.json(
                  { error: `Failed to update roadmap: ${p.message}` },
                  500,
                );
              return e.json(c);
            } catch (t) {
              return e.json({ error: `Server error: ${t.message}` }, 500);
            }
          }),
          _.delete("/:id", v, async (e) => {
            try {
              let t = e.get("user"),
                i = e.req.param("id"),
                { data: r, error: a } = await D.from("roadmaps")
                  .select("*")
                  .eq("id", i)
                  .single();
              if (a || !r) return e.json({ error: "Roadmap not found" }, 404);
              if (r.user_id !== t.id)
                return e.json({ error: "Access denied to this roadmap" }, 403);
              let { error: s } = await D.from("roadmaps").delete().eq("id", i);
              if (s)
                return e.json(
                  { error: `Failed to delete roadmap: ${s.message}` },
                  500,
                );
              return e.json({ success: !0 });
            } catch (t) {
              return e.json({ error: `Server error: ${t.message}` }, 500);
            }
          });
        let T = async (e) => _.fetch(e),
          C = async (e) => _.fetch(e),
          P = async (e) => _.fetch(e),
          U = async (e) => _.fetch(e),
          x = { ...n },
          q =
            "workUnitAsyncStorage" in x
              ? x.workUnitAsyncStorage
              : "requestAsyncStorage" in x
                ? x.requestAsyncStorage
                : void 0;
        function A(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, i, r) => {
                  let a;
                  try {
                    let e = q?.getStore();
                    a = e?.headers;
                  } catch (e) {}
                  return g
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/roadmap",
                      headers: a,
                    })
                    .apply(i, r);
                },
              });
        }
        let b = A(T, "GET"),
          j = A(C, "POST"),
          R = A(void 0, "PUT"),
          E = A(P, "PATCH"),
          k = A(U, "DELETE"),
          O = A(void 0, "HEAD"),
          M = A(void 0, "OPTIONS"),
          F = new a.AppRouteRouteModule({
            definition: {
              kind: s.RouteKind.APP_ROUTE,
              page: "/api/roadmap/route",
              pathname: "/api/roadmap",
              filename: "route",
              bundlePath: "app/api/roadmap/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\roadmap\\route.ts",
            nextConfigOutput: "",
            userland: r,
          }),
          { workAsyncStorage: z, workUnitAsyncStorage: N, serverHooks: X } = F;
        function Y() {
          return (0, o.patchFetch)({
            workAsyncStorage: z,
            workUnitAsyncStorage: N,
          });
        }
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96708: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
      97108: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 97108), (e.exports = t);
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var i = (e) => t((t.s = e)),
    r = t.X(0, [827, 7719, 8342, 2256, 3774, 7482], () => i(72906));
  module.exports = r;
})();
//# sourceMappingURL=route.js.map
