/**
 * @deprecated This file is maintained for backward compatibility.
 * Please import from '@/ui/molecules/form-error' instead.
 */

"use client";

import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
  id?: string;
}

export function FormError({ message, id }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      id={id}
      className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive"
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
