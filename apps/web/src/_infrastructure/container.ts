import { Hono } from "hono";

import { ChatApplicationService } from "@/application/services/chat-service";
import { DocumentApplicationService } from "@/application/services/document-service";
import { ChatService as DomainChatService } from "@/_core/chat/services/chat-service";
import { DocumentService as DomainDocumentService } from "@/core/documents/entities/documents/entities/document-service";

import { RepositoryFactory } from "./repositories";
import { StorageService } from "./services/storage-service";
import { createSupabaseClient } from "./supabase";

/**
 * Register all services in the container
 */
export function registerServices(c: Hono): void {
  // Create Supabase client
  const supabaseClient = createSupabaseClient();
  c.get("env").set("supabaseClient", supabaseClient);

  // Create repository factory
  const repositoryFactory = new RepositoryFactory(supabaseClient);
  c.get("env").set("repositoryFactory", repositoryFactory);

  // Document domain service
  const documentDomainService = new DomainDocumentService();
  c.get("env").set("documentDomainService", documentDomainService);

  // Storage service
  const storageService = new StorageService(supabaseClient);
  c.get("env").set("storageService", storageService);

  // Document application service
  const documentService = new DocumentApplicationService(
    repositoryFactory,
    documentDomainService,
    storageService,
  );
  c.get("env").set("documentService", documentService);

  // Chat domain service
  const chatDomainService = new DomainChatService();
  c.get("env").set("chatDomainService", chatDomainService);

  // Chat application service
  const openaiApiKey = process.env.OPENAI_API_KEY || "";
  if (!openaiApiKey) {
    console.warn(
      "OPENAI_API_KEY not set, AI chat functionality will not work correctly",
    );
  }

  const chatService = new ChatApplicationService(
    repositoryFactory,
    chatDomainService,
    openaiApiKey,
  );
  c.get("env").set("chatService", chatService);
}
