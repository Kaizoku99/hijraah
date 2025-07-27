"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

import { UnifiedCodeBlock } from "./UnifiedCodeBlock";

interface UnifiedMarkdownProps {
  content: string;
  className?: string;
}

export const UnifiedMarkdown = memo(function UnifiedMarkdown({
  content,
  className,
}: UnifiedMarkdownProps) {
  console.log(
    "Rendering markdown content:",
    content ? content.substring(0, 50) + "..." : "undefined or empty",
  );

  if (!content) {
    console.warn("Empty content in UnifiedMarkdown");
    return null;
  }

  return (
    <ReactMarkdown
      className={cn("prose dark:prose-invert", className)}
      remarkPlugins={[remarkGfm]}
      components={{
        pre({ children }) {
          return <>{children}</>;
        },
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const code = String(children).replace(/\n$/, "");

          if (!match) {
            return (
              <code
                className={cn(
                  "rounded-md bg-muted px-1 py-0.5 font-mono text-sm",
                  className,
                )}
                {...props}
              >
                {code}
              </code>
            );
          }

          return (
            <UnifiedCodeBlock
              language={match[1]}
              code={code}
              className={className}
              {...props}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
});
