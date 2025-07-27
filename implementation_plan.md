# Implementation Plan: Document Processing Pipeline (Trigger.dev Orchestration)

This plan outlines the steps to implement the document processing pipeline using Supabase for storage/database, Trigger.dev for workflow orchestration, and Vercel AI SDK with Mistral models for AI tasks.

## Phase 1: Database & Storage Setup (Supabase)

- [x] **1. Create Database Migration:**
  - **Location:** `supabase/migrations/YYYYMMDDHHMMSS_create_document_pipeline_tables.sql`
  - **Action:** Define schemas for `documents` and `document_chunks` tables, and the `match_document_chunks` function. (**Note:** `vector` extension is likely enabled by `20250408153000_rag_system.sql`, but verify). Apply the migration. (**Applied manually due to existing table conflicts**).
- [x] **2. Configure Supabase Storage:**
  - **Location:** Supabase Dashboard / Programmatic Setup / SQL
  - **Action:** Ensure private `documents` bucket exists. Define RLS policies for upload (authenticated users), select (owner/service role), and full access (service role). (**Applied RLS policies via SQL**).

## Phase 2: Backend API Endpoints (Next.js)

- [x] **3. Create OCR API Endpoint:**
  - **Location:** `src/app/api/ai/ocr/route.ts`
  - **Action:** Implement `POST` handler with internal auth (`API_SECRET_KEY`). Receives `{ documentId, filePath }`, downloads file from `documents` bucket, calls Mistral OCR via `@vercel/ai` SDK, returns `{ text: "..." }`. (**Note:** Creating a new endpoint specific for this pipeline is recommended, as the existing `src/app/api/documents/ocr/route.ts` uses a different SDK, input schema, auth, and file source).
- [x] **4. Create Classification API Endpoint:**
  - **Location:** `src/app/api/ai/classify/route.ts`
  - **Action:** Implement `POST` handler with internal auth. Receives `{ documentId, text }`, calls Mistral classification via SDK (`generateObject`), returns structured JSON `{ classification: { ... } }`.
- [x] **5. Create Embedding API Endpoint:**
  - **Location:** `src/app/api/ai/embed/route.ts`
  - **Action:** Implement `POST` handler with internal auth. Handles two cases:
    - Document Processing: Receives `{ text }`, chunks text, embeds chunks via SDK (`embedMany`), returns `{ chunks: [{ index, text, embedding }, ...] }`.
    - Query Embedding: Receives `{ text, isQuery: true }`, embeds single text via SDK (`embed`), returns `{ embedding: [...] }`.

## Phase 3: Workflow Orchestration (Trigger.dev)

- [x] **6. Define Trigger.dev Workflow (Task):**
  - **Location:** `src/lib/triggers/document-pipeline.ts`
  - **Action:** Define `documentProcessingTask` using v3 `task()` triggered by `document.uploaded` event (trigger linkage likely via config/UI). Orchestrate calls to API endpoints, update DB status, store embeddings. Handle errors and log progress. Ensure task is exported/registered.

## Phase 4: Frontend Integration

- [x] **7. Create/Modify Upload Component:**
  - **Location:** `src/components/ui/documents/DocumentUploader.tsx` (or adapt `DocumentForm.tsx`)
  - **Action:** Handle file input. On upload: create `documents` DB record, upload file to Storage, update DB record, **then call `/api/documents/process`** endpoint to trigger the workflow. Show progress. (**Note:** Check existing components before creating new ones).
- [x] **8. Create/Modify Chat Interface:**
  - **Location:** Chat component files (e.g., `src/app/(ai-features)/ai-chat/[id]/page.tsx`)
  - **Action:** Use `@ai-sdk/react`'s `useChat` hook pointing to `/api/chat`. Render messages, handle input.
- [x] **9. Implement Chat API Endpoint with Retrieval Tool:**
  - **Location:** `src/app/api/chat/route.ts`
  - **Action:** Use AI SDK. Define `retrieveDocuments` tool. Implement tool execution: embed query (via `/api/ai/embed`), call `match_document_chunks` RPC, format results, return context to LLM. Stream final response.
- [x] **10. Create Triggering Endpoint:**
  - **Location:** `src/app/api/documents/process/route.ts`
  - **Action:** Implement `POST` handler. Receives `{ documentId, filePath, fileType }` from frontend uploader. Uses `TriggerClient` (`sendEvent`) to send event `document.uploaded` with payload. Requires authentication.

## Phase 5: Supporting Code & Configuration

- [x] **11. Helper Utilities:**
  - **Location:** `src/lib/ai/chunking.ts`
  - **Action:** Implement text chunking logic (`recursiveCharacterTextSplitter`). Review other needed utils.
- [x] **12. Environment Variables:**
  - **Location:** `.env.example`, `.env.local`, Vercel Environment Variables
  - **Action:** Documented and configured necessary keys: Supabase, Trigger.dev, Mistral, `API_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`.

---

**Current Status:** Phase 5 Complete. Ready for End-to-End Testing.

# Chat Schema Consolidation & Refactoring Plan

This document outlines the plan for consolidating the chat schema and refactoring the codebase to use the new structure, based on Vercel AI SDK best practices.

## Phase 1: Answering Clarifying Questions

_(This section populated based on codebase analysis - July 16th)_

1.  **Primary Interaction Points:**
    - Chat data interactions occur across multiple layers:
      - Direct Supabase calls: Primarily via wrappers in `src/lib/supabase/chat.ts`.
      - Service/Repository Layer: `src/services/chat-service.ts` uses `src/_core/chat/repositories/chat-repository.ts`.
      - API Layer: Hono routes (`src/app/api/routes/chat-routes.ts`) use the `ChatService`.
      - Server Actions: Used for specific operations like `updateChatVisibility` (`src/app/(chat)/actions.ts`).
      - AI Adapters: `src/lib/ai/adapters/vercel-ai-adapter.ts` interacts directly with `chat_messages`.
      - Frontend Hooks: Custom `useChat` hook(s) (`src/_core/chat/hooks/useChat.ts`, `src/hooks/useChat.ts`) likely orchestrate calls.
2.  **Frontend State Management:**
    - The application appears to use a custom hook named `useChat` (`src/_core/chat/hooks/useChat.ts` or `src/hooks/useChat.ts`) for chat state, not the standard Vercel AI SDK `useChat` hook directly.
    - The exact internal state mechanism (e.g., `useState`, Zustand) within this custom hook requires further inspection.
3.  **Type Definitions:**
    - Multiple `ChatMessage` and `ChatSession` type definitions exist:
      - `src/types/chat.ts` (Likely primary application types, imports `Message` from `ai` package).
      - `src/lib/supabase/chat.ts` (Maps directly to DB schema via generated types).
      - `src/_core/chat/entities/chat.ts` & `src/_core/chat/types/index.ts` (Core business logic types).
      - `src/lib/ai/config.ts` (Zod schema-derived types).
    - Consolidation or clear usage patterns are needed.
4.  **RAG/Tool Usage (`sources`, `tool_calls` columns):**
    - No clear evidence of implemented RAG or tool-calling logic populating `sources` or `tool_calls` columns in the consolidated `chat_messages` table.
    - The Vercel AI SDK handles tool definition and results (`toolCalls`, `toolResults`). This data _could_ be stored in the `tool_calls` JSONB column if the SDK is used for generation.
    - Populating `sources` would likely require custom logic during information retrieval/RAG processing.
5.  **Visibility/Sharing (`visibility` column):**
    - No evidence of a fully implemented user-facing chat sharing feature was found in the examined files.
    - A `use-chat-visibility.ts` hook and a likely `updateChatVisibility` server action indicate a visibility concept exists.
    - Integration with the `visibility` column in `chat_sessions` likely occurs in the server action and corresponding RLS policies, but requires further inspection.
6.  **Database Client:**
    - The standard Supabase JS client (`@supabase/supabase-js`) is used extensively for database interactions.

## Phase 2: Implementation Plan

_(To be drafted after Phase 1)_

## Phase 3: Implementation

_(Tracking progress during implementation)_
