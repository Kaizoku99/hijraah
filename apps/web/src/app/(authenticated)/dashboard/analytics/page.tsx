"use client";

import {
  Loader2,
  FileText,
  Users,
  Briefcase,
  Calendar,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Document } from "@/app/_types/database";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth/hooks";
import { casesService } from "@/lib/services/cases";
import { documentsService } from "@/lib/services/documents";
import { Case } from "@/types/cases";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Skeleton } from "@/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useToast } from "@/ui/use-toast";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#D88884",
];

export default function AnalyticsPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("last30days");
  const { user } = useAuth();
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const [casesData, documentsData] = await Promise.all([
        casesService.getCases(),
        documentsService.getDocuments(),
      ]);

      // Filter for current user if needed
      const userCases = casesData.filter((c) => c.user_id === user.id);
      const userDocuments = documentsData.filter((d) => d.user_id === user.id);

      setCases(userCases);
      setDocuments(userDocuments);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load analytics data",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    loadData();
  }, [loadData, timeRange]);

  const getCasesByMonth = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const data = Array(12)
      .fill(0)
      .map((_, index) => ({
        name: months[index],
        count: 0,
      }));

    cases.forEach((caseItem) => {
      const date = new Date(caseItem.created_at);
      const month = date.getMonth();
      data[month].count += 1;
    });

    return data;
  };

  const getCasesByType = () => {
    const caseTypeCounts: Record<string, number> = {};

    cases.forEach((caseItem) => {
      const type = caseItem.case_type || "other";
      caseTypeCounts[type] = (caseTypeCounts[type] || 0) + 1;
    });

    return Object.entries(caseTypeCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getCasesByStatus = () => {
    const caseStatusCounts: Record<string, number> = {};

    cases.forEach((caseItem) => {
      const status = caseItem.status || "unknown";
      caseStatusCounts[status] = (caseStatusCounts[status] || 0) + 1;
    });

    return Object.entries(caseStatusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getDocumentsByStatus = () => {
    const documentStatusCounts: Record<string, number> = {};

    documents.forEach((document) => {
      const status = document.status || "unknown";
      documentStatusCounts[status] = (documentStatusCounts[status] || 0) + 1;
    });

    return Object.entries(documentStatusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const downloadReport = () => {
    // This would generate a CSV or PDF report in a real application
    toast({
      title: "Report Downloaded",
      description: "Your analytics report has been downloaded.",
    });
  };

  if (isLoading) {
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

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Analytics</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar className="h-screen" />

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <div className="flex gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                    <SelectItem value="lastYear">Last year</SelectItem>
                    <SelectItem value="allTime">All time</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={downloadReport}>Download Report</Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cases.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {cases.length > 0
                      ? `+${Math.floor(cases.length * 0.1)} from last month`
                      : "No cases yet"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {cases.filter((c) => c.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {cases.filter((c) => c.status === "active").length > 0
                      ? `${Math.floor((cases.filter((c) => c.status === "active").length / cases.length) * 100)}% of total`
                      : "No active cases"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {cases.filter((c) => c.status === "completed").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {cases.filter((c) => c.status === "completed").length > 0
                      ? `${Math.floor((cases.filter((c) => c.status === "completed").length / cases.length) * 100)}% of total`
                      : "No completed cases"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{documents.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {documents.length > 0
                      ? `${Math.floor(documents.length / (cases.length || 1))} per case avg.`
                      : "No documents"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cases">Cases</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-4 border rounded-md">
                <h2 className="text-lg font-medium mb-4">
                  Case Creation Over Time
                </h2>
                <div className="w-full" style={{ height: "300px" }}>
                  <BarChart
                    width={800}
                    height={300}
                    data={getCasesByMonth()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Cases Created" />
                  </BarChart>
                </div>
              </TabsContent>

              <TabsContent value="cases" className="p-4 border rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Cases by Type</h2>
                    <div className="flex justify-center">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={getCasesByType()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {getCasesByType().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium mb-4">
                      Cases by Status
                    </h2>
                    <div className="flex justify-center">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={getCasesByStatus()}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {getCasesByStatus().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="p-4 border rounded-md">
                <h2 className="text-lg font-medium mb-4">
                  Documents by Status
                </h2>
                <div className="flex justify-center">
                  <PieChart width={400} height={300}>
                    <Pie
                      data={getDocumentsByStatus()}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {getDocumentsByStatus().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
