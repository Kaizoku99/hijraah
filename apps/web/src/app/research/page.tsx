"use client";

import { useState } from "react";
// Assuming DeepResearch component is correctly located here or this path is configured in tsconfig
import { DeepResearch } from "@/_core/research/components/DeepResearch";
import { ResearchProcessor } from "@/_core/research/lib/processor"; // Corrected import path for the processor
import { useSupabaseBrowser } from "@/lib/supabase/client"; // Import hook for browser client
import { toast } from "sonner";

// Removed global researchProcessor instantiation which used service key

export default function ResearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const supabase = useSupabaseBrowser(); // Get Supabase client instance via hook

  // Instantiate ResearchProcessor inside the component.
  // Ensure NEXT_PUBLIC_OPENAI_API_KEY is available in the environment.
  const researchProcessor = new ResearchProcessor(
    process.env.NEXT_PUBLIC_OPENAI_API_KEY || "", // Provide a fallback or ensure it's always there
    supabase, // Pass the browser client instance
  );

  const handleResearch = async (
    query: string,
    options: {
      country?: string;
      category?: string;
      depth: "basic" | "detailed" | "comprehensive";
    },
  ) => {
    setIsLoading(true);
    try {
      // researchProcessor instance now uses the browser client with anon key
      const research = await researchProcessor.deepResearch(query, options);
      setResults(research);
      toast.success("Research completed successfully");
    } catch (error) {
      console.error("Research error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to complete research",
      );
      setResults("Failed to complete research. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Deep Immigration Research</h1>
      <DeepResearch
        onResearch={handleResearch}
        isLoading={isLoading}
        results={results}
      />
    </div>
  );
}
