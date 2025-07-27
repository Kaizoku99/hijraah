import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { HybridRetriever } from "@/lib/rag/retrieval/hybrid-retriever";
import { ContextAwareGenerator } from "@/lib/rag/generation/context-generator";
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
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 1. Initialize components
    const retriever = new HybridRetriever(supabaseClient, openaiClient);
    const generator = new ContextAwareGenerator();

    // 2. Retrieve context
    const retrievalResult = await retriever.search(query, { userId });

    // 3. Generate a streaming response
    return generator.generate(
      query,
      retrievalResult,
      retrievalResult.userContext
    );
  } catch (error) {
    console.error("Error in RAG search API:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }
}
