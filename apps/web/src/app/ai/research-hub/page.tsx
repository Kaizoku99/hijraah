"use client";

import { useSearchParams } from "next/navigation";

import { ResearchSessionManager } from "@/components/ui/research/session-manager";

// Assuming ImplementationSummary is also moved or its path is updated
// If it's moved, the path should be relative to the new location
// e.g., import { ImplementationSummary } from "./components/ImplementationSummary";
// If it stays in (ai-features), the path needs to be absolute or adjusted
// For now, let's assume it moves. If not, this import needs fixing.
import { ImplementationSummary } from "./components/ImplementationSummary";

export default function UnifiedResearchPage() {
  // Renamed function
  const searchParams = useSearchParams();
  const initialSessionId = searchParams.get("session") || undefined;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Unified Research Center</h1>
      <p className="text-muted-foreground mb-8">
        Create and manage research sessions for immigration cases and documents.
        Each session can utilize AI-powered deep research to gather information.
      </p>

      <ResearchSessionManager initialSelectedSessionId={initialSessionId} />

      {/* Implementation details for developers */}
      {/* Ensure ImplementationSummary component exists at the expected path */}
      <ImplementationSummary />
    </div>
  );
}
