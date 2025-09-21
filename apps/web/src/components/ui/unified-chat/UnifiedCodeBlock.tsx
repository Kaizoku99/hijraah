"use client";

import { cn } from "@/lib/utils";
import { CodeBlock, CodeBlockCopyButton } from "./ai-elements";

interface UnifiedCodeBlockProps {
  language: string;
  code: string;
  className?: string;
}

export function UnifiedCodeBlock({
  language,
  code,
  className,
}: UnifiedCodeBlockProps) {
  return (
    <CodeBlock 
      code={code}
      language={language}
      showLineNumbers={false}
      className={cn("my-4", className)}
    >
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}
