import { Skeleton } from "@/components/ui/skeleton";

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
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-36" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>

            <Skeleton className="h-80 w-full rounded-lg mb-6" />

            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-60 w-full rounded-lg" />
              <Skeleton className="h-60 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
