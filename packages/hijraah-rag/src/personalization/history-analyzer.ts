import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { UserInteraction } from "../types.js";

export interface HistoricalInterest {
  entity: string;
  score: number;
}

export class QueryHistoryAnalyzer {
  private supabase;
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getTopInterests(
    userId: string,
    limit = 5,
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
      const content = response.choices[0].message.content ?? "{}";
      const parsed = JSON.parse(content);
      return parsed.interests || parsed.entities || [];
    } catch {
      return [];
    }
  }

  // Context7 Pattern: Track user interaction patterns
  async analyzeInteractionPatterns(
    userId: string,
    days = 30,
  ): Promise<{
    queryFrequency: number;
    topCategories: string[];
    timePatterns: { hour: number; count: number }[];
  }> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await this.supabase
      .from("user_query_history")
      .select("query_text, created_at")
      .eq("user_id", userId)
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    if (error || !data) {
      return {
        queryFrequency: 0,
        topCategories: [],
        timePatterns: [],
      };
    }

    // Calculate query frequency (queries per day)
    const queryFrequency = data.length / days;

    // Extract categories from queries
    const categories = await this.extractCategories(
      data.map((d) => d.query_text),
    );

    // Analyze time patterns
    const hourCounts = new Map<number, number>();
    data.forEach((d) => {
      const hour = new Date(d.created_at).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    const timePatterns = Array.from(hourCounts.entries())
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour - b.hour);

    return {
      queryFrequency,
      topCategories: categories.slice(0, 5),
      timePatterns,
    };
  }

  private async extractCategories(queries: string[]): Promise<string[]> {
    if (queries.length === 0) return [];

    const sample = queries.slice(0, 20).join("\n");

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Extract the main immigration categories from these queries. Return JSON array of category names, ordered by frequency.",
          },
          { role: "user", content: sample },
        ],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content ?? "{}";
      const parsed = JSON.parse(content);
      return parsed.categories || [];
    } catch {
      return [];
    }
  }

  // Context7 Pattern: Create user interaction records
  async recordInteraction(
    userId: string,
    interaction: UserInteraction,
  ): Promise<void> {
    await this.supabase.from("user_interactions").insert({
      user_id: userId,
      type: interaction.type,
      content: interaction.content,
      metadata: interaction.metadata,
      created_at: interaction.timestamp.toISOString(),
    });
  }
}
