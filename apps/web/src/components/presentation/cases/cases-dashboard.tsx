"use client";

import { Briefcase, FileText, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import { CasesList } from "@/components/ui/dashboard/CasesList";
import { DashboardActions } from "@/components/ui/dashboard/DashboardActions";
import { DashboardStats } from "@/components/ui/dashboard/DashboardStats";
import { casesService } from "@/lib/services/cases";
import { documentsService } from "@/lib/services/documents";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useToast } from "@/ui/use-toast";

export function CasesDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("cases");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [casesData, documentsData] = await Promise.all([
        casesService.getCases(),
        documentsService.getDocuments(),
      ]);
      setCases(casesData);
      setDocuments(documentsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateCase = async (data: Partial<any>) => {
    try {
      await casesService.createCase(data);
      toast({
        title: "Success",
        description: "Case created successfully.",
      });
      fetchData();
    } catch (error) {
      console.error("Error creating case:", error);
      toast({
        title: "Error",
        description: "Failed to create case. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUploadDocument = async (data: Partial<any>) => {
    try {
      await documentsService.uploadDocument(data);
      toast({
        title: "Success",
        description: "Document uploaded successfully.",
      });
      fetchData();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Error",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <Skeleton className="h-12 w-48 mb-8" />
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cases Dashboard</h1>
        <Button onClick={() => router.push("/dashboard/cases/new")}>
          New Case
        </Button>
      </div>

      <Tabs defaultValue="cases" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
          <TabsTrigger value="cases" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden md:inline">Cases</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden md:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        <DashboardStats
          cases={cases}
          documents={documents}
          activeTab={activeTab}
        />

        <TabsContent value="cases">
          <CasesList cases={cases} onCaseUpdated={fetchData} />
        </TabsContent>

        <TabsContent value="documents">
          {/* DocumentsList would go here */}
        </TabsContent>

        <TabsContent value="analytics">
          {/* Analytics content would go here */}
        </TabsContent>
      </Tabs>

      <DashboardActions
        activeTab={activeTab}
        cases={cases}
        onCreateCase={handleCreateCase}
        onUploadDocument={handleUploadDocument}
      />
    </div>
  );
}
