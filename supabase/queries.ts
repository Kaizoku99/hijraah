import "server-only";

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  type SQL,
} from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import type { ArtifactType } from "@/types/artifact";
import type { VisibilityType } from "@/components/ui/visibility-selector";
import { generateUUID } from "@/lib/utils";

import {
  profiles,
  type Profile,
  artifacts,
  type Suggestion,
  suggestions,
  chatSessions,
  chatMessages,
  chatMessageVotes,
  type ChatSession,
  type ChatMessage,
  type InsertChatMessageVote,
} from "./schema";
import { generateHashedPassword } from "./utils";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

// Helper function to map ArtifactType to the database 'kind' enum
function mapArtifactTypeToDbKind(
  artifactType: ArtifactType,
): "text" | "code" | "image" | "sheet" {
  switch (artifactType) {
    case "document":
      return "text";
    case "spreadsheet":
      return "sheet";
    case "code":
      return "code";
    case "image":
      return "image";
    case "mindmap":
      // This will cause a type error if 'mindmap' is not supported by the DB enum.
      // Or handle error/default: throw new Error(`Unsupported artifact type for DB: ${artifactType}`);
      return "text"; // Or a sensible default, or extend DB enum
    default:
      // Ensure exhaustive check, or throw error for unhandled types
      throw new Error(`Unhandled artifact type: ${artifactType}`);
  }
}

export async function getUser(email: string): Promise<Array<Profile>> {
  try {
    return await db.select().from(profiles).where(eq(profiles.email, email));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const hashedPassword = generateHashedPassword(password);

  try {
    return await db
      .insert(profiles)
      .values({ email, password: hashedPassword });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function createGuestUser() {
  const email = `guest-${Date.now()}`;
  const password = generateHashedPassword(generateUUID());

  try {
    return await db.insert(profiles).values({ email, password }).returning({
      id: profiles.id,
      email: profiles.email,
    });
  } catch (error) {
    console.error("Failed to create guest user in database");
    throw error;
  }
}

export async function saveChatSession({
  id,
  userId,
  title,
  visibility,
  caseId,
  model,
  systemPrompt,
}: Partial<ChatSession> & { userId: string; title: string }) {
  try {
    return await db.insert(chatSessions).values({
      id: id || generateUUID(),
      userId,
      title,
      visibility: visibility || "private",
      caseId,
      model,
      systemPrompt,
    });
  } catch (error) {
    console.error("Failed to save chat session in database", error);
    throw error;
  }
}

export async function deleteChatSessionById({ id }: { id: string }) {
  try {
    await db.delete(chatMessages).where(eq(chatMessages.sessionId, id));

    const [deletedSession] = await db
      .delete(chatSessions)
      .where(eq(chatSessions.id, id))
      .returning();
    return deletedSession;
  } catch (error) {
    console.error("Failed to delete chat session by id from database", error);
    throw error;
  }
}

export async function getChatSessionsByUserId({
  userId,
  limit,
  startingAfter,
  endingBefore,
}: {
  userId: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    const query = (whereCondition?: SQL<any>) =>
      db
        .select()
        .from(chatSessions)
        .where(
          whereCondition
            ? and(whereCondition, eq(chatSessions.userId, userId))
            : eq(chatSessions.userId, userId),
        )
        .orderBy(desc(chatSessions.createdAt))
        .limit(extendedLimit);

    let filteredSessions: Array<ChatSession> = [];

    if (startingAfter) {
      const [selectedSession] = await db
        .select({ createdAt: chatSessions.createdAt })
        .from(chatSessions)
        .where(eq(chatSessions.id, startingAfter))
        .limit(1);

      if (!selectedSession) {
        throw new Error(`Chat session with id ${startingAfter} not found`);
      }
      filteredSessions = await query(
        gt(chatSessions.createdAt, selectedSession.createdAt!),
      );
    } else if (endingBefore) {
      const [selectedSession] = await db
        .select({ createdAt: chatSessions.createdAt })
        .from(chatSessions)
        .where(eq(chatSessions.id, endingBefore))
        .limit(1);

      if (!selectedSession) {
        throw new Error(`Chat session with id ${endingBefore} not found`);
      }
      filteredSessions = await query(
        lt(chatSessions.createdAt, selectedSession.createdAt!),
      );
    } else {
      filteredSessions = await query();
    }

    const hasMore = filteredSessions.length > limit;

    return {
      sessions: hasMore ? filteredSessions.slice(0, limit) : filteredSessions,
      hasMore,
    };
  } catch (error) {
    console.error("Failed to get chat sessions by user from database", error);
    throw error;
  }
}

export async function getChatSessionById({ id }: { id: string }) {
  try {
    const [selectedSession] = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.id, id));
    return selectedSession;
  } catch (error) {
    console.error("Failed to get chat session by id from database", error);
    throw error;
  }
}

export async function saveChatMessages({
  messagesToSave,
}: {
  messagesToSave: Array<Omit<ChatMessage, "id" | "createdAt" | "updatedAt">>;
}) {
  try {
    if (messagesToSave.length === 0) return [];
    return await db
      .insert(chatMessages)
      .values(messagesToSave.map((m) => ({ ...m, id: generateUUID() })))
      .returning();
  } catch (error) {
    console.error("Failed to save chat messages in database", error);
    throw error;
  }
}

export async function getChatMessagesBySessionId({
  sessionId,
}: {
  sessionId: string;
}) {
  try {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt));
  } catch (error) {
    console.error(
      "Failed to get chat messages by session id from database",
      error,
    );
    throw error;
  }
}

export async function voteMessage({
  messageId,
  userId,
  isUpvoted,
}: {
  messageId: string;
  userId: string;
  isUpvoted: boolean;
}) {
  try {
    const voteData: InsertChatMessageVote = {
      messageId,
      userId,
      isUpvoted,
    };

    return await db
      .insert(chatMessageVotes)
      .values(voteData)
      .onConflictDoUpdate({
        target: [chatMessageVotes.messageId, chatMessageVotes.userId],
        set: { isUpvoted: isUpvoted },
      })
      .returning();
  } catch (error) {
    console.error("Failed to vote on message in database", error);
    throw error;
  }
}

export async function getVotesForMessagesInSession({
  sessionId,
}: {
  sessionId: string;
}) {
  try {
    return await db
      .select({
        messageId: chatMessageVotes.messageId,
        userId: chatMessageVotes.userId,
        isUpvoted: chatMessageVotes.isUpvoted,
        createdAt: chatMessageVotes.createdAt,
      })
      .from(chatMessageVotes)
      .innerJoin(chatMessages, eq(chatMessageVotes.messageId, chatMessages.id))
      .where(eq(chatMessages.sessionId, sessionId));
  } catch (error) {
    console.error(
      "Failed to get votes for messages in session from database",
      error,
    );
    throw error;
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactType;
  content: string;
  userId: string;
}) {
  try {
    const dbKind = mapArtifactTypeToDbKind(kind);
    return await db.insert(artifacts).values({
      id,
      title,
      kind: dbKind,
      content,
      userId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to save document in database");
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const documents = await db
      .selectDistinctOn([artifacts.id], {
        id: artifacts.id,
        title: artifacts.title,
        kind: artifacts.kind,
        userId: artifacts.userId,
        createdAt: artifacts.createdAt,
      })
      .from(artifacts)
      .where(eq(artifacts.id, id))
      .orderBy(artifacts.id, desc(artifacts.createdAt));

    return documents;
  } catch (error) {
    console.error("Failed to get documents by id from database");
    throw error;
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(artifacts)
      .where(eq(artifacts.id, id))
      .orderBy(desc(artifacts.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error("Failed to get document by id from database");
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    return await db
      .delete(artifacts)
      .where(and(eq(artifacts.id, id), lt(artifacts.createdAt, timestamp)));
  } catch (error) {
    console.error(
      "Failed to delete documents by id after timestamp from database",
    );
    throw error;
  }
}

export async function saveSuggestions({
  suggestions: suggestionsToSave,
}: {
  suggestions: Array<Suggestion>;
}) {
  try {
    return await db.insert(suggestions).values(suggestionsToSave);
  } catch (error) {
    console.error("Failed to save suggestions in database", error);
    throw error;
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    const suggestions = await db
      .select()
      .from(suggestions)
      .where(eq(suggestions.documentId, documentId))
      .orderBy(desc(suggestions.createdAt));

    return suggestions;
  } catch (error) {
    console.error(
      "Failed to get suggestions by document id from database",
      error,
    );
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    const [messageData] = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.id, id));
    return messageData;
  } catch (error) {
    console.error("Failed to get message by id from database");
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await db
      .select({ id: chatMessages.id })
      .from(chatMessages)
      .where(
        and(
          eq(chatMessages.sessionId, chatId),
          lt(chatMessages.createdAt, timestamp),
        ),
      );

    if (messagesToDelete.length === 0) {
      return [];
    }

    const messageIds = messagesToDelete.map((msg) => msg.id);

    return await db
      .delete(chatMessages)
      .where(inArray(chatMessages.id, messageIds))
      .returning();
  } catch (error) {
    console.error(
      "Failed to delete messages by chat id after timestamp from database",
      error,
    );
    throw error;
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    return await db
      .update(chatSessions)
      .set({ visibility })
      .where(eq(chatSessions.id, chatId));
  } catch (error) {
    console.error("Failed to update chat visibility by id from database");
    throw error;
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const date = new Date();
    date.setHours(date.getHours() - differenceInHours);

    const result = await db
      .select({ value: count() })
      .from(chatMessages)
      .where(
        and(eq(chatMessages.userId, id), gte(chatMessages.createdAt, date)),
      );

    return result[0].value;
  } catch (error) {
    console.error("Failed to get message count by user id from database");
    throw error;
  }
}
