"use client";

import { memo, useMemo, useState, useCallback } from "react";
import type React from "react";

import { cn } from "@/lib/utils";

import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
  Response,
} from "./ai-elements";
// Note: Let Streamdown handle code blocks & mermaid natively in v1.2

interface UnifiedMarkdownProps {
  content: string;
  className?: string;
  sources?: Array<{
    url: string;
    title?: string;
    description?: string;
    quote?: string;
  }>;
  isStreaming?: boolean;
  onContentUpdate?: (content: string) => void;
  enableCitations?: boolean;
}

export const UnifiedMarkdown = memo(function UnifiedMarkdown({
  content,
  className,
  sources = [],
  isStreaming = false,
  onContentUpdate,
  enableCitations = true,
}: UnifiedMarkdownProps) {
  const [streamingContent, setStreamingContent] = useState(content);
  const [isContentStreaming, setIsContentStreaming] = useState(false);

  // Enhanced content processing to include citations with streaming support
  const processContentWithCitations = useCallback(
    (text: string) => {
      if (!enableCitations || sources.length === 0) return text;

      // Simple citation pattern matching - in production this would be more sophisticated
      return text.replace(/\[(\d+)\]/g, (match, citationNumber) => {
        const sourceIndex = parseInt(citationNumber) - 1;
        if (sourceIndex >= 0 && sourceIndex < sources.length) {
          return `{{CITATION_${sourceIndex}}}`;
        }
        return match;
      });
    },
    [sources, enableCitations]
  );

  // Memoize processed content for performance
  const processedContent = useMemo(
    () => processContentWithCitations(content || streamingContent),
    [content, streamingContent, processContentWithCitations]
  );

  // Handle streaming content updates
  const handleContentUpdate = useCallback(
    (updatedContent: string) => {
      setStreamingContent(updatedContent);
      onContentUpdate?.(updatedContent);
    },
    [onContentUpdate]
  );

  // Custom components for Streamdown
  const streamdownComponents = useMemo(
    () => ({
      // Paragraph with citation support
      p: (props: any) => {
        const { children } = props;
        const processChildren = (children: any): any => {
          if (typeof children === "string") {
            // Look for citation placeholders
            const parts = children.split(/(\{\{CITATION_\d+\}\})/);
            return parts.map((part: string, index: number) => {
              const citationMatch = part.match(/\{\{CITATION_(\d+)\}\}/);
              if (citationMatch) {
                const sourceIndex = parseInt(citationMatch[1]);
                const source = sources[sourceIndex];
                if (source) {
                  return (
                    <InlineCitation key={index}>
                      <InlineCitationText>[cited content]</InlineCitationText>
                      <InlineCitationCard>
                        <InlineCitationCardTrigger sources={[source.url]}>
                          {sourceIndex + 1}
                        </InlineCitationCardTrigger>
                        <InlineCitationCardBody>
                          <InlineCitationCarousel>
                            <InlineCitationCarouselHeader>
                              <InlineCitationCarouselPrev />
                              <InlineCitationCarouselIndex />
                              <InlineCitationCarouselNext />
                            </InlineCitationCarouselHeader>
                            <InlineCitationCarouselContent>
                              <InlineCitationCarouselItem>
                                <InlineCitationSource
                                  title={source.title}
                                  url={source.url}
                                  description={source.description}
                                >
                                  {source.quote && (
                                    <InlineCitationQuote>
                                      {source.quote}
                                    </InlineCitationQuote>
                                  )}
                                </InlineCitationSource>
                              </InlineCitationCarouselItem>
                            </InlineCitationCarouselContent>
                          </InlineCitationCarousel>
                        </InlineCitationCardBody>
                      </InlineCitationCard>
                    </InlineCitation>
                  );
                }
              }
              return part;
            });
          }
          if (Array.isArray(children)) {
            return children.map((child: any, index: number) =>
              processChildren(child)
            );
          }
          return children;
        };

        return <p>{processChildren(children)}</p>;
      },

      // Standard markdown components
      blockquote: (props: any) => (
        <blockquote className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground">
          {props.children}
        </blockquote>
      ),

      ul: (props: any) => (
        <ul className="list-disc list-inside space-y-1 my-3">
          {props.children}
        </ul>
      ),

      ol: (props: any) => (
        <ol className="list-decimal list-inside space-y-1 my-3">
          {props.children}
        </ol>
      ),

      li: (props: any) => <li className="text-sm">{props.children}</li>,

      h1: (props: any) => (
        <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">
          {props.children}
        </h1>
      ),

      h2: (props: any) => (
        <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">
          {props.children}
        </h2>
      ),

      h3: (props: any) => (
        <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">
          {props.children}
        </h3>
      ),

      h4: (props: any) => (
        <h4 className="text-base font-medium mt-3 mb-2 text-foreground">
          {props.children}
        </h4>
      ),

      h5: (props: any) => (
        <h5 className="text-sm font-medium mt-2 mb-1 text-foreground">
          {props.children}
        </h5>
      ),

      h6: (props: any) => (
        <h6 className="text-xs font-medium mt-2 mb-1 text-foreground">
          {props.children}
        </h6>
      ),

      a: (props: any) => (
        <a
          href={props.href}
          className="text-primary underline hover:no-underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
        </a>
      ),

      table: (props: any) => (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-border rounded-md">
            {props.children}
          </table>
        </div>
      ),

      thead: (props: any) => (
        <thead className="bg-muted/50">{props.children}</thead>
      ),
      tbody: (props: any) => <tbody>{props.children}</tbody>,

      tr: (props: any) => (
        <tr className="border-b border-border hover:bg-muted/20 transition-colors">
          {props.children}
        </tr>
      ),

      th: (props: any) => (
        <th className="border-r border-border px-3 py-2 font-medium text-left text-foreground">
          {props.children}
        </th>
      ),

      td: (props: any) => (
        <td className="border-r border-border px-3 py-2 text-sm">
          {props.children}
        </td>
      ),

      hr: (props: any) => <hr className="my-6 border-border" {...props} />,

      strong: (props: any) => (
        <strong className="font-semibold text-foreground">
          {props.children}
        </strong>
      ),

      em: (props: any) => (
        <em className="italic text-muted-foreground">{props.children}</em>
      ),
    }),
    [sources]
  );

  console.log(
    "Rendering markdown content:",
    content ? content.substring(0, 50) + "..." : "undefined or empty",
    "Streaming:",
    isStreaming
  );

  if (!content && !isStreaming) {
    console.warn("Empty content in UnifiedMarkdown");
    return null;
  }

  return (
    <div
      className={cn("prose prose-sm max-w-none dark:prose-invert", className)}
    >
      <Response
        className="size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        components={streamdownComponents as any}
        isStreaming={isStreaming}
        onContentUpdate={handleContentUpdate}
      >
        {processedContent}
      </Response>
    </div>
  );
});
