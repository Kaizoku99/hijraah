import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from './OnboardingProvider';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BookOpen,
    FileText,
    CheckCircle2,
    HelpCircle,
    Video,
    Flag,
    Calendar,
    Users,
    ExternalLink,
} from 'lucide-react';

interface ResourceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, description, link }) => {
    return (
        <Card className="transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                        {icon}
                    </div>
                    <CardTitle className="text-base">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs"
                    asChild
                >
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        View Resource <ExternalLink className="h-3 w-3 opacity-70" />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
};

export const Resources: React.FC = () => {
    const { onboarding, completeStep } = useOnboarding();
    const [activeTab, setActiveTab] = useState('guides');

    const isActive = onboarding.isActive &&
        onboarding.currentStep === 'resources' &&
        !onboarding.hideForSession &&
        !onboarding.isCompleted;

    if (!isActive) return null;

    const handleFinish = async () => {
        // Mark action as completed
        try {
            await fetch('/api/onboarding/actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    actionKey: 'resources_viewed',
                    isCompleted: true,
                }),
            });
        } catch (error) {
            console.error('Failed to mark resources as viewed:', error);
        }

        // Complete this step
        completeStep('resources');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card border rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                <CardHeader>
                    <CardTitle className="text-2xl">Resources</CardTitle>
                    <CardDescription className="text-base">
                        Explore a variety of resources to help you on your immigration journey.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue={activeTab}>
                        <TabsList className="grid grid-cols-4 mb-6">
                            <TabsTrigger value="guides" onClick={() => setActiveTab('guides')}>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Guides
                            </TabsTrigger>
                            <TabsTrigger value="documents" onClick={() => setActiveTab('documents')}>
                                <FileText className="h-4 w-4 mr-2" />
                                Documents
                            </TabsTrigger>
                            <TabsTrigger value="videos" onClick={() => setActiveTab('videos')}>
                                <Video className="h-4 w-4 mr-2" />
                                Videos
                            </TabsTrigger>
                            <TabsTrigger value="community" onClick={() => setActiveTab('community')}>
                                <Users className="h-4 w-4 mr-2" />
                                Community
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="guides" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <ResourceCard
                                    icon={<BookOpen className="h-4 w-4" />}
                                    title="Getting Started Guide"
                                    description="A comprehensive guide on how to use Hijraah for your immigration journey."
                                    link="/guides/getting-started"
                                />
                                <ResourceCard
                                    icon={<Flag className="h-4 w-4" />}
                                    title="Country-Specific Guides"
                                    description="Detailed guides for the most popular immigration destinations."
                                    link="/guides/countries"
                                />
                                <ResourceCard
                                    icon={<Calendar className="h-4 w-4" />}
                                    title="Immigration Timeline"
                                    description="Learn about typical immigration process timelines and milestones."
                                    link="/guides/timeline"
                                />
                                <ResourceCard
                                    icon={<HelpCircle className="h-4 w-4" />}
                                    title="Frequently Asked Questions"
                                    description="Find answers to common questions about immigration processes."
                                    link="/help/faq"
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="documents" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <ResourceCard
                                    icon={<FileText className="h-4 w-4" />}
                                    title="Document Checklist"
                                    description="Essential documents needed for most immigration applications."
                                    link="/documents/checklist"
                                />
                                <ResourceCard
                                    icon={<FileText className="h-4 w-4" />}
                                    title="Sample Applications"
                                    description="View sample successful immigration applications."
                                    link="/documents/samples"
                                />
                                <ResourceCard
                                    icon={<FileText className="h-4 w-4" />}
                                    title="Legal Resources"
                                    description="Important legal documents related to immigration processes."
                                    link="/documents/legal"
                                />
                                <ResourceCard
                                    icon={<FileText className="h-4 w-4" />}
                                    title="Form Filling Guides"
                                    description="Step-by-step guides for filling out common immigration forms."
                                    link="/documents/forms"
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="videos" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <ResourceCard
                                    icon={<Video className="h-4 w-4" />}
                                    title="Platform Tutorial"
                                    description="Watch a comprehensive tutorial on using the Hijraah platform."
                                    link="/videos/tutorial"
                                />
                                <ResourceCard
                                    icon={<Video className="h-4 w-4" />}
                                    title="Immigration Process Explained"
                                    description="An overview of typical immigration processes and steps."
                                    link="/videos/process"
                                />
                                <ResourceCard
                                    icon={<Video className="h-4 w-4" />}
                                    title="Expert Interviews"
                                    description="Watch interviews with immigration experts and consultants."
                                    link="/videos/experts"
                                />
                                <ResourceCard
                                    icon={<Video className="h-4 w-4" />}
                                    title="Success Stories"
                                    description="Real immigration success stories from our community members."
                                    link="/videos/success-stories"
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="community" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <ResourceCard
                                    icon={<Users className="h-4 w-4" />}
                                    title="Community Forums"
                                    description="Join discussions with others on their immigration journey."
                                    link="/community/forums"
                                />
                                <ResourceCard
                                    icon={<Users className="h-4 w-4" />}
                                    title="Expert Network"
                                    description="Connect with immigration experts and consultants."
                                    link="/community/experts"
                                />
                                <ResourceCard
                                    icon={<Calendar className="h-4 w-4" />}
                                    title="Upcoming Events"
                                    description="Webinars, workshops and meet-ups related to immigration."
                                    link="/community/events"
                                />
                                <ResourceCard
                                    icon={<Users className="h-4 w-4" />}
                                    title="Support Groups"
                                    description="Find country-specific support groups for immigrants."
                                    link="/community/support-groups"
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>

                <CardFooter className="flex justify-between border-t p-6">
                    <Button variant="ghost" onClick={() => completeStep('resources')}>
                        Skip
                    </Button>
                    <Button onClick={handleFinish} className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Finish
                    </Button>
                </CardFooter>
            </motion.div>
        </div>
    );
}; 