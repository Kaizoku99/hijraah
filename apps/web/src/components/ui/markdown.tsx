"use client";

import React from "react";
import { Streamdown } from "streamdown";

import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
    >
      <Streamdown>{content}</Streamdown>
    </div>
  );
}
