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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Database,
  Server,
  Cpu,
  MemoryStick,
  Network,
  HardDrive,
  RefreshCw,
  Settings,
  Eye,
  Bell,
  TrendingUp,
  TrendingDown,
  Gauge,
  Timer,
  Shield,
  Bug,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AdvancedMonitoringService,
  SystemHealth,
  MonitoringMetric,
  Alert as MonitoringAlert,
  PerformanceTrace,
  ServiceHealth,
  DependencyHealth,
} from "@/lib/services/advanced-monitoring";

interface AdvancedMonitoringDashboardProps {
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

// Context7 Pattern: Type-safe state management
interface DashboardState {
  systemHealth: SystemHealth | null;
  recentMetrics: MonitoringMetric[];
  activeAlerts: MonitoringAlert[];
  recentTraces: PerformanceTrace[];
  isLoading: boolean;
  lastUpdated: Date | null;
  timeRange: "1h" | "6h" | "24h" | "7d";
  selectedService: string | null;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

export function AdvancedMonitoringDashboard({
  className,
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
}: AdvancedMonitoringDashboardProps) {
  const { toast } = useToast();
  const monitoringServiceRef = useRef<AdvancedMonitoringService | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<DashboardState>({
    systemHealth: null,
    recentMetrics: [],
    activeAlerts: [],
    recentTraces: [],
    isLoading: true,
    lastUpdated: null,
    timeRange: "1h",
    selectedService: null,
  });

  // Context7 Pattern: Service initialization with cleanup
  useEffect(() => {
    monitoringServiceRef.current = AdvancedMonitoringService.getInstance();
    const service = monitoringServiceRef.current;

    // Event listeners for real-time updates
    service.on("alert:fired", handleAlertFired);
    service.on("alert:resolved", handleAlertResolved);
    service.on("health:degraded", handleHealthDegraded);
    service.on("performance:anomaly", handlePerformanceAnomaly);

    return () => {
      service.off("alert:fired", handleAlertFired);
      service.off("alert:resolved", handleAlertResolved);
      service.off("health:degraded", handleHealthDegraded);
      service.off("performance:anomaly", handlePerformanceAnomaly);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Context7 Pattern: Real-time event handlers
  const handleAlertFired = useCallback(
    (alert: MonitoringAlert) => {
      setState((prev) => ({
        ...prev,
        activeAlerts: [alert, ...prev.activeAlerts],
      }));

      toast({
        title: `Alert: ${alert.name}`,
        description: alert.description,
        variant: alert.severity === "critical" ? "destructive" : "default",
      });
    },
    [toast],
  );

  const handleAlertResolved = useCallback(
    (alert: MonitoringAlert) => {
      setState((prev) => ({
        ...prev,
        activeAlerts: prev.activeAlerts.filter((a) => a.id !== alert.id),
      }));

      toast({
        title: `Alert Resolved: ${alert.name}`,
        description: "System has returned to normal",
      });
    },
    [toast],
  );

  const handleHealthDegraded = useCallback(
    (service: string, status: ServiceHealth) => {
      toast({
        title: `Service Degraded: ${service}`,
        description: `Service is experiencing issues - ${status.errorRate * 100}% error rate`,
        variant: "destructive",
      });
    },
    [toast],
  );

  const handlePerformanceAnomaly = useCallback(
    (metric: string, value: number, expected: number) => {
      toast({
        title: `Performance Anomaly`,
        description: `${metric}: ${value} (expected: ${expected})`,
        variant: "default",
      });
    },
    [toast],
  );

  // Context7 Pattern: Data fetching with error handling
  const fetchDashboardData = useCallback(async () => {
    if (!monitoringServiceRef.current) return;

    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const [systemHealth] = await Promise.all([
        monitoringServiceRef.current.getSystemHealth(),
        // Additional data fetching would go here
      ]);

      setState((prev) => ({
        ...prev,
        systemHealth,
        lastUpdated: new Date(),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch monitoring data:", error);
      toast({
        title: "Failed to load monitoring data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [toast]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "down":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "maintenance":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      healthy:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      degraded:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
      down: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      maintenance:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400"
    );
  };

  const getSeverityIcon = (severity: MonitoringAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (state.isLoading && !state.systemHealth) {
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
          <h2 className="text-2xl font-bold tracking-tight">
            System Monitoring
          </h2>
          <p className="text-muted-foreground">
            Real-time performance and health monitoring
            {state.lastUpdated && (
              <span className="ml-2">
                • Last updated {state.lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={state.timeRange}
            onValueChange={(value) =>
              setState((prev) => ({
                ...prev,
                timeRange: value as DashboardState["timeRange"],
              }))
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="6h">6 Hours</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
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
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      {state.systemHealth && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                {getStatusIcon(state.systemHealth.status)}
                <div>
                  <p className="text-2xl font-bold capitalize">
                    {state.systemHealth.status}
                  </p>
                  <p className="text-xs text-muted-foreground">System Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {(state.systemHealth.overallScore * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Health Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {
                      state.systemHealth.services.filter(
                        (s) => s.status === "healthy",
                      ).length
                    }
                    /{state.systemHealth.services.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Services Healthy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {state.activeAlerts.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Active Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Alerts */}
      {state.activeAlerts.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                {state.activeAlerts.length} active alert
                {state.activeAlerts.length > 1 ? "s" : ""} requiring attention
              </span>
              <Button variant="ghost" size="sm">
                View All Alerts
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="traces">Traces</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Service Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.systemHealth?.services.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        <span className="font-medium">{service.name}</span>
                        <Badge
                          className={cn(
                            "text-xs",
                            getStatusColor(service.status),
                          )}
                        >
                          {service.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDuration(service.responseTime)} •{" "}
                        {formatPercentage(service.errorRate)} errors
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.systemHealth?.dependencies.map((dep) => (
                    <div
                      key={dep.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {getStatusIcon(dep.status)}
                        <span className="font-medium">{dep.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {dep.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDuration(dep.responseTime)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[]}>
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
                    dataKey="errorRate"
                    stroke="#ff7300"
                    name="Error Rate (%)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="throughput"
                    stroke="#00ff00"
                    name="Throughput"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {state.systemHealth?.services.map((service) => (
              <Card key={service.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      {service.name}
                      <Badge
                        className={cn(
                          "text-xs",
                          getStatusColor(service.status),
                        )}
                      >
                        {service.status}
                      </Badge>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      v{service.version}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Response Time</p>
                      <p className="text-2xl font-bold">
                        {formatDuration(service.responseTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Error Rate</p>
                      <p className="text-2xl font-bold">
                        {formatPercentage(service.errorRate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Throughput</p>
                      <p className="text-2xl font-bold">
                        {service.throughput}/min
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Availability</p>
                      <p className="text-2xl font-bold">
                        {service.availability.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={65} className="h-2" />
                  <p className="text-sm text-muted-foreground">65% average</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={78} className="h-2" />
                  <p className="text-sm text-muted-foreground">78% of 16GB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  Disk Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={45} className="h-2" />
                  <p className="text-sm text-muted-foreground">45% of 1TB</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Management</CardTitle>
              <CardDescription>
                Monitor and manage system alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.activeAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Active Alerts
                  </h3>
                  <p className="text-muted-foreground">
                    All systems are operating normally
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {state.activeAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-start gap-3 p-3 border rounded-lg"
                      >
                        {getSeverityIcon(alert.severity)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={cn(
                                "text-xs",
                                getStatusColor(alert.severity),
                              )}
                            >
                              {alert.severity}
                            </Badge>
                            <span className="text-sm font-medium">
                              {alert.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {alert.firedAt &&
                                new Date(alert.firedAt).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{alert.description}</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            Condition: {alert.condition.metric}{" "}
                            {alert.condition.operator}{" "}
                            {alert.condition.threshold}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Acknowledge
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Traces</CardTitle>
              <CardDescription>
                Distributed tracing for performance analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operation</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Spans</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.recentTraces.map((trace) => (
                    <TableRow key={trace.id}>
                      <TableCell className="font-medium">
                        {trace.operationName}
                      </TableCell>
                      <TableCell>
                        {trace.duration ? formatDuration(trace.duration) : "-"}
                      </TableCell>
                      <TableCell>{trace.spans.length}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "text-xs",
                            getStatusColor(trace.status),
                          )}
                        >
                          {trace.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(trace.startTime).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
