import fs from "fs";
import path from "path";

import { OpenAI } from "openai";
import { z } from "zod";

import { getSupabaseClient } from "@/lib/supabase/client";
import { env } from "@/shared/config/env.mjs";

import { exportTrainingDataForOpenAI } from "./data-collection";

// OpenAI client initialization
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

/**
 * Create a new fine-tuning job
 */
export async function createFineTuningJob(category?: string) {
  // Get the training data
  const jsonlData = await exportTrainingDataForOpenAI(category);

  // Create a temporary file to store the training data
  const tempDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const tempFile = path.join(tempDir, `training-${Date.now()}.jsonl`);
  fs.writeFileSync(tempFile, jsonlData);

  try {
    // Upload the file to OpenAI
    const file = await openai.files.create({
      file: fs.createReadStream(tempFile),
      purpose: "fine-tune",
    });

    // Create fine-tuning job
    const response = await openai.fineTuning.jobs.create({
      training_file: file.id,
      model: "gpt-3.5-turbo",
      suffix: `immigration-${category || "general"}-${Date.now()}`,
    });

    // Store the job in the database
    const supabase = getSupabaseClient(); // Assumes this client works in Node.js
    await supabase.from("fine_tuning_jobs").insert({
      id: response.id,
      status: response.status,
      model: response.model,
      fine_tuned_model: null,
      category: category || null,
      created_at: new Date(response.created_at * 1000).toISOString(),
      finished_at: null,
      error: null,
      metadata: {
        training_file: file.id,
        hyperparameters: response.hyperparameters,
      },
    });

    return {
      jobId: response.id,
      status: response.status,
    };
  } catch (error) {
    console.error("Error creating fine-tuning job:", error);
    throw error;
  } finally {
    // Clean up the temporary file
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}
