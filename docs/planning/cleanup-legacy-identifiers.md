# Cleanup Plan: Remove Legacy Identifiers (Q3 2025)

> Branch: `chore/remove-legacy-identifiers`

---

## Goals

1. **Eliminate legacy identifiers** throughout the codebase:
   - Tables / imports: `user`, `document`
   - API payload field: `selectedVisibilityType`
   - Singular request body field: `message`
2. **Standardise** on modern names and conventions used by the latest Vercel AI SDK and the reference **ai-chatbot** project:
   - Tables → `profiles`, `artifacts`
   - API field → `visibility`
   - Request body → `messages` (array)
3. Introduce lint/TS checks to prevent re-introduction of these legacy names.

## Reference Implementation

We will mirror the patterns already adopted in the open-source **ai-chatbot** repository (latest Vercel AI SDK best-practices).

## Work Breakdown & Timeline

| Day | Area                    | Tasks                                                                                                                                                                                                                              |
| --- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | **Setup**               | • Create branch `chore/remove-legacy-identifiers` <br>• Add `ts-morph` / `jscodeshift` for codemods <br>• Enable `noImplicitOverride`, `exactOptionalPropertyTypes` in `tsconfig.json`                                             |
| 0   | **Automated codemod**   | • Rewrite imports `user`→`profiles`, `document`→`artifacts` <br>• Rename props/vars `selectedVisibilityType`→`visibility` <br>• Wrap lone `message` into `messages:[…]` <br>• Script located at `scripts/refactor/removeLegacy.ts` |
| 1   | **Schema & Validation** | • Remove alias exports in `supabase/schema.ts` <br>• Update DB table/enum names if needed <br>• Replace all Zod schemas to new fields (see `ai-chatbot/app/(chat)/api/chat/schema.ts`)                                             |
| 1   | **Runtime code**        | • Refactor chat route to modern payload only <br>• Update visibility helpers (`updateChatVisibilityById` etc.) <br>• Purge feature-flagged legacy branches                                                                         |
| 1   | **Client updates**      | • Prop/state rename in UI – `visibility` <br>• Remove `experimental_prepareRequestBody` shims <br>• Use `auth()` helper as in reference project                                                                                    |
| 2   | **Tests & Lint**        | • Add Jest test ensuring stream response for modern payload <br>• ESLint `no-restricted-imports` for banned identifiers <br>• CI fails on legacy names                                                                             |
| 2   | **Docs & ADR**          | • Add ADR `docs/architecture/2025-Q3-remove-legacy-names.md` <br>• Update README migration note                                                                                                                                    |
| 2   | **Final QA**            | • Run `npm run lint`, `npm run test`, `npm run build` <br>• Manual sanity test (chat stream)                                                                                                                                       |

### Effort

~2–2.5 developer-days.

## Acceptance Checklist

- [ ] All legacy imports removed; build passes without aliases.
- [ ] API POST `/api/chat` validated only via new schema; returns `text/ai-stream`.
- [ ] Lint rules in place preventing future use of `user`, `document`, `selectedVisibilityType`, singular `message` in new code.
- [ ] Unit & integration tests updated and green.
- [ ] ADR & README sections committed.

---

_Last updated: <!--CURSOR:DATE-->_
