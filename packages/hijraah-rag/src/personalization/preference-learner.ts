import { createClient } from "@supabase/supabase-js";
import { UserFeedback } from "../types.js";

export interface PreferenceWeight {
  keyword: string;
  weight: number; // 0-5
}

export class PreferenceLearner {
  private supabase;

  constructor() {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getUserWeights(userId: string): Promise<PreferenceWeight[]> {
    const { data, error } = await this.supabase
      .from("user_query_history")
      .select("feedback_text, feedback_score")
      .eq("user_id", userId)
      .gt("feedback_score", 3);

    if (error || !data) return [];

    const wordCounts: Record<string, number> = {};

    data.forEach((row) => {
      const words = row.feedback_text?.split(/\W+/) || [];
      words.forEach((w: string) => {
        const key = w.toLowerCase();
        if (key.length < 4) return;
        wordCounts[key] = (wordCounts[key] || 0) + 1;
      });
    });

    return Object.entries(wordCounts)
      .map(([k, v]) => ({ keyword: k, weight: Math.min(v, 5) }))
      .sort((a, b) => b.weight - a.weight);
  }

  // Context7 Pattern: Learn from user feedback
  async learnFromFeedback(
    userId: string,
    feedback: UserFeedback,
    resultContent: string,
  ): Promise<void> {
    // Positive feedback increases weights for keywords in the result
    if (
      feedback.type === "thumbs_up" ||
      (feedback.type === "rating" && Number(feedback.value) >= 4)
    ) {
      const keywords = this.extractKeywords(resultContent);

      // Update preference weights
      for (const keyword of keywords) {
        await this.updateKeywordWeight(userId, keyword, 1);
      }
    } else if (
      feedback.type === "thumbs_down" ||
      (feedback.type === "rating" && Number(feedback.value) <= 2)
    ) {
      const keywords = this.extractKeywords(resultContent);

      // Decrease weights for keywords in poor results
      for (const keyword of keywords) {
        await this.updateKeywordWeight(userId, keyword, -0.5);
      }
    }

    // Store feedback for future analysis
    await this.supabase.from("user_feedback").insert({
      user_id: userId,
      result_id: feedback.resultId,
      feedback_type: feedback.type,
      feedback_value: feedback.value,
      comment: feedback.comment,
      created_at: feedback.timestamp.toISOString(),
    });
  }

  private extractKeywords(text: string): string[] {
    const words = text.toLowerCase().split(/\W+/);
    const stopWords = new Set([
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "from",
      "about",
      "as",
      "is",
      "was",
      "are",
      "were",
      "been",
      "be",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "must",
      "can",
      "this",
      "that",
      "these",
      "those",
      "i",
      "you",
      "he",
      "she",
      "it",
      "we",
      "they",
      "what",
      "which",
    ]);

    return words.filter((w) => w.length >= 4 && !stopWords.has(w)).slice(0, 20); // Top 20 keywords
  }

  private async updateKeywordWeight(
    userId: string,
    keyword: string,
    delta: number,
  ): Promise<void> {
    // Check if preference exists
    const { data: existing } = await this.supabase
      .from("user_keyword_preferences")
      .select("weight")
      .eq("user_id", userId)
      .eq("keyword", keyword)
      .maybeSingle();

    if (existing) {
      const newWeight = Math.max(0, Math.min(5, existing.weight + delta));
      await this.supabase
        .from("user_keyword_preferences")
        .update({
          weight: newWeight,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("keyword", keyword);
    } else {
      await this.supabase.from("user_keyword_preferences").insert({
        user_id: userId,
        keyword,
        weight: Math.max(0, delta),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }

  // Context7 Pattern: Get personalized ranking factors
  async getPersonalizationFactors(userId: string): Promise<{
    keywordWeights: Map<string, number>;
    categoryPreferences: Map<string, number>;
    complexityLevel: "basic" | "intermediate" | "advanced";
  }> {
    // Get keyword weights
    const { data: keywords } = await this.supabase
      .from("user_keyword_preferences")
      .select("keyword, weight")
      .eq("user_id", userId)
      .order("weight", { ascending: false })
      .limit(100);

    const keywordWeights = new Map<string, number>();
    (keywords || []).forEach((k) => {
      keywordWeights.set(k.keyword, k.weight);
    });

    // Get category preferences from interaction history
    const { data: categories } = await this.supabase
      .from("user_category_preferences")
      .select("category, score")
      .eq("user_id", userId);

    const categoryPreferences = new Map<string, number>();
    (categories || []).forEach((c) => {
      categoryPreferences.set(c.category, c.score);
    });

    // Determine complexity level based on query history
    const { data: profile } = await this.supabase
      .from("user_profiles")
      .select("preferred_complexity")
      .eq("user_id", userId)
      .maybeSingle();

    const complexityLevel = profile?.preferred_complexity || "intermediate";

    return {
      keywordWeights,
      categoryPreferences,
      complexityLevel,
    };
  }
}
