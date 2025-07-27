"use client";

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Using a fallback style for syntax highlighting
const codeStyle = {
  backgroundColor: "#1a1a1a",
  color: "#e6e6e6",
  padding: "1em",
  borderRadius: "0.375rem",
  fontSize: "0.875rem",
  lineHeight: "1.5",
};
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  const components: Components = {
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !className?.startsWith("language-");

      return !isInline && match ? (
        <SyntaxHighlighter language={match[1]} PreTag="div">
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline"
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto">
        <table className="border-collapse border border-border" {...props} />
      </div>
    ),
    th: ({ node, ...props }) => (
      <th
        className="border border-border bg-muted px-4 py-2 text-left"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className="border border-border px-4 py-2" {...props} />
    ),
    img: ({ node, ...props }) => <img className="rounded-md" {...props} />,
  };

  return (
    <div
      className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
