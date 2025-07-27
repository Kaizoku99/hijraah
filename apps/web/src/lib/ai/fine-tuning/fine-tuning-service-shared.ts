import { OpenAI } from "openai";
import { z } from "zod";

import { getSupabaseClient } from "@/lib/supabase/client";
import { env } from "@/shared/config/env.mjs";

// Schema definitions
export const FineTuningJobSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "running", "succeeded", "failed", "cancelled"]),
  model: z.string(),
  fine_tuned_model: z.string().nullable(),
  category: z.string().nullable(),
  created_at: z.string(),
  finished_at: z.string().nullable(),
  error: z.string().nullable(),
  metadata: z.record(z.any()).optional(),
});

export type FineTuningJob = z.infer<typeof FineTuningJobSchema>;

// OpenAI client initialization
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

/**
 * Check the status of a fine-tuning job
 */
export async function checkFineTuningJobStatus(jobId: string) {
  try {
    const response = await openai.fineTuning.jobs.retrieve(jobId);

    // Update the job in the database
    const supabase = getSupabaseClient(); // Assumes this client works in Edge/Browser
    await supabase
      .from("fine_tuning_jobs")
      .update({
        status: response.status,
        fine_tuned_model: response.fine_tuned_model,
        finished_at: response.finished_at
          ? new Date(response.finished_at * 1000).toISOString()
          : null,
        error: response.error ? response.error.message : null,
      })
      .eq("id", jobId);

    return {
      status: response.status,
      fineTunedModel: response.fine_tuned_model,
      finishedAt: response.finished_at
        ? new Date(response.finished_at * 1000).toISOString()
        : null,
    };
  } catch (error) {
    console.error("Error checking fine-tuning job status:", error);
    throw error;
  }
}

/**
 * List all fine-tuning jobs
 */
export async function listFineTuningJobs() {
  const supabase = getSupabaseClient(); // Assumes this client works in Edge/Browser
  const { data, error } = await supabase
    .from("fine_tuning_jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error listing fine-tuning jobs:", error);
    throw error;
  }

  return data as FineTuningJob[];
}

/**
 * Cancel a fine-tuning job
 */
export async function cancelFineTuningJob(jobId: string) {
  try {
    const response = await openai.fineTuning.jobs.cancel(jobId);

    // Update the job in the database
    const supabase = getSupabaseClient(); // Assumes this client works in Edge/Browser
    await supabase
      .from("fine_tuning_jobs")
      .update({
        status: response.status,
      })
      .eq("id", jobId);

    return {
      status: response.status,
    };
  } catch (error) {
    console.error("Error canceling fine-tuning job:", error);
    throw error;
  }
}

/**
 * Get all fine-tuned models
 */
export async function listFineTunedModels() {
  const supabase = getSupabaseClient(); // Assumes this client works in Edge/Browser
  const { data, error } = await supabase
    .from("fine_tuning_jobs")
    .select("*")
    .eq("status", "succeeded")
    .is("fine_tuned_model", "not.null")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error listing fine-tuned models:", error);
    throw error;
  }

  return data as FineTuningJob[];
}

/**
 * Update models list with fine-tuned models
 */
// NOTE: This function was removed as it seems specific to the context of the original service file
// and likely belongs elsewhere (e.g., in models.ts or triggered by an API call).
// export async function registerFineTunedModelsInSystem() {
//   const fineTunedModels = await listFineTunedModels();
//
//   // Logic to register models in the system
//   // This would update your models registry to include the fine-tuned models
//   return fineTunedModels;
// }
