'use client';

import { createClient } from '@supabase/supabase-js';
import { format, parseISO } from 'date-fns';
import { CheckCircle2, Clock, AlertCircle, AlertTriangle, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
import { Progress } from '@/ui/progress';
import { useToast } from '@/ui/use-toast';

type RoadmapListItem = {
    id: string;
    title: string;
    description: string;
    case_id: string;
    case_type: string;
    completion_percentage: number;
    last_updated: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'overdue';
};

export default function RoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState<RoadmapListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<any>(null);
    const { toast } = useToast();
    const router = useRouter();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    useEffect(() => {
        // Check user authentication on mount
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                router.push('/login');
                return;
            }
            setUser(data.user);
        };

        checkUser();
    }, [supabase, router]);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            if (!user) return;

            try {
                setLoading(true);

                const { data: roadmapsData, error: roadmapsError } = await supabase
                    .from('roadmaps')
                    .select('*, cases:case_id(title, case_number)')
                    .eq('user_id', user.id)
                    .order('last_updated', { ascending: false });

                if (roadmapsError) {
                    setError('Failed to fetch roadmaps');
                    return;
                }

                // Transform data to include a derived status
                const processedRoadmaps = roadmapsData.map(roadmap => {
                    let status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'overdue' = 'not_started';

                    if (roadmap.completion_percentage === 100) {
                        status = 'completed';
                    } else if (Array.isArray(roadmap.phases)) {
                        const hasBlocked = roadmap.phases.some((phase: any) => phase.status === 'blocked');
                        const hasOverdue = roadmap.phases.some((phase: any) => phase.status === 'overdue');
                        const hasInProgress = roadmap.phases.some((phase: any) => phase.status === 'in_progress');

                        if (hasBlocked) {
                            status = 'blocked';
                        } else if (hasOverdue) {
                            status = 'overdue';
                        } else if (hasInProgress) {
                            status = 'in_progress';
                        }
                    }

                    return {
                        ...roadmap,
                        status,
                        title: roadmap.title || `Roadmap for ${roadmap.cases?.title || roadmap.case_id}`,
                    };
                });

                setRoadmaps(processedRoadmaps);
            } catch (err) {
                setError('An error occurred while fetching roadmaps');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmaps();
    }, [user, supabase]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'in_progress':
                return <Clock className="h-5 w-5 text-blue-500" />;
            case 'blocked':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            case 'overdue':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
            case 'in_progress':
                return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>;
            case 'blocked':
                return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Blocked</Badge>;
            case 'overdue':
                return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Overdue</Badge>;
            default:
                return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Not Started</Badge>;
        }
    };

    const filteredRoadmaps = roadmaps.filter(roadmap =>
        roadmap.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.case_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Immigration Roadmaps</h1>
                <p className="text-gray-500 mt-1">
                    View and manage your personalized immigration roadmaps
                </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search roadmaps..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <Link href="/dashboard/cases" legacyBehavior>
                        <Button variant="outline">View Cases</Button>
                    </Link>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : error ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-600">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    </CardFooter>
                </Card>
            ) : filteredRoadmaps.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No Roadmaps Found</CardTitle>
                        <CardDescription>
                            {searchQuery ? 'No roadmaps match your search criteria.' : 'You have no roadmaps yet.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">
                            Roadmaps are created from immigration cases. Visit your cases to create a roadmap.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard/cases" legacyBehavior>
                            <Button>View My Cases</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoadmaps.map((roadmap) => (
                        <Link
                            key={roadmap.id}
                            href={`/dashboard/roadmaps/${roadmap.id}`}
                            legacyBehavior>
                            <Card className="h-full hover:shadow-md transition-shadow duration-200 cursor-pointer">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                            {getStatusIcon(roadmap.status)}
                                            <CardTitle className="ml-2 text-lg">{roadmap.title}</CardTitle>
                                        </div>
                                        <div>
                                            {getStatusBadge(roadmap.status)}
                                        </div>
                                    </div>
                                    <CardDescription className="mt-2">
                                        {roadmap.description?.length > 100
                                            ? `${roadmap.description.substring(0, 100)}...`
                                            : roadmap.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Progress</span>
                                        <span className="text-sm">{roadmap.completion_percentage}%</span>
                                    </div>
                                    <Progress value={roadmap.completion_percentage} className="h-2 mb-4" />

                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <p className="text-gray-500">Case Type:</p>
                                            <p className="font-medium">{roadmap.case_type.replace(/_/g, ' ')}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Last Updated:</p>
                                            <p className="font-medium">{format(parseISO(roadmap.last_updated), 'MMM d, yyyy')}</p>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-0 pb-3">
                                    <Button variant="ghost" className="w-full justify-between">
                                        View Details <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
} 