'use client';

import React from 'react';
import { AIChat } from '@/components/ui/ai-chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { Message } from 'ai';

export default function ToolsDemoPage() {
    const t = useTranslations('Tools');

    // Initialize with a system message that explains the capabilities
    const initialMessages: Message[] = [
        {
            id: 'system-1',
            role: 'system' as const,
            content: `You are an AI immigration assistant with access to the following tools:
      
1. checkEligibility - Evaluates a user's eligibility for various immigration programs
2. search - Searches for relevant immigration information

When a user wants to check their eligibility:
- Ask for their age, education, work experience, language skills, and nationality
- Help them determine which immigration programs they might qualify for
- Provide recommendations for improving their eligibility
- Explain the next steps in the application process

Always be helpful, accurate, and considerate of the user's immigration goals.`,
        },
        {
            id: 'assistant-1',
            role: 'assistant' as const,
            content: "Hello! I'm your immigration assistant. I can help you check your eligibility for various immigration programs, search for relevant information, and guide you through the application process. What would you like help with today?",
        },
    ];

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">
                {t('demo.title')}
            </h1>

            <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                    <TabsTrigger value="chat">
                        {t('demo.chatTab')}
                    </TabsTrigger>
                    <TabsTrigger value="about">
                        {t('demo.aboutTab')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('demo.chatTitle')}</CardTitle>
                            <CardDescription>
                                {t('demo.chatDescription')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AIChat
                                initialMessages={initialMessages}
                                className="h-[600px]"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('demo.aboutTitle')}</CardTitle>
                            <CardDescription>
                                {t('demo.aboutDescription')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    {t('demo.eligibilityTitle')}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('demo.eligibilityDescription')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    {t('demo.searchTitle')}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('demo.searchDescription')}
                                </p>
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                                <h3 className="text-md font-medium mb-2">
                                    {t('demo.tryItOut')}
                                </h3>
                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                    <li>&ldquo;Check my eligibility for Canadian immigration&rdquo;</li>
                                    <li>&ldquo;What are the requirements for the Express Entry program?&rdquo;</li>
                                    <li>&ldquo;How can I improve my chances of qualifying for a work visa?&rdquo;</li>
                                    <li>&ldquo;What documents do I need for a student visa application?&rdquo;</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 