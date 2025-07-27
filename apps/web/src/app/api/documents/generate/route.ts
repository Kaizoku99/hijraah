import { zValidator } from "@hono/zod-validator";
import { createClient } from "@supabase/supabase-js";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { z } from "zod";

import { openai } from "@/lib/openai"; // Assuming this uses the official openai package

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- Templates --- //
// (Keep the existing documentTemplates object here)
const documentTemplates = {
  "cover-letter": {
    system: `You are a professional immigration document writer...`,
  },
  "personal-statement": {
    system: `You are a professional immigration document writer...`,
  },
  "legal-brief": {
    system: `You are a professional immigration legal expert...`,
  },
  affidavit: {
    system: `You are a professional immigration document writer...`,
  },
};
type DocumentTemplate = keyof typeof documentTemplates;

// --- Schemas --- //
const GenerateRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  template: z.enum(
    Object.keys(documentTemplates) as [DocumentTemplate, ...DocumentTemplate[]]
  ),
  additionalContext: z.string().optional(),
  userId: z.string().uuid().optional(), // Optional: client might handle auth separately
});

// --- Hono App Setup --- //
const app = new Hono();

// --- Middleware --- //
app.use("*", cors());
// TODO: Add proper session/user authentication middleware

// --- Route --- //
app.post("/", zValidator("json", GenerateRequestSchema), async (c) => {
  const { prompt, template, additionalContext, userId } = c.req.valid("json");
  // TODO: Replace placeholder userId with one from auth middleware if implemented
  const effectiveUserId = userId || "placeholder-user-from-auth";

  const selectedTemplate = documentTemplates[template]; // Type checked by schema

  const messages = [
    {
      role: "system" as const,
      content: selectedTemplate.system,
    },
    {
      role: "user" as const,
      content: `Generate a ${template} with the following details:\n\n${prompt}${additionalContext ? `\n\nAdditional context: ${additionalContext}` : ""}`,
    },
  ];

  try {
    console.log(
      `[Generate Doc API] Request for template: ${template}, User: ${effectiveUserId}`
    );
    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Consider making model configurable
      messages,
      temperature: 0.7,
    });

    const generatedText = completion.choices[0]?.message?.content;

    if (!generatedText) {
      console.error("[Generate Doc API] OpenAI returned no content.");
      return c.json({ error: "Failed to generate document content" }, 502); // Bad Gateway
    }

    let saved = false;
    if (effectiveUserId !== "placeholder-user-from-auth") {
      // Only save if real userId
      try {
        const { error: insertError } = await supabaseAdmin
          .from("artifacts")
          .insert({
            user_id: effectiveUserId,
            title: `AI-Generated ${template.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}`,
            description:
              prompt.substring(0, 100) + (prompt.length > 100 ? "..." : ""),
            content: {
              text: generatedText,
              format: "markdown", // Assuming markdown format
            },
            type: "document",
            visibility: "private",
            needs_embedding: true,
            metadata: {
              template,
              generated_at: new Date().toISOString(),
              prompt,
            },
          });
        if (insertError) throw insertError;
        saved = true;
        console.log(
          `[Generate Doc API] Saved artifact for user ${effectiveUserId}`
        );
      } catch (dbError) {
        console.error("[Generate Doc API] Error saving artifact:", dbError);
        // Don't fail the request, just note that saving failed
      }
    }

    // Return generated text
    return c.json({ text: generatedText, saved });
  } catch (error) {
    console.error("[Generate Doc API] Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error generating document";
    return c.json({ error: message }, { status: 500 });
  }
});

// --- Export Hono App --- //
export const POST = handle(app);

// Optional: Specify runtime
export const runtime = "edge";
