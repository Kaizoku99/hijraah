'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ResearchSessionManager } from '@/components/research/session-manager';
import { ModelSelector } from '@/components/ui/model-selector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Info, Search } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export default function DeepResearchPage() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session');

    // Load user information
    useEffect(() => {
        const loadUser = async () => {
            try {
                // Create a Supabase client
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
                const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
                const supabase = createClient(supabaseUrl, supabaseAnonKey);

                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error loading user:', error);
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse">Loading...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto py-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign In Required</CardTitle>
                        <CardDescription>
                            Please sign in to access the Deep Research feature
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <Info className="h-12 w-12 text-muted-foreground" />
                            <p>
                                Deep Research allows you to comprehensively explore immigration topics
                                using advanced AI research capabilities
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Deep Research</h1>
                    <p className="text-muted-foreground">
                        Explore immigration topics in depth with AI-powered research
                    </p>
                </div>

                <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
                    <div className="flex gap-2">
                        <Badge variant="outline" className="px-4">
                            <BookOpen className="mr-1 h-3 w-3" />
                            Deep Research
                        </Badge>
                        <Badge variant="outline" className="px-4">
                            <Search className="mr-1 h-3 w-3" />
                            Powered by Claude & GPT
                        </Badge>
                    </div>

                    <div>
                        <ModelSelector types={["reasoning"]} />
                    </div>
                </div>

                <ResearchSessionManager userId={user.id} />

                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Deep Research</CardTitle>
                            <CardDescription>How our AI research system works</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="prose dark:prose-invert max-w-none">
                                <p>
                                    Our Deep Research feature uses advanced AI to perform comprehensive research
                                    on immigration topics, analyzing multiple sources, cross-referencing information,
                                    and synthesizing findings into detailed reports.
                                </p>

                                <h3>Research Process:</h3>
                                <ol>
                                    <li>
                                        <strong>Initial Search:</strong> The system searches for relevant
                                        information across multiple sources.
                                    </li>
                                    <li>
                                        <strong>Data Extraction:</strong> Relevant details are extracted from
                                        each source.
                                    </li>
                                    <li>
                                        <strong>Follow-up Research:</strong> Based on initial findings, the system
                                        generates and pursues follow-up questions.
                                    </li>
                                    <li>
                                        <strong>Analysis:</strong> Information is analyzed for relevance, credibility,
                                        and significance.
                                    </li>
                                    <li>
                                        <strong>Synthesis:</strong> All findings are synthesized into a comprehensive
                                        report with key insights.
                                    </li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}