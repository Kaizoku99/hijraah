/**
 * User Experience Data Collection Tasks (Task 4.1)
 * 
 * Implements:
 * - collectUserExperience task triggered by user milestone events
 * - processDocumentUploads task using DocumentProcessor pattern
 * - gamifyContributions task for leaderboard updates
 * - validateExperienceData task using AI SDK
 * - Real-time notifications with Trigger.dev webhooks
 */

import { task, schedules } from "@trigger.dev/sdk/v3";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import { EnhancedDocumentProcessor } from "@hijraah/documents";
import { 
  UserMilestoneEventSchema, 
  ExperienceDataSchema, 
  DocumentUploadSchema,
  QualityAssessmentSchema,
  ValidationResultSchema,
  NotificationSchema,
  CommunityTaskContextSchema,
  type UserMilestoneEvent,
  type ExperienceData,
  type DocumentUpload,
  type QualityAssessment,
  type ValidationResult,
  type Notification,
} from "./types.js";
import { z } from "zod";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Initialize document processor
const documentProcessor = new EnhancedDocumentProcessor({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
  enableCaching: true,
  cachePrefix: "hijraah:community-docs",
  cacheTTL: 3600,
});

/**
 * Task 4.1.1: Collect User Experience Data
 * Triggered by user milestone events using Trigger.dev's event system
 */
export const collectUserExperienceTask = task({
  id: "collect-user-experience",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: UserMilestoneEvent, { ctx }) => {
    console.log(`🎯 Collecting user experience for milestone: ${payload.milestone}`);
    
    try {
      // Validate input
      const validatedPayload = UserMilestoneEventSchema.parse(payload);
      
      // Check if user has already submitted experience for this milestone
      const { data: existingExperience } = await supabase
        .from("community_experiences")
        .select("id")
        .eq("user_id", validatedPayload.userId)
        .eq("milestone", validatedPayload.milestone)
        .eq("pathway", validatedPayload.pathway)
        .single();

      if (existingExperience) {
        console.log(`📝 User already has experience for milestone: ${validatedPayload.milestone}`);
        return {
          success: true,
          action: "skipped",
          reason: "Experience already exists",
          experienceId: existingExperience.id,
        };
      }

      // Generate personalized experience collection prompt
      const experiencePrompt = await generateText({
        model: openai("gpt-4o-mini"),
        messages: [
          {
            role: "system",
            content: `You are an immigration experience collector. Generate a personalized prompt to collect user experience data for the milestone "${validatedPayload.milestone}" in the "${validatedPayload.pathway}" pathway for ${validatedPayload.targetCountry}.

The prompt should ask for:
1. Actual timeline (in days)
2. Actual costs incurred
3. Difficulty level (1-10)
4. Success status
5. Detailed feedback
6. Any supporting documents

Make it conversational and encouraging.`,
          },
          {
            role: "user",
            content: `Generate experience collection prompt for milestone: ${validatedPayload.milestone}`,
          },
        ],
        maxTokens: 500,
        temperature: 0.7,
      });

      // Create experience collection request
      const { data: experienceRequest, error } = await supabase
        .from("community_experiences")
        .insert({
          user_id: validatedPayload.userId,
          pathway: validatedPayload.pathway,
          target_country: validatedPayload.targetCountry,
          milestone: validatedPayload.milestone,
          actual_timeline: 0, // Will be updated when user provides data
          actual_cost: 0,
          difficulty: 5,
          success: false,
          feedback: "Pending user input",
          verification_status: "pending",
          metadata: {
            collectionPrompt: experiencePrompt.text,
            triggeredAt: validatedPayload.timestamp,
            taskId: ctx.task.id,
            runId: ctx.run.id,
          },
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create experience request: ${error.message}`);
      }

      // Send notification to user
      await sendNotificationTask.trigger({
        userId: validatedPayload.userId,
        type: "milestone_reminder",
        title: `Share Your ${validatedPayload.milestone} Experience`,
        message: experiencePrompt.text || "Please share your experience to help other users.",
        priority: "medium",
        metadata: {
          experienceId: experienceRequest.id,
          milestone: validatedPayload.milestone,
          pathway: validatedPayload.pathway,
        },
      });

      console.log(`✅ Experience collection request created: ${experienceRequest.id}`);
      
      return {
        success: true,
        action: "created",
        experienceId: experienceRequest.id,
        prompt: experiencePrompt.text,
        metadata: {
          milestone: validatedPayload.milestone,
          pathway: validatedPayload.pathway,
          targetCountry: validatedPayload.targetCountry,
        },
      };

    } catch (error) {
      console.error("❌ Failed to collect user experience:", error);
      throw error;
    }
  },
});

/**
 * Task 4.1.2: Process Document Uploads
 * Uses existing DocumentProcessor pattern with Firecrawl for web content and Mistral OCR for files
 */
export const processDocumentUploadsTask = task({
  id: "process-document-uploads",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: DocumentUpload, { ctx }) => {
    console.log(`📄 Processing document upload for user: ${payload.userId}`);
    
    try {
      // Validate input
      const validatedPayload = DocumentUploadSchema.parse(payload);
      
      let processingResult;
      
      // Process based on input type
      if (validatedPayload.url) {
        // Web content processing with Firecrawl
        console.log(`🌐 Processing web document: ${validatedPayload.url}`);
        processingResult = await documentProcessor.processDocument(validatedPayload.url, {
          enableChunking: true,
          chunkSize: 1000,
          enableEmbeddings: true,
          enablePIIDetection: true,
          enableEntityExtraction: true,
        });
      } else if (validatedPayload.fileBuffer) {
        // File processing with Mistral OCR
        console.log(`📁 Processing file upload: ${validatedPayload.fileName}`);
        processingResult = await documentProcessor.processDocument(validatedPayload.fileBuffer, {
          enableChunking: true,
          chunkSize: 1000,
          enableEmbeddings: true,
          enablePIIDetection: true,
          enableEntityExtraction: true,
        });
      } else if (validatedPayload.content) {
        // Direct text content
        console.log(`📝 Processing text content`);
        processingResult = await documentProcessor.processDocument(validatedPayload.content, {
          enableChunking: true,
          chunkSize: 1000,
          enableEmbeddings: true,
          enablePIIDetection: true,
          enableEntityExtraction: true,
        });
      } else {
        throw new Error("No valid input provided for document processing");
      }

      // Extract immigration-specific information using AI
      const immigrationAnalysis = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          documentType: z.enum(["receipt", "certificate", "timeline_proof", "correspondence", "other"]),
          relevantInformation: z.array(z.string()),
          timeline: z.object({
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            duration: z.number().optional(),
          }).optional(),
          costs: z.array(z.object({
            amount: z.number(),
            currency: z.string(),
            description: z.string(),
          })).optional(),
          entities: z.array(z.string()),
          confidence: z.number().min(0).max(1),
        }),
        messages: [
          {
            role: "system",
            content: `You are an immigration document analyzer. Analyze the following document content and extract relevant immigration information including timelines, costs, entities, and other important details.`,
          },
          {
            role: "user",
            content: `Analyze this immigration document:\n\n${processingResult.document.content.slice(0, 4000)}`,
          },
        ],
      });

      // Store processed document
      const { data: storedDocument, error } = await supabase
        .from("documents")
        .insert({
          user_id: validatedPayload.userId,
          title: processingResult.document.title || validatedPayload.fileName || "Uploaded Document",
          content: processingResult.document.content,
          content_type: processingResult.document.format,
          file_size: processingResult.document.content.length,
          source: validatedPayload.url || validatedPayload.fileName,
          metadata: {
            ...processingResult.document.metadata,
            immigrationAnalysis: immigrationAnalysis.object,
            processingStats: {
              processingTime: processingResult.processingTime,
              chunksGenerated: processingResult.chunksGenerated,
              embeddingsGenerated: processingResult.embeddingsGenerated,
              entitiesExtracted: processingResult.entitiesExtracted,
            },
            taskId: ctx.task.id,
            runId: ctx.run.id,
          },
          is_processed: true,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to store document: ${error.message}`);
      }

      // Store document chunks if available
      if (processingResult.document.chunks && processingResult.document.chunks.length > 0) {
        const chunks = processingResult.document.chunks.map((chunk, index) => ({
          document_id: storedDocument.id,
          chunk_index: index,
          text_content: chunk.content,
          embedding: chunk.embedding,
          token_count: chunk.content.length / 4, // Rough estimate
          entities: immigrationAnalysis.object.entities,
          chunk_metadata: chunk.metadata,
        }));

        const { error: chunksError } = await supabase
          .from("document_chunks_enhanced")
          .insert(chunks);

        if (chunksError) {
          console.warn("⚠️ Failed to store document chunks:", chunksError);
        }
      }

      // Link to experience if provided
      if (validatedPayload.experienceId) {
        const { error: linkError } = await supabase
          .from("community_experiences")
          .update({
            metadata: {
              supportingDocuments: [storedDocument.id],
            },
          })
          .eq("id", validatedPayload.experienceId);

        if (linkError) {
          console.warn("⚠️ Failed to link document to experience:", linkError);
        }
      }

      console.log(`✅ Document processed successfully: ${storedDocument.id}`);
      
      return {
        success: true,
        documentId: storedDocument.id,
        processingStats: {
          processingTime: processingResult.processingTime,
          chunksGenerated: processingResult.chunksGenerated,
          embeddingsGenerated: processingResult.embeddingsGenerated,
          entitiesExtracted: processingResult.entitiesExtracted,
        },
        immigrationAnalysis: immigrationAnalysis.object,
        metadata: {
          documentType: validatedPayload.documentType,
          fileName: validatedPayload.fileName,
          url: validatedPayload.url,
        },
      };

    } catch (error) {
      console.error("❌ Failed to process document upload:", error);
      throw error;
    }
  },
});

/**
 * Task 4.1.3: Validate Experience Data
 * Uses AI SDK's generateObject() with quality assessment schemas and Trigger.dev's batch processing
 */
export const validateExperienceDataTask = task({
  id: "validate-experience-data",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 15000,
  },
  run: async (payload: { experienceId: string }, { ctx }) => {
    console.log(`🔍 Validating experience data: ${payload.experienceId}`);
    
    try {
      // Fetch experience data
      const { data: experience, error } = await supabase
        .from("community_experiences")
        .select("*")
        .eq("id", payload.experienceId)
        .single();

      if (error || !experience) {
        throw new Error(`Experience not found: ${payload.experienceId}`);
      }

      // Fetch similar experiences for comparison
      const { data: similarExperiences } = await supabase
        .from("community_experiences")
        .select("*")
        .eq("pathway", experience.pathway)
        .eq("target_country", experience.target_country)
        .eq("milestone", experience.milestone)
        .eq("verification_status", "verified")
        .limit(10);

      // AI-powered quality assessment
      const qualityAssessment = await generateObject({
        model: openai("gpt-4o"),
        schema: QualityAssessmentSchema,
        messages: [
          {
            role: "system",
            content: `You are an immigration experience validator. Assess the quality of user-submitted immigration experience data by evaluating accuracy, completeness, consistency, and reliability.

Consider:
1. Accuracy: Does the data seem realistic and plausible?
2. Completeness: Is all required information provided?
3. Consistency: Is the data internally consistent?
4. Reliability: Does it align with similar experiences?

Provide scores from 0-1 for each dimension and an overall score.`,
          },
          {
            role: "user",
            content: `Validate this immigration experience:

Experience Data:
- Pathway: ${experience.pathway}
- Country: ${experience.target_country}
- Milestone: ${experience.milestone}
- Timeline: ${experience.actual_timeline} days
- Cost: $${experience.actual_cost}
- Difficulty: ${experience.difficulty}/10
- Success: ${experience.success}
- Feedback: ${experience.feedback}

Similar Experiences for Comparison:
${similarExperiences?.map(exp => 
  `- Timeline: ${exp.actual_timeline} days, Cost: $${exp.actual_cost}, Success: ${exp.success}`
).join('\n') || 'No similar experiences found'}`,
          },
        ],
      });

      // Generate validation result
      const validationResult = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: ValidationResultSchema,
        messages: [
          {
            role: "system",
            content: `Based on the quality assessment, determine if this experience data is valid and should be accepted into the community database.`,
          },
          {
            role: "user",
            content: `Quality Assessment Results:
${JSON.stringify(qualityAssessment.object, null, 2)}

Make a validation decision.`,
          },
        ],
      });

      // Update experience with validation results
      const { error: updateError } = await supabase
        .from("community_experiences")
        .update({
          quality_score: qualityAssessment.object.overall,
          verification_status: validationResult.object.isValid ? "verified" : "disputed",
          metadata: {
            ...experience.metadata,
            qualityAssessment: qualityAssessment.object,
            validationResult: validationResult.object,
            validatedAt: new Date().toISOString(),
            validatedBy: "ai-system",
            taskId: ctx.task.id,
            runId: ctx.run.id,
          },
        })
        .eq("id", payload.experienceId);

      if (updateError) {
        throw new Error(`Failed to update experience: ${updateError.message}`);
      }

      // Create validation record
      const { error: validationError } = await supabase
        .from("community_validations")
        .insert({
          experience_id: payload.experienceId,
          validator_user_id: "system", // System validation
          validation_type: "automated",
          score: qualityAssessment.object.overall,
          feedback: validationResult.object.issues.join("; "),
          confidence: validationResult.object.confidence,
          metadata: {
            qualityAssessment: qualityAssessment.object,
            validationResult: validationResult.object,
            similarExperiencesCount: similarExperiences?.length || 0,
          },
        });

      if (validationError) {
        console.warn("⚠️ Failed to create validation record:", validationError);
      }

      // Trigger reputation update if valid
      if (validationResult.object.isValid) {
        await updateUserReputationTask.trigger({
          userId: experience.user_id,
          action: "contribution",
          impact: qualityAssessment.object.overall,
          details: {
            experienceId: payload.experienceId,
            qualityScore: qualityAssessment.object.overall,
          },
        });
      }

      console.log(`✅ Experience validation completed: ${payload.experienceId}`);
      
      return {
        success: true,
        experienceId: payload.experienceId,
        isValid: validationResult.object.isValid,
        qualityScore: qualityAssessment.object.overall,
        confidence: validationResult.object.confidence,
        qualityAssessment: qualityAssessment.object,
        validationResult: validationResult.object,
        metadata: {
          similarExperiencesCount: similarExperiences?.length || 0,
          verificationStatus: validationResult.object.isValid ? "verified" : "disputed",
        },
      };

    } catch (error) {
      console.error("❌ Failed to validate experience data:", error);
      throw error;
    }
  },
});

/**
 * Task 4.1.4: Send Real-time Notifications
 * Uses Trigger.dev's webhook integration with Supabase real-time subscriptions
 */
export const sendNotificationTask = task({
  id: "send-notification",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 5000,
  },
  run: async (payload: Notification, { ctx }) => {
    console.log(`📢 Sending notification to user: ${payload.userId}`);
    
    try {
      // Validate input
      const validatedPayload = NotificationSchema.parse(payload);
      
      // Store notification in database
      const { data: notification, error } = await supabase
        .from("notifications")
        .insert({
          user_id: validatedPayload.userId,
          type: validatedPayload.type,
          title: validatedPayload.title,
          message: validatedPayload.message,
          action_url: validatedPayload.actionUrl,
          priority: validatedPayload.priority,
          metadata: {
            ...validatedPayload.metadata,
            taskId: ctx.task.id,
            runId: ctx.run.id,
            sentAt: new Date().toISOString(),
          },
          is_read: false,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to store notification: ${error.message}`);
      }

      // Send real-time notification via Supabase
      const { error: realtimeError } = await supabase
        .channel(`user:${validatedPayload.userId}`)
        .send({
          type: "broadcast",
          event: "notification",
          payload: {
            id: notification.id,
            type: validatedPayload.type,
            title: validatedPayload.title,
            message: validatedPayload.message,
            priority: validatedPayload.priority,
            actionUrl: validatedPayload.actionUrl,
            createdAt: notification.created_at,
          },
        });

      if (realtimeError) {
        console.warn("⚠️ Failed to send real-time notification:", realtimeError);
      }

      console.log(`✅ Notification sent successfully: ${notification.id}`);
      
      return {
        success: true,
        notificationId: notification.id,
        userId: validatedPayload.userId,
        type: validatedPayload.type,
        priority: validatedPayload.priority,
        sentAt: new Date().toISOString(),
      };

    } catch (error) {
      console.error("❌ Failed to send notification:", error);
      throw error;
    }
  },
});

// Import the reputation task (will be defined in gamification.ts)
import { updateUserReputationTask } from "./gamification.js";

// Export all tasks
export {
  collectUserExperienceTask,
  processDocumentUploadsTask,
  validateExperienceDataTask,
  sendNotificationTask,
};