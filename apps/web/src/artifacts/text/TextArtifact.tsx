import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnifiedMarkdown } from "@/components/ui/unified-chat/UnifiedMarkdown"; // Adjust path as needed

import { BaseArtifactData } from "../index"; // Assuming index.ts is one level up

interface TextArtifactProps {
  artifact: BaseArtifactData;
}

export const TextArtifact: React.FC<TextArtifactProps> = ({ artifact }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{artifact.title || "Text Artifact"}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {typeof artifact.content === "string" ? (
          <UnifiedMarkdown content={artifact.content} />
        ) : (
          <pre className="text-xs text-muted-foreground">
            Invalid content format
          </pre>
        )}
      </CardContent>
    </Card>
  );
};
