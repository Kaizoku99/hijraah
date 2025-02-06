'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/auth';
import { Case } from '@/app/_types/cases';
import { Document } from '@/app/_types/documents';
import { CaseService } from '@/lib/services/cases';
import { DocumentService } from '@/lib/services/documents';
import { Loading } from '@/components/ui/loading';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Download } from 'lucide-react';

const caseService = new CaseService();
const documentService = new DocumentService();

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [timeRange, setTimeRange] = useState('6');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startDate = startOfMonth(subMonths(new Date(), parseInt(timeRange)));
      const endDate = endOfMonth(new Date());

      const [casesData, documentsData] = await Promise.all([
        caseService.getCasesByDateRange(user!.id, startDate, endDate),
        documentService.getDocumentsByDateRange(user!.id, startDate, endDate),
      ]);
      setCases(casesData);
      setDocuments(documentsData);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load analytics data',
      });
    } finally {
      setIsLoading(false);
    }
  }, [timeRange, user, toast]);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user, loadData]);

  const getCasesByMonth = () => {
    const monthlyData = cases.reduce((acc: any[], case_) => {
      const month = format(new Date(case_.created_at), 'MMM yyyy');
      const existingMonth = acc.find((item) => item.month === month);
      if (existingMonth) {
        existingMonth.count += 1;
      } else {
        acc.push({ month, count: 1 });
      }
      return acc;
    }, []);

    return monthlyData.sort((a, b) => {
      return new Date(a.month).getTime() - new Date(b.month).getTime();
    });
  };

  const getCasesByType = () => {
    return cases.reduce((acc: any[], case_) => {
      const existingType = acc.find((item) => item.type === case_.case_type);
      if (existingType) {
        existingType.value += 1;
      } else {
        acc.push({ type: case_.case_type, value: 1 });
      }
      return acc;
    }, []);
  };

  const getCasesByStatus = () => {
    return cases.reduce((acc: any[], case_) => {
      const existingStatus = acc.find((item) => item.status === case_.status);
      if (existingStatus) {
        existingStatus.value += 1;
      } else {
        acc.push({ status: case_.status, value: 1 });
      }
      return acc;
    }, []);
  };

  const getDocumentsByStatus = () => {
    return documents.reduce((acc: any[], doc) => {
      const existingStatus = acc.find((item) => item.status === doc.status);
      if (existingStatus) {
        existingStatus.value += 1;
      } else {
        acc.push({ status: doc.status, value: 1 });
      }
      return acc;
    }, []);
  };

  const downloadReport = () => {
    const report = {
      generated_at: new Date().toISOString(),
      time_range: `Last ${timeRange} months`,
      total_cases: cases.length,
      total_documents: documents.length,
      cases_by_type: getCasesByType(),
      cases_by_status: getCasesByStatus(),
      documents_by_status: getDocumentsByStatus(),
      monthly_cases: getCasesByMonth(),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `immigration-report-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading analytics...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Track and analyze your immigration cases and documents
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={downloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cases.filter((c) => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cases.length
                ? Math.round(
                    (cases.filter((c) => c.status === 'completed').length /
                      cases.length) *
                      100
                  )
                : 0}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cases Over Time</CardTitle>
                <CardDescription>
                  Monthly distribution of immigration cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getCasesByMonth()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="Cases" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cases by Type</CardTitle>
                <CardDescription>
                  Distribution of cases by their type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getCasesByType()}
                        dataKey="value"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {getCasesByType().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cases by Status</CardTitle>
                <CardDescription>
                  Distribution of cases by their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getCasesByStatus()}
                        dataKey="value"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {getCasesByStatus().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Documents by Status</CardTitle>
                <CardDescription>
                  Distribution of documents by their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getDocumentsByStatus()}
                        dataKey="value"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {getDocumentsByStatus().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 