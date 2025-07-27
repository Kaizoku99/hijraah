"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Activity,
  Users,
  Clock,
  Zap,
  FileText,
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Filter,
  Eye,
  BarChart3,
  Database,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AnalyticsService,
  RAGMetrics,
  UsageTimeSeries,
  UserAnalytics,
  DocumentAnalytics,
  PerformanceAlert,
} from "@/lib/services/analytics";

interface RAGAnalyticsDashboardProps {
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  enableRealTimeAlerts?: boolean;
}

// Context7 Pattern: Type-safe state management
interface DashboardState {
  metrics: RAGMetrics | null;
  timeSeries: UsageTimeSeries[];
  userAnalytics: UserAnalytics[];
  documentAnalytics: DocumentAnalytics[];
  alerts: PerformanceAlert[];
  isLoading: boolean;
  lastUpdated: Date | null;
  timeRange: "1h" | "24h" | "7d" | "30d";
  granularity: "minute" | "hour" | "day";
  activeTab: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

export function RAGAnalyticsDashboard({
  className,
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
  enableRealTimeAlerts = true,
}: RAGAnalyticsDashboardProps) {
  const { toast } = useToast();
  const analyticsServiceRef = useRef<AnalyticsService | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<DashboardState>({
    metrics: null,
    timeSeries: [],
    userAnalytics: [],
    documentAnalytics: [],
    alerts: [],
    isLoading: true,
    lastUpdated: null,
    timeRange: "24h",
    granularity: "hour",
    activeTab: "overview",
  });

  // Context7 Pattern: Service initialization with cleanup
  useEffect(() => {
    analyticsServiceRef.current = AnalyticsService.getInstance();
    const service = analyticsServiceRef.current;

    // Event listeners for real-time updates
    if (enableRealTimeAlerts) {
      service.on("performance:alert", handlePerformanceAlert);
      service.on("metrics:updated", handleMetricsUpdate);
    }

    return () => {
      service.off("performance:alert", handlePerformanceAlert);
      service.off("metrics:updated", handleMetricsUpdate);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enableRealTimeAlerts]);

  // Context7 Pattern: Real-time event handlers
  const handlePerformanceAlert = useCallback(
    (alert: PerformanceAlert) => {
      setState((prev) => ({
        ...prev,
        alerts: [alert, ...prev.alerts.slice(0, 9)], // Keep last 10 alerts
      }));

      // Show toast notification for critical alerts
      if (alert.severity === "critical" || alert.severity === "high") {
        toast({
          title: `Performance Alert: ${alert.type}`,
          description: alert.message,
          variant: alert.severity === "critical" ? "destructive" : "default",
        });
      }
    },
    [toast]
  );

  const handleMetricsUpdate = useCallback((metrics: RAGMetrics) => {
    setState((prev) => ({
      ...prev,
      metrics,
      lastUpdated: new Date(),
    }));
  }, []);

  // Context7 Pattern: Data fetching with error handling
  const fetchDashboardData = useCallback(async () => {
    if (!analyticsServiceRef.current) return;

    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const [metrics, timeSeries, userAnalytics, documentAnalytics] =
        await Promise.all([
          analyticsServiceRef.current.getRAGMetrics(state.timeRange),
          analyticsServiceRef.current.getUsageTimeSeries(
            state.timeRange,
            state.granularity
          ),
          analyticsServiceRef.current.getUserAnalytics(undefined, 20),
          analyticsServiceRef.current.getDocumentAnalytics(20),
        ]);

      setState((prev) => ({
        ...prev,
        metrics,
        timeSeries,
        userAnalytics,
        documentAnalytics,
        lastUpdated: new Date(),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast({
        title: "Failed to load analytics data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [state.timeRange, state.granularity, toast]);

  // Context7 Pattern: Auto-refresh with exponential backoff
  useEffect(() => {
    fetchDashboardData();

    if (autoRefresh) {
      intervalRef.current = setInterval(fetchDashboardData, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchDashboardData, autoRefresh, refreshInterval]);

  const handleTimeRangeChange = useCallback((newTimeRange: string) => {
    setState((prev) => ({
      ...prev,
      timeRange: newTimeRange as "1h" | "24h" | "7d" | "30d",
    }));
  }, []);

  const handleGranularityChange = useCallback((newGranularity: string) => {
    setState((prev) => ({
      ...prev,
      granularity: newGranularity as "minute" | "hour" | "day",
    }));
  }, []);

  const exportData = useCallback(async () => {
    if (!analyticsServiceRef.current) return;

    try {
      const data = await analyticsServiceRef.current.exportAnalyticsData(
        "json",
        state.timeRange
      );
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rag-analytics-${state.timeRange}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: "Analytics data has been exported successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export analytics data",
        variant: "destructive",
      });
    }
  }, [state.timeRange, toast]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getAlertIcon = (severity: PerformanceAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertColor = (severity: PerformanceAlert["severity"]) => {
    const colors = {
      critical: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    };
    return colors[severity];
  };

  if (state.isLoading && !state.metrics) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">RAG Analytics</h2>
          <p className="text-muted-foreground">
            Monitor retrieval-augmented generation performance and usage
            {state.lastUpdated && (
              <span className="ml-2">
                • Last updated {state.lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={state.timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            disabled={state.isLoading}
          >
            <RefreshCw
              className={cn("h-4 w-4", state.isLoading && "animate-spin")}
            />
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Alerts */}
      {state.alerts.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                {state.alerts.length} recent performance alert
                {state.alerts.length > 1 ? "s" : ""}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setState((prev) => ({ ...prev, activeTab: "alerts" }))
                }
              >
                View All
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      {state.metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {formatNumber(state.metrics.totalQueries)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Queries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {formatDuration(state.metrics.avgResponseTime)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Avg Response Time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {(state.metrics.successRate * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {formatNumber(state.metrics.uniqueUsers)}
                  </p>
                  <p className="text-xs text-muted-foreground">Unique Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs
        value={state.activeTab}
        onValueChange={(tab) =>
          setState((prev) => ({ ...prev, activeTab: tab }))
        }
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts{" "}
            {state.alerts.length > 0 && (
              <Badge className="ml-1">{state.alerts.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Usage Time Series */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Usage Over Time</CardTitle>
                <Select
                  value={state.granularity}
                  onValueChange={handleGranularityChange}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minute">Minute</SelectItem>
                    <SelectItem value="hour">Hour</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={state.timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="queries"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Queries"
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Query Types & Engagement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Query Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={state.metrics?.queryTypes || []}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="category"
                      label={({ category, percentage }) =>
                        `${category}: ${percentage.toFixed(1)}%`
                      }
                    >
                      {(state.metrics?.queryTypes || []).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Queries per User</span>
                    <span className="font-medium">
                      {state.metrics?.userEngagement.avgQueriesPerUser.toFixed(
                        1
                      )}
                    </span>
                  </div>
                  <Progress
                    value={
                      Math.min(
                        state.metrics?.userEngagement.avgQueriesPerUser || 0,
                        10
                      ) * 10
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Return User Rate</span>
                    <span className="font-medium">
                      {(
                        state.metrics?.userEngagement.returnUserRate * 100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (state.metrics?.userEngagement.returnUserRate || 0) * 100
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Feedback Score</span>
                    <span className="font-medium">
                      {state.metrics?.userEngagement.feedbackScore.toFixed(1)}/5
                    </span>
                  </div>
                  <Progress
                    value={
                      (state.metrics?.userEngagement.feedbackScore || 0) * 20
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {(
                    state.metrics?.performanceMetrics.cachehitRate * 100
                  ).toFixed(1)}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Cache Hit Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {formatDuration(
                    state.metrics?.performanceMetrics.avgRetrievalTime || 0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Avg Retrieval Time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {formatDuration(
                    state.metrics?.performanceMetrics.avgGenerationTime || 0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Avg Generation Time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {(state.metrics?.performanceMetrics.errorRate * 100).toFixed(
                    2
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Error Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Time Series */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={state.timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#8884d8"
                    name="Response Time (ms)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="successRate"
                    stroke="#82ca9d"
                    name="Success Rate (%)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="cacheHitRate"
                    stroke="#ffc658"
                    name="Cache Hit Rate (%)"
                    strokeWidth={2}
                  />
                  <ReferenceLine
                    y={2000}
                    stroke="red"
                    strokeDasharray="5 5"
                    label="Response Time Threshold"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Users by Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Total Queries</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>Engagement Score</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.userAnalytics.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell className="font-mono text-xs">
                        {user.userId.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{user.totalQueries}</TableCell>
                      <TableCell>
                        {(
                          (user.successfulQueries / user.totalQueries) *
                          100
                        ).toFixed(1)}
                        %
                      </TableCell>
                      <TableCell>
                        {formatDuration(user.avgResponseTime)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{user.engagementScore.toFixed(1)}/5</span>
                          <Progress
                            value={user.engagementScore * 20}
                            className="w-16 h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(user.lastActivity).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Retrieved Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Retrieval Count</TableHead>
                    <TableHead>Avg Relevance</TableHead>
                    <TableHead>User Feedback</TableHead>
                    <TableHead>Processing Time</TableHead>
                    <TableHead>Last Accessed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.documentAnalytics.map((doc) => (
                    <TableRow key={doc.documentId}>
                      <TableCell>
                        <div>
                          <p className="font-medium truncate max-w-xs">
                            {doc.title}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {doc.documentId.slice(0, 8)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{doc.retrievalCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{doc.avgRelevanceScore.toFixed(2)}</span>
                          <Progress
                            value={doc.avgRelevanceScore * 100}
                            className="w-16 h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{doc.userFeedback.toFixed(1)}/5</TableCell>
                      <TableCell>
                        {formatDuration(doc.processingTime)}
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(doc.lastAccessed).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Information Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source URL</TableHead>
                    <TableHead>Hits</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(state.metrics?.topSources || []).map((source, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate max-w-xs block"
                        >
                          {source.url}
                        </a>
                      </TableCell>
                      <TableCell>{source.hits}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{(source.confidence * 100).toFixed(1)}%</span>
                          <Progress
                            value={source.confidence * 100}
                            className="w-16 h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            source.confidence > 0.8 ? "default" : "secondary"
                          }
                        >
                          {source.confidence > 0.8 ? "High" : "Medium"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Performance Alerts</CardTitle>
              <CardDescription>
                Monitor system performance and receive alerts for anomalies
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.alerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    All Systems Normal
                  </h3>
                  <p className="text-muted-foreground">
                    No performance alerts in the selected time range
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {state.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 border rounded-lg"
                      >
                        {getAlertIcon(alert.severity)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={cn(
                                "text-xs",
                                getAlertColor(alert.severity)
                              )}
                            >
                              {alert.severity}
                            </Badge>
                            <span className="text-sm font-medium">
                              {alert.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{alert.message}</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            {alert.metric}: {alert.value} (threshold:{" "}
                            {alert.threshold})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
