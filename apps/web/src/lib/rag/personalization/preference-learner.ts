import { createSupabaseClient } from "@/lib/utils/supabase-client";

export interface PreferenceWeight {
  keyword: string;
  weight: number; // 0-5
}

export class PreferenceLearner {
  private supabase = createSupabaseClient("service");

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
}
