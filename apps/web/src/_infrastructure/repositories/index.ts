/**
 * Repository factory module
 * Provides singleton access to all repositories
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

import { Database } from "@/types/database.types";

import { BaseRepository, type IRepository } from "./base-repository";

import { CaseRepository } from "./case-repository";
import { ChatRepository } from "./chat-repository";
import { DocumentRepository } from "./document-repository";
import { UserProfileRepository } from "./user-profile-repository";

// Repository singletons
const userProfileRepository = new UserProfileRepository();
const documentRepository = new DocumentRepository();
const caseRepository = new CaseRepository();
const chatRepository = new ChatRepository();

/**
 * Repository registry to manage all repositories
 */
const repositoryRegistry: Record<string, IRepository<any, any>> = {
  userProfile: userProfileRepository,
  document: documentRepository,
  case: caseRepository,
  chat: chatRepository,
};

/**
 * Repository Factory class
 * Provides access to repositories
 */
export class RepositoryFactory {
  private supabase: SupabaseClient<Database>;
  private documentRepository: DocumentRepository | null = null;
  private chatRepository: ChatRepository | null = null;

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  /**
   * Get the UserProfileRepository instance
   */
  getUserProfileRepository(): UserProfileRepository {
    return userProfileRepository;
  }

  /**
   * Get a document repository instance
   */
  getDocumentRepository(): DocumentRepository {
    if (!this.documentRepository) {
      this.documentRepository = new DocumentRepository();
    }
    return this.documentRepository;
  }

  /**
   * Get the CaseRepository instance
   */
  getCaseRepository(): CaseRepository {
    return caseRepository;
  }

  /**
   * Register a custom repository
   */
  registerRepository<T, K = string>(
    name: string,
    repository: BaseRepository<T, K>,
  ): void {
    repositoryRegistry[name] = repository;
  }

  /**
   * Get a repository by name
   */
  getRepository<T extends IRepository<any, any>>(name: string): T {
    const repository = repositoryRegistry[name];
    if (!repository) {
      throw new Error(`Repository "${name}" not found`);
    }
    return repository as T;
  }

  /**
   * Get a chat repository instance
   */
  getChatRepository(): ChatRepository {
    return chatRepository;
  }
}

// Export a single instance of the repository factory
export const repositoryFactory = new RepositoryFactory(
  createSupabaseServiceClient(),
);

// Export individual repositories for direct access
export {
  userProfileRepository,
  documentRepository,
  caseRepository,
  chatRepository,
  UserProfileRepository,
  DocumentRepository,
  CaseRepository,
  ChatRepository,
  BaseRepository,
};

// Re-export type
export type { IRepository };

// Default export
export default repositoryFactory;
