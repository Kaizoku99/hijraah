"use client";

import { List, Map } from "lucide-react"; // Icons
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/hooks";
import { cn } from "@/lib/utils";


// Define a simple type for the roadmap list item
interface RoadmapListItem {
  id: string;
  title: string;
  description?: string | null;
  case_id?: string | null;
  case_type?: string | null;
  created_at: string;
}

// Mock function to fetch user roadmaps (Replace with actual API call)
const fetchUserRoadmaps = async (
  userId: string
): Promise<RoadmapListItem[]> => {
  console.log(`Fetching roadmaps for user: ${userId}`);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  // Replace with actual data fetching logic
  return [
    {
      id: "roadmap-123",
      title: "My Canadian Work Permit Plan",
      description: "Steps for applying for the work permit.",
      case_id: "case-abc",
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: "roadmap-456",
      title: "UK Student Visa Process",
      description: null,
      case_id: "case-def",
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: "roadmap-789",
      title: "Express Entry Profile Setup",
      description: "Initial setup guide.",
      case_id: null,
      created_at: new Date().toISOString(),
    },
  ];
};

export default function RoadmapListPage() {
  const t = useTranslations("roadmapList");
  const locale = useClientLocale();
  const rtl = isRTL(locale);
  const { user, isLoading: isLoadingAuth } = useAuth();

  const [roadmaps, setRoadmaps] = useState<RoadmapListItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      const loadRoadmaps = async () => {
        setIsLoadingData(true);
        try {
          const data = await fetchUserRoadmaps(user.id);
          setRoadmaps(data);
        } catch (error) {
          console.error("Failed to fetch roadmaps:", error);
          // TODO: Show error to user (e.g., toast notification)
        } finally {
          setIsLoadingData(false);
        }
      };
      loadRoadmaps();
    }
  }, [user]);

  // Combined loading state
  const isLoading = isLoadingAuth || (user && isLoadingData);

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-8 w-1/3 mb-2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="space-y-4 mt-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    // Should be handled by layout/middleware, but added as a safeguard
    return <div className="p-8">Access Denied: Please log in.</div>;
  }

  return (
    <div
      className={cn("p-4 md:p-6 lg:p-8", rtl ? "rtl" : "ltr")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <Map className="mr-2 h-7 w-7" /> {t("pageTitle")}
        </h1>
        <p className="text-muted-foreground mt-1">{t("description")}</p>
      </div>

      {roadmaps.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <Map className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>{t("noRoadmaps")}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Optional: Add a button to create a roadmap if applicable */}
            {/* <Button>{t('createNewRoadmap')}</Button> */}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.id}>
              <CardHeader>
                <CardTitle>{roadmap.title}</CardTitle>
                {roadmap.description && (
                  <CardDescription>{roadmap.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Created:{" "}
                  {new Date(roadmap.created_at).toLocaleDateString(locale)}
                </p>
                {roadmap.case_id && <p>Related Case: {roadmap.case_id}</p>}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild size="sm">
                  <Link href={`/roadmap/${roadmap.id}`}>
                    {t("viewRoadmap")}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
