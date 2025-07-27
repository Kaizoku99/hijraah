"use client";

import { useTranslations } from "next-intl";

import RoadmapView from "@/components/ui/roadmap/roadmap-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { useAuth } from "@/lib/auth/hooks";
import { cn } from "@/lib/utils";

export default function RoadmapPage({
  params,
}: {
  params: { roadmapId: string };
}) {
  const t = useTranslations("roadmap");
  const locale = useClientLocale();
  const rtl = isRTL(locale);
  // useAuth returns user and isLoading, check user presence after loading
  const { user, isLoading: isLoadingAuth } = useAuth();

  const { roadmapId } = params;

  // Handle loading state for authentication
  if (isLoadingAuth) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Handle unauthenticated state after loading is complete
  if (!user) {
    // TODO: Implement proper redirect to login or show a more user-friendly error
    console.error("RoadmapPage: User is not authenticated.");
    return (
      <div className="p-8">Access Denied: Please log in to view this page.</div>
    );
  }

  // Ensure roadmapId is present
  if (!roadmapId) {
    console.error("RoadmapPage: roadmapId is missing from URL params.");
    // TODO: Handle missing ID, maybe redirect or show a 404-like message
    return <div className="p-8">Error: Roadmap ID not specified.</div>;
  }

  return (
    <div
      className={cn("p-4 md:p-6 lg:p-8", rtl ? "rtl" : "ltr")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{t("pageTitle")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <RoadmapView userId={user.id} roadmapId={roadmapId} />
    </div>
  );
}
