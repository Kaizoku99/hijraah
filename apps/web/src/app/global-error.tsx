"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error occurred:", error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-xl mb-8">
            {error.message || "An unexpected error occurred"}
          </p>
          <div className="space-x-4">
            <Button onClick={() => reset()}>Try again</Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Go home
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md text-left overflow-auto max-w-full">
              <pre className="text-sm">{error.stack}</pre>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
