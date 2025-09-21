"use client";

import { type ComponentProps, memo } from "react";
import { Streamdown } from "streamdown";

import { cn } from "@/lib/utils";

type ResponseProps = ComponentProps<typeof Streamdown> & {
  isStreaming?: boolean;
  onContentUpdate?: (content: string) => void;
};

export const Response = memo(
  ({
    className,
    isStreaming: _isStreaming,
    onContentUpdate: _onContentUpdate,
    ...props
  }: ResponseProps) => (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";
