import { Skeleton } from "@/ui/skeleton";

/**
 * Global loading UI for app directory
 * Reduces perceived loading time with immediate feedback
 */
export default function Loading() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header skeleton */}
      <div className="border-b border-border/5 px-4 py-3">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <div className="ml-auto">
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar skeleton */}
        <div className="w-64 border-r border-border/5 p-4">
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>

        {/* Chat area skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 space-y-4">
            {/* Message skeletons */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-xs space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>

          {/* Input skeleton */}
          <div className="border-t border-border/5 p-4">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
