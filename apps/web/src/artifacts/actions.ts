"use server";

import { getSuggestionsByDocumentId } from "@/lib/db/operations";

export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return suggestions ?? [];
}
