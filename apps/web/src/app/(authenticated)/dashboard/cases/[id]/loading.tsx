import { Skeleton } from '@/components/ui/skeleton';

export default function CaseDetailLoading() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center space-x-4 mb-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-16" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <Skeleton className="h-64 w-full rounded-lg" />

                    <div className="space-y-4">
                        <Skeleton className="h-8 w-48" />
                        <div className="space-y-2">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-3/4" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-60 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
} 