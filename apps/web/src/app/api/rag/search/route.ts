import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { RAGPipelineFactory, type RAGDependencies } from "@hijraah/rag";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const searchRequestSchema = z.object({
  query: z.string(),
  userId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, userId } = searchRequestSchema.parse(body);

    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Context7 Pattern: Create RAG dependencies and factory
    const ragDependencies: RAGDependencies = {
      supabase: supabaseClient as any,
      openai: openaiClient as any,
      firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
      mistralApiKey: process.env.MISTRAL_API_KEY,
    };

    const ragFactory = new RAGPipelineFactory(ragDependencies);
    const pipeline = ragFactory.createPipeline();

    // Context7 Pattern: Use unified query method
    const ragResult = await pipeline.query(query, { userId });

    // Generate streaming response
    const generator = ragFactory.createContextGenerator();
    return generator.generateUIStream(
      query,
      ragResult.retrievalResult,
      ragResult.retrievalResult.userContext,
    );
  } catch (error) {
    console.error("Error in RAG search API:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 },
    );
  }
}
