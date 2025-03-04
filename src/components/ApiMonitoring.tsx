import { useState, useEffect } from 'react';
import { useHijraahApi } from '@/hooks/useHijarahApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CacheStats {
    keys: number;
    hits: number;
    misses: number;
    ksize: number;
    vsize: number;
}

interface RateLimitStatus {
    key: string;
    count: number;
    exists: boolean;
}

interface PerformanceMetrics {
    [path: string]: {
        count: number;
        avgTime: number;
        minTime: number;
        maxTime: number;
        recent: number[];
    }
}

interface SystemStatus {
    uptime: number;
    memory: {
        rss: string;
        heapTotal: string;
        heapUsed: string;
    };
    cache: CacheStats;
    environment: string;
}

export function ApiMonitoring() {
    const [activeTab, setActiveTab] = useState('cache');
    const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
    const [rateLimitStatus, setRateLimitStatus] = useState<RateLimitStatus | null>(null);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
    const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rateLimitKey, setRateLimitKey] = useState('');
    const [invalidatePattern, setInvalidatePattern] = useState('');
    const { admin } = useHijraahApi();
    const { toast } = useToast();

    // Load data based on active tab
    useEffect(() => {
        loadTabData(activeTab);
    }, [activeTab]);

    const loadTabData = async (tab: string) => {
        setIsLoading(true);
        setError(null);

        try {
            switch (tab) {
                case 'cache':
                    await loadCacheStats();
                    break;
                case 'performance':
                    await loadPerformanceMetrics();
                    break;
                case 'system':
                    await loadSystemStatus();
                    break;
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    const loadCacheStats = async () => {
        const { data, error } = await admin.getCacheStats();
        if (error) throw new Error(error);
        setCacheStats(data?.stats);
    };

    const loadRateLimitStatus = async () => {
        if (!rateLimitKey.trim()) {
            toast({
                title: "Error",
                description: "Please enter a rate limit key",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await admin.getRateLimitStatus(rateLimitKey);
            if (error) throw new Error(error);
            setRateLimitStatus(data?.status);
        } catch (err: any) {
            setError(err.message || 'Failed to load rate limit status');
        } finally {
            setIsLoading(false);
        }
    };

    const loadPerformanceMetrics = async () => {
        const { data, error } = await admin.getPerformanceMetrics();
        if (error) throw new Error(error);
        setPerformanceMetrics(data?.metrics);
    };

    const loadSystemStatus = async () => {
        const { data, error } = await admin.getSystemStatus();
        if (error) throw new Error(error);
        setSystemStatus(data?.status);
    };

    const clearCache = async () => {
        setIsLoading(true);
        try {
            const { error } = await admin.clearCache();
            if (error) throw new Error(error);
            toast({
                title: "Success",
                description: "Cache cleared successfully",
                variant: "default",
            });
            await loadCacheStats();
        } catch (err: any) {
            setError(err.message || 'Failed to clear cache');
        } finally {
            setIsLoading(false);
        }
    };

    const invalidateCache = async () => {
        if (!invalidatePattern.trim()) {
            toast({
                title: "Error",
                description: "Please enter a pattern to invalidate",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await admin.invalidateCache(invalidatePattern);
            if (error) throw new Error(error);
            toast({
                title: "Success",
                description: `Cache entries matching "${invalidatePattern}" invalidated`,
                variant: "default",
            });
            await loadCacheStats();
            setInvalidatePattern('');
        } catch (err: any) {
            setError(err.message || 'Failed to invalidate cache');
        } finally {
            setIsLoading(false);
        }
    };

    const resetPerformanceMetrics = async () => {
        setIsLoading(true);
        try {
            const { error } = await admin.resetPerformanceMetrics();
            if (error) throw new Error(error);
            toast({
                title: "Success",
                description: "Performance metrics reset successfully",
                variant: "default",
            });
            await loadPerformanceMetrics();
        } catch (err: any) {
            setError(err.message || 'Failed to reset performance metrics');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>API Monitoring</CardTitle>
                <CardDescription>
                    View and manage API performance, caching, and rate limiting
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="cache" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="cache">Cache</TabsTrigger>
                        <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                    </TabsList>

                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {isLoading && (
                        <div className="w-full flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    <TabsContent value="cache" className="space-y-4 mt-4">
                        {cacheStats && !isLoading && (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <div className="text-2xl font-bold">{cacheStats.keys}</div>
                                        <div className="text-sm text-muted-foreground">Cached Keys</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <div className="text-2xl font-bold">{cacheStats.hits}</div>
                                        <div className="text-sm text-muted-foreground">Cache Hits</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <div className="text-2xl font-bold">{cacheStats.misses}</div>
                                        <div className="text-sm text-muted-foreground">Cache Misses</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <div className="text-2xl font-bold">
                                            {cacheStats.hits && cacheStats.misses
                                                ? ((cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100).toFixed(1) + '%'
                                                : '0%'}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Hit Rate</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="invalidate-pattern">Invalidate Cache Pattern</Label>
                                        <div className="flex gap-2 mt-1">
                                            <Input
                                                id="invalidate-pattern"
                                                placeholder="e.g., user:123 or /api/research"
                                                value={invalidatePattern}
                                                onChange={(e) => setInvalidatePattern(e.target.value)}
                                            />
                                            <Button
                                                onClick={invalidateCache}
                                                disabled={isLoading || !invalidatePattern.trim()}
                                            >
                                                Invalidate
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex items-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => loadCacheStats()}
                                            disabled={isLoading}
                                            className="flex items-center"
                                        >
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Refresh Stats
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={clearCache}
                                            disabled={isLoading}
                                            className="flex items-center"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Clear All Cache
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </TabsContent>

                    <TabsContent value="rate-limits" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Label htmlFor="rate-limit-key">Check Rate Limit Key</Label>
                                <div className="flex gap-2 mt-1">
                                    <Input
                                        id="rate-limit-key"
                                        placeholder="e.g., rate:user:123 or rate:ip:127.0.0.1"
                                        value={rateLimitKey}
                                        onChange={(e) => setRateLimitKey(e.target.value)}
                                    />
                                    <Button
                                        onClick={loadRateLimitStatus}
                                        disabled={isLoading || !rateLimitKey.trim()}
                                    >
                                        Check
                                    </Button>
                                </div>
                            </div>

                            {rateLimitStatus && !isLoading && (
                                <div className="bg-gray-50 p-4 rounded-md mt-4">
                                    <h3 className="text-lg font-medium mb-2">Rate Limit Status</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-muted-foreground">Key</div>
                                            <div className="font-mono text-sm">{rateLimitStatus.key}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">Count</div>
                                            <div className="text-xl font-bold">{rateLimitStatus.count}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">Status</div>
                                            <div className={`text-sm font-medium ${rateLimitStatus.exists ? 'text-yellow-600' : 'text-green-600'}`}>
                                                {rateLimitStatus.exists ? 'Active' : 'Not Found'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="performance" className="space-y-4 mt-4">
                        {performanceMetrics && !isLoading && (
                            <>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">API Performance by Endpoint</h3>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => loadPerformanceMetrics()}
                                            disabled={isLoading}
                                            className="flex items-center"
                                        >
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Refresh
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={resetPerformanceMetrics}
                                            disabled={isLoading}
                                            className="flex items-center"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Reset Metrics
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(performanceMetrics).map(([path, metrics]) => (
                                        <div key={path} className="bg-gray-50 p-4 rounded-md">
                                            <h4 className="text-base font-medium mb-1">{path}</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Requests</div>
                                                    <div className="text-xl font-bold">{metrics.count}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Avg Time</div>
                                                    <div className="text-xl font-bold">{metrics.avgTime.toFixed(2)}ms</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Min Time</div>
                                                    <div className="text-xl font-bold">{metrics.minTime.toFixed(2)}ms</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Max Time</div>
                                                    <div className="text-xl font-bold">{metrics.maxTime.toFixed(2)}ms</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </TabsContent>

                    <TabsContent value="system" className="space-y-4 mt-4">
                        {systemStatus && !isLoading && (
                            <>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">System Status</h3>
                                    <Button
                                        variant="outline"
                                        onClick={() => loadSystemStatus()}
                                        disabled={isLoading}
                                        className="flex items-center"
                                    >
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="text-base font-medium mb-2">Server</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Uptime</span>
                                                <span className="text-sm font-medium">{Math.floor(systemStatus.uptime / 60)} minutes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Environment</span>
                                                <span className="text-sm font-medium">{systemStatus.environment}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="text-base font-medium mb-2">Memory Usage</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">RSS</span>
                                                <span className="text-sm font-medium">{systemStatus.memory.rss}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Heap Total</span>
                                                <span className="text-sm font-medium">{systemStatus.memory.heapTotal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Heap Used</span>
                                                <span className="text-sm font-medium">{systemStatus.memory.heapUsed}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
} 