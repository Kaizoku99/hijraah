/**
 * Text Chunking Utilities
 */

interface ChunkOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  separators?: string[];
}

const defaultSeparators = ["\n\n", "\n", ". ", "? ", "! ", " ", ""];
const defaultChunkSize = 1000; // Target size in characters
const defaultChunkOverlap = 100; // Overlap in characters

/**
 * Splits text recursively based on separators to achieve a target chunk size with overlap.
 *
 * @param text The input text to split.
 * @param options Optional configuration for chunk size, overlap, and separators.
 * @returns An array of text chunks.
 */
export function recursiveCharacterTextSplitter(
  text: string,
  options?: ChunkOptions,
): string[] {
  const chunkSize = options?.chunkSize ?? defaultChunkSize;
  const chunkOverlap = options?.chunkOverlap ?? defaultChunkOverlap;
  const separators = options?.separators ?? defaultSeparators;

  if (chunkSize <= chunkOverlap) {
    throw new Error("Chunk size must be greater than chunk overlap.");
  }

  const finalChunks: string[] = [];

  // Start splitting with the first separator
  let currentSeparatorIndex = 0;
  let currentSeparator = separators[currentSeparatorIndex];
  let splits = text.split(currentSeparator);

  // Find the best separator that creates chunks smaller than chunkSize
  // or keep splitting if chunks are too large
  while (true) {
    let chunksTooLarge = false;
    for (const split of splits) {
      if (split.length > chunkSize) {
        chunksTooLarge = true;
        break;
      }
    }

    // If chunks are small enough with the current separator, break
    if (!chunksTooLarge) {
      break;
    }

    // Move to the next separator
    currentSeparatorIndex++;
    if (currentSeparatorIndex >= separators.length) {
      // If no more separators, force split by chunkSize (last resort)
      currentSeparator = "";
      break;
    }
    currentSeparator = separators[currentSeparatorIndex];

    // Re-split the text with the new separator
    splits = text.split(currentSeparator);
  }

  // Merge smaller chunks and handle overlap
  let currentChunk = "";
  for (let i = 0; i < splits.length; i++) {
    const split = splits[i];
    const separatorToAdd = i < splits.length - 1 ? currentSeparator : "";

    // If adding the next split (plus separator) exceeds chunk size
    if (
      currentChunk.length + split.length + separatorToAdd.length >
      chunkSize
    ) {
      // Add the current chunk if it's not empty
      if (currentChunk.length > 0) {
        finalChunks.push(currentChunk.trim());
      }

      // Start the next chunk with overlap
      // Find where the previous chunk should ideally start to maintain overlap
      const overlapStartIndex = Math.max(0, currentChunk.length - chunkOverlap);
      const overlapText = currentChunk.substring(overlapStartIndex);

      // Start new chunk with overlap and the current split
      currentChunk = (overlapText + split + separatorToAdd).trim();
    } else {
      // Add the split and separator to the current chunk
      currentChunk += split + separatorToAdd;
    }
  }

  // Add the last remaining chunk
  if (currentChunk.length > 0) {
    finalChunks.push(currentChunk.trim());
  }

  // Optional: Filter out potentially empty chunks again after trimming/overlap logic
  return finalChunks.filter((chunk) => chunk.length > 0);
}
