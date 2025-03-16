import { z } from 'zod';
import { getSupabaseClient } from '@/lib/supabase/client';
import { exportTrainingDataForOpenAI } from './data-collection';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { env } from '@/env.mjs';

// Schema definitions
export const FineTuningJobSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'running', 'succeeded', 'failed', 'cancelled']),
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
 * Create a new fine-tuning job
 */
export async function createFineTuningJob(category?: string) {
  // Get the training data
  const jsonlData = await exportTrainingDataForOpenAI(category);
  
  // Create a temporary file to store the training data
  const tempDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  const tempFile = path.join(tempDir, `training-${Date.now()}.jsonl`);
  fs.writeFileSync(tempFile, jsonlData);

  try {
    // Upload the file to OpenAI
    const file = await openai.files.create({
      file: fs.createReadStream(tempFile),
      purpose: 'fine-tune',
    });

    // Create fine-tuning job
    const response = await openai.fineTuning.jobs.create({
      training_file: file.id,
      model: 'gpt-3.5-turbo',
      suffix: `immigration-${category || 'general'}-${Date.now()}`,
    });

    // Store the job in the database
    const supabase = getSupabaseClient();
    await supabase.from('fine_tuning_jobs').insert({
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
    console.error('Error creating fine-tuning job:', error);
    throw error;
  } finally {
    // Clean up the temporary file
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

/**
 * Check the status of a fine-tuning job
 */
export async function checkFineTuningJobStatus(jobId: string) {
  try {
    const response = await openai.fineTuning.jobs.retrieve(jobId);
    
    // Update the job in the database
    const supabase = getSupabaseClient();
    await supabase.from('fine_tuning_jobs').update({
      status: response.status,
      fine_tuned_model: response.fine_tuned_model,
      finished_at: response.finished_at 
        ? new Date(response.finished_at * 1000).toISOString() 
        : null,
      error: response.error ? response.error.message : null,
    }).eq('id', jobId);

    return {
      status: response.status,
      fineTunedModel: response.fine_tuned_model,
      finishedAt: response.finished_at 
        ? new Date(response.finished_at * 1000).toISOString() 
        : null,
    };
  } catch (error) {
    console.error('Error checking fine-tuning job status:', error);
    throw error;
  }
}

/**
 * List all fine-tuning jobs
 */
export async function listFineTuningJobs() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('fine_tuning_jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error listing fine-tuning jobs:', error);
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
    const supabase = getSupabaseClient();
    await supabase.from('fine_tuning_jobs').update({
      status: response.status,
    }).eq('id', jobId);

    return {
      status: response.status,
    };
  } catch (error) {
    console.error('Error canceling fine-tuning job:', error);
    throw error;
  }
}

/**
 * Get all fine-tuned models
 */
export async function listFineTunedModels() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('fine_tuning_jobs')
    .select('*')
    .eq('status', 'succeeded')
    .is('fine_tuned_model', 'not.null')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error listing fine-tuned models:', error);
    throw error;
  }

  return data as FineTuningJob[];
}

/**
 * Update models list with fine-tuned models
 */
export async function registerFineTunedModelsInSystem() {
  const fineTunedModels = await listFineTunedModels();
  
  // Logic to register models in the system
  // This would update your models registry to include the fine-tuned models
  return fineTunedModels;
} 