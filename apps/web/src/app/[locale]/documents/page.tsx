"use client";

import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "@/components/ui/dashboard/DashboardSkeleton";
import { DocumentsList } from "@/components/ui/dashboard/DocumentsList";
import { useClientLocale } from "@/hooks/use-client-locale";
import { isRTL } from "@/i18n/i18n";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Document } from "@/types/documents";

// Mock API function (Replace with actual data fetching)
const fetchDocuments = async (): Promise<Document[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Return mock data (Adjust based on actual Document type)
  const mockDocuments: Document[] = [
    {
      id: "doc1",
      name: "Passport Scan",
      status: "ready",
      created_at: new Date().toISOString(),
      file_type: "pdf",
      file_size: 1024 * 500,
      description: "Scan of main passport page.",
      user_id: "mock-user-1",
      case_id: "1",
      file_path: "/mock/passport.pdf",
      metadata: null,
      updated_at: new Date().toISOString(),
      category_id: "cat-id-1",
      session_id: null,
    },
    {
      id: "doc2",
      name: "Application Form",
      status: "processing",
      created_at: new Date().toISOString(),
      file_type: "pdf",
      file_size: 1024 * 1200,
      description: "Completed IMM 1294 form.",
      user_id: "mock-user-1",
      case_id: "1",
      file_path: "/mock/app_form.pdf",
      metadata: null,
      updated_at: new Date().toISOString(),
      category_id: "cat-id-2",
      session_id: null,
    },
    {
      id: "doc3",
      name: "Proof of Funds",
      status: "error",
      created_at: new Date().toISOString(),
      file_type: "jpg",
      file_size: 1024 * 800,
      description: "Bank statement.",
      user_id: "mock-user-2",
      case_id: "2",
      file_path: "/mock/funds.jpg",
      metadata: { error_message: "Invalid file format" },
      updated_at: new Date().toISOString(),
      category_id: "cat-id-3",
      session_id: null,
    },
    {
      id: "doc4",
      name: "Utility Bill",
      status: "verified",
      created_at: new Date().toISOString(),
      file_type: "png",
      file_size: 1024 * 300,
      description: "Proof of address.",
      user_id: "mock-user-1",
      case_id: null,
      file_path: "/mock/utility.png",
      metadata: null,
      updated_at: new Date().toISOString(),
      category_id: "cat-id-4",
      session_id: null,
    },
  ];
  return mockDocuments;
};

export default function DocumentsPage() {
  const t = useTranslations("documents");
  const locale = useClientLocale();
  const rtl = isRTL(locale);
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      try {
        const fetchedDocs = await fetchDocuments();
        setDocuments(fetchedDocs);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        // Handle error state here
      } finally {
        setIsLoading(false);
      }
    };
    loadDocuments();
  }, []);

  const handleDataUpdate = async () => {
    setIsLoading(true);
    try {
      const fetchedDocs = await fetchDocuments();
      setDocuments(fetchedDocs);
    } catch (error) {
      console.error("Failed to refresh documents:", error);
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
          <Link href="/documents/upload">
            <PlusCircle className={cn("h-4 w-4", rtl ? "ml-2" : "mr-2")} />
            {t("uploadButton")}
          </Link>
        </Button>
      </div>
      {/* TODO: Add filtering/sorting options here if needed */}
      {isLoading ? (
        <DashboardSkeleton section="documents" /> // Assuming skeleton handles a 'documents' variant
      ) : (
        <DocumentsList
          documents={documents}
          onDocumentUpdated={handleDataUpdate}
        />
      )}
    </div>
  );
}
