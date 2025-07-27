import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnifiedCodeBlock } from "@/components/ui/unified-chat/UnifiedCodeBlock"; // Adjust path as needed

import { BaseArtifactData } from "../index";

interface CodeArtifactProps {
  artifact: BaseArtifactData;
}

export const CodeArtifact: React.FC<CodeArtifactProps> = ({ artifact }) => {
  // Attempt to parse content if it's a stringified object, otherwise treat as string
  let code = "";
  let language = "plaintext";

  if (typeof artifact.content === "string") {
    try {
      const parsed = JSON.parse(artifact.content);
      if (typeof parsed === "object" && parsed !== null && parsed.code) {
        code = parsed.code;
        language = parsed.language || "plaintext";
      } else {
        code = artifact.content; // Treat as plain code string if not expected object
      }
    } catch (e) {
      code = artifact.content; // Treat as plain code string if JSON parsing fails
    }
  } else if (
    typeof artifact.content === "object" &&
    artifact.content !== null &&
    (artifact.content as any).code
  ) {
    code = (artifact.content as any).code;
    language = (artifact.content as any).language || "plaintext";
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{artifact.title || "Code Artifact"}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <UnifiedCodeBlock language={language} value={code} />
      </CardContent>
    </Card>
  );
};
