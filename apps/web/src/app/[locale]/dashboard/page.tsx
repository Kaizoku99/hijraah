"use client";

import { Map } from "lucide-react"; // Import Map icon
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CasesList } from "@/components/ui/dashboard/CasesList";
import { DashboardActions } from "@/components/ui/dashboard/DashboardActions";
import { DashboardSkeleton } from "@/components/ui/dashboard/DashboardSkeleton"; // Import skeleton
import { DashboardStats } from "@/components/ui/dashboard/DashboardStats";
import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { Link } from "@/i18n/navigation"; // Use locale-aware Link
import { cn } from "@/lib/utils";
import { Case } from "@/types/cases"; // Correct the import path for Case type
import { Document } from "@/types/documents"; // Assuming types are defined


// Mock API functions (Replace with actual data fetching)
const fetchDashboardData = async (): Promise<{
  cases: Case[];
  documents: Document[];
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Simplified mock data focusing on core fields
  const mockCases: Case[] = [
    {
      id: "1",
      user_id: "mock-user-1",
      title: "Case Alpha",
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
      user_id: "mock-user-2",
      title: "Case Beta",
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
      id: "3",
      user_id: "mock-user-1",
      title: "Case Gamma",
      status: "completed",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      case_type: "student_visa",
      destination_country: "UK",
      description: "Completed case.",
      current_stage: "completed",
      requirements: undefined,
      notes: undefined,
      metadata: null,
    },
  ];
  const mockDocuments: Document[] = [
    {
      id: "doc1",
      name: "Passport Scan",
      status: "ready",
      created_at: new Date().toISOString(),
      file_type: "pdf",
      file_size: 1024 * 500,
      description: "Scan.",
      user_id: "mock-user-1",
      case_id: "1",
      file_path: "/mock/passport.pdf",
      updated_at: new Date().toISOString(),
      category_id: "cat-id-1",
      session_id: null,
      metadata: null,
    },
    {
      id: "doc2",
      name: "Application Form",
      status: "processing",
      created_at: new Date().toISOString(),
      file_type: "pdf",
      file_size: 1024 * 1200,
      description: "Form.",
      user_id: "mock-user-1",
      case_id: "1",
      file_path: "/mock/app_form.pdf",
      updated_at: new Date().toISOString(),
      category_id: "cat-id-2",
      session_id: null,
      metadata: null,
    },
    {
      id: "doc3",
      name: "Proof of Funds",
      status: "error",
      created_at: new Date().toISOString(),
      file_type: "jpg",
      file_size: 1024 * 800,
      description: "Statement.",
      user_id: "mock-user-2",
      case_id: "2",
      file_path: "/mock/funds.jpg",
      metadata: { error_message: "Invalid file format" },
      updated_at: new Date().toISOString(),
      category_id: "cat-id-3",
      session_id: null,
    },
  ];

  return {
    cases: mockCases,
    documents: mockDocuments,
  };
};

const createCase = async (data: Partial<Case>): Promise<void> => {
  console.log("Creating case:", data);
  // Replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 500));
};

const uploadDocument = async (data: Partial<any>): Promise<void> => {
  console.log("Uploading document:", data);
  // Replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useClientLocale();
  const rtl = isRTL(locale);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    cases: Case[];
    documents: Document[];
  }>({ cases: [], documents: [] });
  const [activeTab, setActiveTab] = useState("cases"); // Default tab

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Handle error state here, e.g., show a toast notification
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle case/doc updates to refresh list (example)
  const handleDataUpdate = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDashboardData(); // Re-fetch data
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Filter recent cases (e.g., last 5)
  const recentCases = dashboardData.cases.slice(0, 5);

  return (
    <div
      className={cn("p-4 md:p-6 lg:p-8 space-y-6", rtl ? "rtl" : "ltr")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("welcomeMessage")}</p>
        </div>
        {/* Pass props and handlers to DashboardActions */}
        <DashboardActions
          activeTab={activeTab}
          cases={dashboardData.cases}
          onCreateCase={createCase}
          onUploadDocument={uploadDocument}
        />
      </div>

      {/* Render DashboardStats with fetched data */}
      <DashboardStats
        cases={dashboardData.cases}
        documents={dashboardData.documents}
        activeTab={activeTab}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Cases Section */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("casesSectionTitle")}</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/cases">{t("viewAllCases")}</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {/* Render CasesList with fetched data */}
            <CasesList cases={recentCases} onCaseUpdated={handleDataUpdate} />
          </CardContent>
        </Card>

        {/* Quick Actions Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("quickActionsSectionTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {/* This button is now part of DashboardActions component, keep or remove based on final UI design */}
            <Button asChild>
              <Link href="/dashboard/cases/new">{t("createNewCase")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/documents/upload">{t("uploadDocument")}</Link>
            </Button>
            {/* Add link to Roadmap List Page */}
            <Button variant="secondary" asChild>
              <Link href="/roadmap">
                <Map className={cn("h-4 w-4", rtl ? "ml-2" : "mr-2")} />
                {t("viewRoadmaps")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Optional: Add a Recent Documents Section */}
      {/* <Card>
         <CardHeader>
           <CardTitle>Recent Documents</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/documents">View All Documents</Link>
            </Button>
         </CardHeader>
         <CardContent>
           <DocumentsList documents={dashboardData.documents.slice(0, 5)} onDocumentUpdated={handleDataUpdate} />
         </CardContent>
       </Card> */}
    </div>
  );
}
