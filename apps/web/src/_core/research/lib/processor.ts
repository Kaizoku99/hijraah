import { SupabaseClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";

// import { DocumentProcessor } from "@/core/documents/entities/documents/entities/documents/processor"; // This was commented out in original search, keeping as is.
// import { ResearchResult } from "@/core/research/lib/types"; // Removed this unused and problematic import
import { cache } from "@/lib/redis"; // Path from original file content, assuming cache.ts provides this
import { DomainDocument } from "@/types"; // Corrected import for Document

const CACHE_TTL = 3600; // 1 hour

export class ResearchProcessor {
  private openai: OpenAI;
  private supabase: SupabaseClient;

  constructor(apiKey: string, supabaseClient: SupabaseClient) {
    // Changed constructor
    this.openai = new OpenAI({ apiKey });
    this.supabase = supabaseClient; // Use passed client
  }

  async deepResearch(
    query: string,
    options: {
      country?: string;
      category?: string;
      depth?: "basic" | "detailed" | "comprehensive";
    }
  ): Promise<string> {
    try {
      const cacheKey = `research:${JSON.stringify({ query, options })}`; // Reinstated cache logic
      const cached = await cache.get(cacheKey); // Reinstated cache logic
      if (cached) return cached; // Reinstated cache logic

      const relevantDocs = await this.getRelevantContent(query, options);
      const context = relevantDocs.map((doc) => doc.content).join("\n---\n");

      const systemPrompt = this.getSystemPrompt(options.depth || "detailed");

      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Research Query: ${query}\n\nContext:\n${context}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 3000,
      });

      const research = response.choices[0].message.content;
      if (!research) throw new Error("Failed to generate research");

      await cache.set(cacheKey, research, CACHE_TTL); // Reinstated cache logic
      return research;
    } catch (error) {
      console.error("Research error:", error);
      throw error;
    }
  }

  private getSystemPrompt(
    depth: "basic" | "detailed" | "comprehensive"
  ): string {
    const basePrompt = `You are an expert immigration research system. Analyze the provided information and generate a comprehensive research report.

Instructions:
1. Structure the analysis clearly with sections and subsections
2. Focus on accuracy and detail
3. Cite specific requirements and conditions
4. Include relevant timelines and deadlines
5. Note any exceptions or special cases
6. Consider cost implications
7. Reference official sources when available
8. Highlight key points and takeaways`;

    switch (depth) {
      case "basic":
        return `${basePrompt}\n\nProvide a basic overview focusing on key points and essential information.`;
      case "comprehensive":
        return `${basePrompt}\n\nProvide an exhaustive analysis including:
- Historical context and policy evolution
- Comparative analysis with similar policies
- Statistical data and trends
- Expert opinions and interpretations
- Future outlook and potential changes
- Risk analysis and mitigation strategies
- Alternative pathways and options
- Case studies and precedents`;
      default:
        return `${basePrompt}\n\nProvide a detailed analysis balancing depth with clarity.`;
    }
  }

  private async getRelevantContent(
    query: string,
    options: {
      country?: string;
      category?: string;
    }
  ): Promise<DomainDocument[]> {
    const { data: documents, error } = await this.supabase
      .from("documents")
      .select("*")
      .textSearch("content", query)
      .eq("country", options.country || "")
      .eq("category", options.category || "")
      .limit(10);

    if (error) throw error;
    return documents || [];
  }
}
