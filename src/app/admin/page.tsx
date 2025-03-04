"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
    BarChart,
    Globe,
    Settings,
    Users,
    FileCheck,
    Database,
    Activity,
    Clock,
    AlertCircle,
    Shield,
} from 'lucide-react';

export default function AdminDashboard() {
    const { toast } = useToast();
    const router = useRouter();

    const [stats, setStats] = useState({
        documentCount: 0,
        userCount: 0,
        activeSources: 0,
        scrapeCount: 0,
        recentSuccessRate: 0,
        averageTrustScore: 0,
    });

    useEffect(() => {
        // In a real app, you would fetch these stats from your backend
        // This is simulated data for now
        const fetchStats = async () => {
            try {
                // Simulated API response
                const data = {
                    documentCount: 158,
                    userCount: 42,
                    activeSources: 12,
                    scrapeCount: 347,
                    recentSuccessRate: 94.5,
                    averageTrustScore: 78.2,
                };

                setStats(data);
            } catch (error) {
                console.error('Error fetching admin stats:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load admin dashboard data',
                    variant: 'destructive',
                });
            }
        };

        fetchStats();
    }, [toast]);

    const adminFeatures = [
        {
            title: 'Scraping Sources',
            description: 'Manage web scraping sources for automated content collection',
            icon: <Globe className="h-6 w-6" />,
            href: '/admin/scraping-sources',
            color: 'bg-blue-100 dark:bg-blue-900',
            textColor: 'text-blue-700 dark:text-blue-300',
        },
        {
            title: 'Scraping Logs',
            description: 'Monitor scheduled scraping jobs and view scraping history',
            icon: <Clock className="h-6 w-6" />,
            href: '/admin/scraping-logs',
            color: 'bg-indigo-100 dark:bg-indigo-900',
            textColor: 'text-indigo-700 dark:text-indigo-300',
        },
        {
            title: 'System Settings',
            description: 'Configure global application settings and preferences',
            icon: <Settings className="h-6 w-6" />,
            href: '/admin/settings',
            color: 'bg-purple-100 dark:bg-purple-900',
            textColor: 'text-purple-700 dark:text-purple-300',
        },
        {
            title: 'User Management',
            description: 'Add, edit, and manage user accounts and permissions',
            icon: <Users className="h-6 w-6" />,
            href: '/admin/users',
            color: 'bg-green-100 dark:bg-green-900',
            textColor: 'text-green-700 dark:text-green-300',
        },
        {
            title: 'Document Verification',
            description: 'Review and verify user-submitted documents and forms',
            icon: <FileCheck className="h-6 w-6" />,
            href: '/admin/verification',
            color: 'bg-amber-100 dark:bg-amber-900',
            textColor: 'text-amber-700 dark:text-amber-300',
        },
        {
            title: 'Database Management',
            description: 'Oversee database operations and content moderation',
            icon: <Database className="h-6 w-6" />,
            href: '/admin/database',
            color: 'bg-red-100 dark:bg-red-900',
            textColor: 'text-red-700 dark:text-red-300',
        },
        {
            title: 'System Logs',
            description: 'Monitor system activity, errors, and performance metrics',
            icon: <Activity className="h-6 w-6" />,
            href: '/admin/logs',
            color: 'bg-cyan-100 dark:bg-cyan-900',
            textColor: 'text-cyan-700 dark:text-cyan-300',
        },
    ];

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                    Manage and monitor the Hijraah immigration platform.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.documentCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Immigration documents processed
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.userCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Users registered on the platform
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Scraping Sources</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeSources}</div>
                        <p className="text-xs text-muted-foreground">
                            Active web scraping sources
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Scrapes</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.scrapeCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Web scraping operations performed
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Scrape Success Rate</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.recentSuccessRate}%</div>
                        <p className="text-xs text-muted-foreground">
                            Last 30 days success rate
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Average Trust Score</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.averageTrustScore}</div>
                        <p className="text-xs text-muted-foreground">
                            Average source trust rating
                        </p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-bold mb-4">Admin Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminFeatures.map((feature) => (
                    <Link key={feature.title} href={feature.href}>
                        <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardHeader>
                                <div className={`rounded-full p-2 w-fit ${feature.color}`}>
                                    <div className={feature.textColor}>{feature.icon}</div>
                                </div>
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
} 