import { useState } from 'react';
import { useHijraahApi } from '@/hooks/useHijarahApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define subscription plans (matches backend tiers)
export enum PlanType {
    FREE = 'free',
    BASIC = 'basic',
    PROFESSIONAL = 'professional',
    ENTERPRISE = 'enterprise',
}

// Define feature limits for each plan
export interface PlanFeatures {
    price: string;
    apiRequestsPerDay: number;
    scrapingRequestsPerDay: number;
    vectorSearchRequestsPerDay: number;
    researchSessionsPerDay: number;
    supportLevel: string;
    additionalFeatures: string[];
    highlighted?: boolean;
}

// Plan details
const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
    [PlanType.FREE]: {
        price: '$0/month',
        apiRequestsPerDay: 5000,
        scrapingRequestsPerDay: 50,
        vectorSearchRequestsPerDay: 500,
        researchSessionsPerDay: 20,
        supportLevel: 'Community Support',
        additionalFeatures: [
            'Basic API access',
            'Basic web scraping',
            'Basic vector search',
            'Limited research sessions',
        ],
    },
    [PlanType.BASIC]: {
        price: '$19/month',
        apiRequestsPerDay: 10000,
        scrapingRequestsPerDay: 500,
        vectorSearchRequestsPerDay: 3000,
        researchSessionsPerDay: 100,
        supportLevel: 'Email Support',
        additionalFeatures: [
            'Full API access',
            'Enhanced web scraping',
            'Advanced vector search',
            'Expanded research capabilities',
            'Data storage (1GB)',
        ],
        highlighted: true,
    },
    [PlanType.PROFESSIONAL]: {
        price: '$49/month',
        apiRequestsPerDay: 50000,
        scrapingRequestsPerDay: 5000,
        vectorSearchRequestsPerDay: 10000,
        researchSessionsPerDay: 1000,
        supportLevel: 'Priority Email Support',
        additionalFeatures: [
            'Full API access',
            'Advanced web scraping',
            'Premium vector search capabilities',
            'Unlimited research sessions',
            'Data storage (10GB)',
            'Custom API domains',
        ],
    },
    [PlanType.ENTERPRISE]: {
        price: 'Contact Us',
        apiRequestsPerDay: 200000,
        scrapingRequestsPerDay: 20000,
        vectorSearchRequestsPerDay: 50000,
        researchSessionsPerDay: 10000,
        supportLevel: 'Dedicated Account Manager',
        additionalFeatures: [
            'Unlimited API access',
            'Enterprise-grade web scraping',
            'Custom vector search models',
            'Advanced analytics',
            'Data storage (100GB+)',
            'SLA guarantees',
            'On-premises deployment option',
            'Custom integration support',
        ],
    },
};

export function SubscriptionPlans() {
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('monthly');
    const [userPlan, setUserPlan] = useState<PlanType | null>(null);
    const { subscription, auth } = useHijraahApi();
    const { toast } = useToast();

    // Get current user's plan when component mounts
    useState(() => {
        const fetchUserPlan = async () => {
            try {
                const { data } = await subscription.getCurrentPlan();
                if (data?.plan) {
                    setUserPlan(data.plan as PlanType);
                }
            } catch (error) {
                console.error('Failed to fetch user plan:', error);
            }
        };

        fetchUserPlan();
    });

    const handleSelectPlan = (plan: PlanType) => {
        setSelectedPlan(plan);
    };

    const handleChangePlan = async () => {
        if (!selectedPlan) {
            return;
        }

        setIsLoading(true);

        try {
            // For free plan, directly update
            if (selectedPlan === PlanType.FREE) {
                const { data, error } = await subscription.updatePlan(selectedPlan);

                if (error) {
                    throw new Error(error);
                }

                setUserPlan(selectedPlan);
                toast({
                    title: "Plan Updated",
                    description: `You are now on the ${selectedPlan.toUpperCase()} plan`,
                    variant: "default",
                });
            } else {
                // For paid plans, redirect to checkout
                const { data, error } = await subscription.createCheckoutSession(selectedPlan);

                if (error) {
                    throw new Error(error);
                }

                // Redirect to checkout URL
                if (data?.checkoutUrl) {
                    window.location.href = data.checkoutUrl;
                }
            }
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to change subscription plan",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                    Choose the right plan for your immigration research needs
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <Tabs defaultValue="monthly" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="flex justify-center mb-8">
                            <TabsList>
                                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                                <TabsTrigger value="yearly">Yearly Billing (Save 20%)</TabsTrigger>
                            </TabsList>
                        </div>
                    </Tabs>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(PLAN_FEATURES).map(([planKey, features]) => {
                        const plan = planKey as PlanType;
                        const isCurrentPlan = userPlan === plan;
                        const isSelected = selectedPlan === plan;

                        return (
                            <Card
                                key={plan}
                                className={`${features.highlighted ? 'border-primary' : ''} ${isSelected ? 'ring-2 ring-primary' : ''} relative`}
                            >
                                {features.highlighted && (
                                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                                        <Badge className="bg-primary hover:bg-primary">Most Popular</Badge>
                                    </div>
                                )}

                                {isCurrentPlan && (
                                    <div className="absolute top-2 right-2">
                                        <Badge variant="outline" className="border-green-500 text-green-600">
                                            Current Plan
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="text-lg">{plan.charAt(0).toUpperCase() + plan.slice(1)}</CardTitle>
                                    <CardDescription>
                                        <div className="flex items-baseline mt-2">
                                            <span className="text-2xl font-bold">
                                                {activeTab === 'yearly' && plan !== PlanType.FREE && plan !== PlanType.ENTERPRISE
                                                    ? `$${parseFloat(features.price.replace(/[^0-9.]/g, '')) * 0.8 * 12}/year`
                                                    : features.price}
                                            </span>
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{features.apiRequestsPerDay.toLocaleString()} API requests/day</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{features.scrapingRequestsPerDay.toLocaleString()} scraping requests/day</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{features.vectorSearchRequestsPerDay.toLocaleString()} vector searches/day</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{features.researchSessionsPerDay.toLocaleString()} research sessions/day</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{features.supportLevel}</span>
                                        </li>

                                        <li className="pt-2 border-t mt-2">
                                            <h4 className="font-medium mb-2">Additional Features:</h4>
                                            <ul className="space-y-1.5">
                                                {features.additionalFeatures.map((feature, index) => (
                                                    <li key={index} className="flex gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    {isCurrentPlan ? (
                                        <Button disabled className="w-full">Current Plan</Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleSelectPlan(plan)}
                                            variant={isSelected ? "default" : "outline"}
                                            className="w-full"
                                        >
                                            {isSelected ? "Selected" : "Select Plan"}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {selectedPlan && !isLoading && (
                    <div className="mt-8 flex justify-center">
                        <Button onClick={handleChangePlan} size="lg" className="px-8">
                            {selectedPlan === PlanType.FREE
                                ? "Switch to Free Plan"
                                : `Proceed to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan Checkout`}
                        </Button>
                    </div>
                )}

                {isLoading && (
                    <div className="mt-8 flex justify-center">
                        <Button disabled size="lg" className="px-8">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </Button>
                    </div>
                )}

                <div className="mt-8">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Enterprise Features</AlertTitle>
                        <AlertDescription>
                            Need custom integrations, dedicated support, or higher rate limits? Contact our sales team for a custom Enterprise plan.
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>
    );
}

export function CurrentUsage() {
    const [usageData, setUsageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { subscription } = useHijraahApi();

    // Load usage data when component mounts
    useState(() => {
        const fetchUsage = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await subscription.getUsage();
                if (error) {
                    throw new Error(error);
                }
                setUsageData(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load usage data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsage();
    });

    if (isLoading) {
        return (
            <div className="w-full flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (!usageData) {
        return (
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>No usage data</AlertTitle>
                <AlertDescription>
                    No usage data is available yet. Start using the API to see your usage metrics.
                </AlertDescription>
            </Alert>
        );
    }

    // Calculate usage percentages
    const calculatePercentage = (used: number, limit: number) => {
        const percentage = (used / limit) * 100;
        return Math.min(percentage, 100); // Cap at 100%
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>API Usage</CardTitle>
                <CardDescription>
                    Current usage for your {usageData.plan.toUpperCase()} plan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>API Requests</span>
                            <span>{usageData.api.used.toLocaleString()} / {usageData.api.limit.toLocaleString()} daily</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${calculatePercentage(usageData.api.used, usageData.api.limit) > 90
                                        ? 'bg-red-600'
                                        : calculatePercentage(usageData.api.used, usageData.api.limit) > 70
                                            ? 'bg-yellow-400'
                                            : 'bg-green-600'
                                    }`}
                                style={{ width: `${calculatePercentage(usageData.api.used, usageData.api.limit)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>Web Scraping</span>
                            <span>{usageData.scraping.used.toLocaleString()} / {usageData.scraping.limit.toLocaleString()} daily</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${calculatePercentage(usageData.scraping.used, usageData.scraping.limit) > 90
                                        ? 'bg-red-600'
                                        : calculatePercentage(usageData.scraping.used, usageData.scraping.limit) > 70
                                            ? 'bg-yellow-400'
                                            : 'bg-green-600'
                                    }`}
                                style={{ width: `${calculatePercentage(usageData.scraping.used, usageData.scraping.limit)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>Vector Searches</span>
                            <span>{usageData.vector.used.toLocaleString()} / {usageData.vector.limit.toLocaleString()} daily</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${calculatePercentage(usageData.vector.used, usageData.vector.limit) > 90
                                        ? 'bg-red-600'
                                        : calculatePercentage(usageData.vector.used, usageData.vector.limit) > 70
                                            ? 'bg-yellow-400'
                                            : 'bg-green-600'
                                    }`}
                                style={{ width: `${calculatePercentage(usageData.vector.used, usageData.vector.limit)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>Research Sessions</span>
                            <span>{usageData.research.used.toLocaleString()} / {usageData.research.limit.toLocaleString()} daily</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${calculatePercentage(usageData.research.used, usageData.research.limit) > 90
                                        ? 'bg-red-600'
                                        : calculatePercentage(usageData.research.used, usageData.research.limit) > 70
                                            ? 'bg-yellow-400'
                                            : 'bg-green-600'
                                    }`}
                                style={{ width: `${calculatePercentage(usageData.research.used, usageData.research.limit)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Usage Limits</AlertTitle>
                        <AlertDescription>
                            Usage stats reset at midnight UTC. If you need higher limits, consider upgrading your subscription plan.
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>
    );
} 