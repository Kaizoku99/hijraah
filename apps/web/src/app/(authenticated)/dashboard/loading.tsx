import { Skeleton } from "@/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 h-screen border-r">
          <Skeleton className="h-screen w-full" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-28" />
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Skeleton className="h-28 w-full rounded-lg" />
              <Skeleton className="h-28 w-full rounded-lg" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
