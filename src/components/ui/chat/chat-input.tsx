'use client';

import * as React from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { Square, ArrowUp, RotateCw, Loader2 } from 'lucide-react';

export interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  onStop?: () => void;
  onRegenerate?: () => void;
}

export function ChatInput({
  input,
  isLoading,
  onSubmit,
  onChange,
  className,
  onStop,
  onRegenerate,
}: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className={cn('relative', className)}>
      <div className="relative flex items-center">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-[60px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-20 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
          rows={1}
        />
        <div className="absolute right-2 flex items-center space-x-2">
          {isLoading ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onStop}
              className="h-8 w-8"
            >
              <Square className="h-4 w-4" />
              <span className="sr-only">Stop generating</span>
            </Button>
          ) : input.length > 0 ? (
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={isLoading}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          ) : onRegenerate ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRegenerate}
              className="h-8 w-8"
              disabled={isLoading}
            >
              <RotateCw className="h-4 w-4" />
              <span className="sr-only">Regenerate response</span>
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
} 