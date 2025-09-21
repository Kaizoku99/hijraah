"use client";

import React from "react";
import { Streamdown } from "streamdown";

import { cn } from "@/lib/utils";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      <Streamdown>{content}</Streamdown>
    </div>
  );
}
