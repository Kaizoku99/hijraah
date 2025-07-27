import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { OpenAI } from "openai";

export interface HistoricalInterest {
  entity: string;
  score: number;
}

export class QueryHistoryAnalyzer {
  private supabase = createSupabaseClient("service");
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async getTopInterests(
    userId: string,
    limit = 5
  ): Promise<HistoricalInterest[]> {
    const { data, error } = await this.supabase
      .from("user_query_history")
      .select("query_text")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) return [];

    const combined = data.map((d) => d.query_text).join("\n");

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Analyze the user's past queries and extract the top immigration-related entities (countries, visa types, programs). Return JSON array of {entity, score}. Score 1-5 importance.",
        },
        { role: "user", content: combined.slice(0, 4000) },
      ],
      response_format: { type: "json_object" },
    });

    try {
      return JSON.parse(response.choices[0].message.content ?? "[]");
    } catch {
      return [];
    }
  }
}
