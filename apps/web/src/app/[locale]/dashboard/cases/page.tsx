"use client";

import { PlusCircle, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CasesList } from "@/components/ui/dashboard/CasesList";
import { DashboardSkeleton } from "@/components/ui/dashboard/DashboardSkeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Case } from "@/types/cases";

// Mock API functions (Replace with actual data fetching)
const fetchCases = async (filter?: "all" | "assigned"): Promise<Case[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Return mock data (Adjust based on actual Case type and filter)
  const allCases: Case[] = [
    {
      id: "1",
      user_id: "mock-user-1",
      title: "Case Alpha - All",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      case_type: "work_visa",
      destination_country: "Canada",
      description: "First case example",
      current_stage: "document_collection",
      requirements: { passport: true },
      notes: "Initial notes.",
      metadata: null,
    },
    {
      id: "2",
      user_id: "mock-user-2", // Different user
      title: "Case Beta - All",
      status: "pending_review",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      case_type: "permanent_residence",
      destination_country: "USA",
      description: null,
      current_stage: "submission",
      requirements: undefined,
      notes: undefined,
      metadata: null,
    },
    {
      id: "4", // Assigned case example
      user_id: "current-user-id", // Assuming this matches the logged-in user
      title: "Case Delta - Assigned",
      status: "in_progress",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      case_type: "family_visa",
      destination_country: "Australia",
      description: "Family sponsorship case",
      current_stage: "review",
      requirements: undefined,
      notes: undefined,
      metadata: null,
    },
  ];

  if (filter === "assigned") {
    // Filter cases assigned to the current user (replace 'current-user-id' with actual logic)
    return allCases.filter((c) => c.user_id === "current-user-id");
  }
  return allCases;
};

export default function CasesPage() {
  const t = useTranslations("cases");
  const locale = useClientLocale();
  const rtl = isRTL(locale);
  const [isLoading, setIsLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "assigned">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadCases = async () => {
      setIsLoading(true);
      try {
        const fetchedCases = await fetchCases(activeTab);
        // Simple client-side search filtering (replace with backend search ideally)
        const filteredCases = searchTerm
          ? fetchedCases.filter(
              (c) =>
                c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : fetchedCases;
        setCases(filteredCases);
      } catch (error) {
        console.error("Failed to fetch cases:", error);
        // Handle error state here
      } finally {
        setIsLoading(false);
      }
    };
    loadCases();
  }, [activeTab, searchTerm]); // Re-fetch when tab or search term changes

  const handleDataUpdate = async () => {
    setIsLoading(true);
    try {
      const fetchedCases = await fetchCases(activeTab);
      setCases(fetchedCases); // Re-fetch and set cases
    } catch (error) {
      console.error("Failed to refresh cases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("p-4 md:p-6 lg:p-8", rtl ? "rtl" : "ltr")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t("pageTitle")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cases/new">
            <PlusCircle className={cn("h-4 w-4", rtl ? "ml-2" : "mr-2")} />
            {t("newCaseButton")}
          </Link>
        </Button>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={(value: string) =>
          setActiveTab(value as "all" | "assigned")
        }
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">{t("allCasesTab")}</TabsTrigger>
            <TabsTrigger value="assigned">{t("myCasesTab")}</TabsTrigger>
          </TabsList>
          <div className="relative w-full max-w-sm">
            <Search
              className={cn(
                "absolute h-4 w-4 text-muted-foreground top-1/2 -translate-y-1/2",
                rtl ? "right-3" : "left-3"
              )}
            />
            <Input
              placeholder={t("searchPlaceholder")}
              className={cn(rtl ? "pr-8" : "pl-8")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>{t("allCasesTab")}</CardTitle>
              <CardDescription>
                View and manage all immigration cases in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <DashboardSkeleton />
              ) : (
                <CasesList cases={cases} onCaseUpdated={handleDataUpdate} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assigned">
          <Card>
            <CardHeader>
              <CardTitle>{t("myCasesTab")}</CardTitle>
              <CardDescription>
                View and manage cases assigned directly to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <DashboardSkeleton />
              ) : (
                <CasesList cases={cases} onCaseUpdated={handleDataUpdate} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
