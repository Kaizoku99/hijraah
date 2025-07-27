#!/usr/bin/env node
/**
 * This script processes documents that need embeddings
 * It can be run as a scheduled job or manually
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

import { generateEmbedding, getTextForEmbedding } from "../lib/openai";

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function processDocuments(batchSize = 10) {
  console.log("Starting document embedding process...");

  try {
    // Get documents that need embeddings
    const { data: artifacts, error } = await supabase
      .from("artifacts")
      .select("*")
      .eq("needs_embedding", true)
      .limit(batchSize);

    if (error) {
      throw new Error(`Error fetching artifacts: ${error.message}`);
    }

    if (!artifacts || artifacts.length === 0) {
      console.log("No artifacts need embedding. Process complete.");
      return;
    }

    console.log(`Processing ${artifacts.length} artifacts...`);

    // Process each artifact
    for (const artifact of artifacts) {
      try {
        console.log(`Processing artifact ${artifact.id}: ${artifact.title}`);

        // Generate text for embedding
        const text = getTextForEmbedding(artifact);

        // Generate embedding
        const embedding = await generateEmbedding(text);

        // Update the artifact with the new embedding
        const { error: updateError } = await supabase
          .from("artifacts")
          .update({
            embedding,
            needs_embedding: false,
          })
          .eq("id", artifact.id);

        if (updateError) {
          throw new Error(`Error updating artifact: ${updateError.message}`);
        }

        console.log(`Successfully processed artifact ${artifact.id}`);
      } catch (err: any) {
        console.error(`Error processing artifact ${artifact.id}:`, err.message);
      }
    }

    console.log("Batch processing complete.");
  } catch (error: any) {
    console.error("Error in embedding process:", error.message);
  }
}

// Run the process
processDocuments()
  .then(() => {
    console.log("Document embedding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error in document embedding process:", error);
    process.exit(1);
  });
