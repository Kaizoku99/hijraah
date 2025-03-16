'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';
import {
    CreditCard,
    Receipt,
    ShieldCheck,
    ChevronRight,
    Plus,
    AlertCircle,
    CheckCircle,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import {
    Alert,
    AlertTitle,
    AlertDescription
} from '@/components/ui/alert';

interface BillingInformation {
    plan: string;
    status: 'active' | 'canceled' | 'past_due' | 'trialing';
    currentPeriodEnd: string;
    paymentMethod?: {
        brand: string;
        last4: string;
        expiryMonth: number;
        expiryYear: number;
    };
    invoices: {
        id: string;
        date: string;
        amount: number;
        status: 'paid' | 'open' | 'void';
        url?: string;
    }[];
}

const sampleBillingInfo: BillingInformation = {
    plan: 'Pro',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: {
        brand: 'visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
    },
    invoices: [
        {
            id: 'inv_123456',
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: 15.00,
            status: 'paid',
            url: '#',
        },
        {
            id: 'inv_123455',
            date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            amount: 15.00,
            status: 'paid',
            url: '#',
        },
    ],
};

export default function BillingPage() {
    const { user } = useAuth();
    const supabase = getSupabaseClient();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan');

    const [billingInfo, setBillingInfo] = useState<BillingInformation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpgrading, setIsUpgrading] = useState(false);

    useEffect(() => {
        const fetchBillingInfo = async () => {
            if (!user?.id) return;

            try {
                setIsLoading(true);

                // In a real implementation, this would fetch actual billing data from the database or payment provider
                // For this example, we're using sample data
                setBillingInfo(sampleBillingInfo);

                // If a plan ID is provided in the URL, show a success toast
                if (planId) {
                    toast({
                        title: "Plan Selected",
                        description: `You've selected the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan. Complete your payment details to upgrade.`,
                        variant: "default",
                    });
                }
            } catch (error) {
                console.error('Error fetching billing information:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to fetch billing information',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchBillingInfo();
    }, [user, supabase, toast, planId]);

    const handleAddPaymentMethod = () => {
        // In a real implementation, this would open a payment method form or redirect to a payment provider
        toast({
            title: "Payment Method",
            description: "In a real implementation, this would open a payment form.",
        });
    };

    const handleUpgrade = async () => {
        if (!planId) return;

        try {
            setIsUpgrading(true);

            // In a real implementation, this would create a checkout session with Stripe or another payment provider
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast({
                title: "Subscription Updated",
                description: `You've successfully upgraded to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
                variant: "default",
            });

            // Update the billing info with the new plan
            if (billingInfo) {
                setBillingInfo({
                    ...billingInfo,
                    plan: planId.charAt(0).toUpperCase() + planId.slice(1),
                });
            }
        } catch (error) {
            console.error('Error upgrading plan:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to upgrade plan',
            });
        } finally {
            setIsUpgrading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'open':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-red-500" />;
        }
    };

    return (
        <div className="container max-w-4xl py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Billing & Subscription</h1>
                <Button variant="outline" onClick={() => window.location.href = '/subscription/plans'}>
                    View Plans
                </Button>
            </div>

            <div className="mt-8 space-y-8">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <>
                        {planId && !billingInfo?.paymentMethod && (
                            <Alert className="mb-8">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Complete your subscription</AlertTitle>
                                <AlertDescription>
                                    Add a payment method to activate your {planId.charAt(0).toUpperCase() + planId.slice(1)} subscription.
                                </AlertDescription>
                            </Alert>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <ShieldCheck className="mr-2 h-5 w-5 text-blue-500" />
                                    Current Plan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium">{billingInfo?.plan || 'Free'} Plan</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {billingInfo?.status === 'active'
                                                    ? `Renews on ${formatDate(billingInfo.currentPeriodEnd)}`
                                                    : 'No active subscription'}
                                            </p>
                                        </div>
                                        {billingInfo?.status === 'active' && (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => window.location.href = '/subscription/plans'}
                                    variant="outline"
                                    className="w-full"
                                >
                                    {billingInfo?.plan === 'Free' ? 'Upgrade Plan' : 'Change Plan'}
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {billingInfo?.paymentMethod ? (
                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-border p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium capitalize">{billingInfo.paymentMethod.brand} •••• {billingInfo.paymentMethod.last4}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Expires {billingInfo.paymentMethod.expiryMonth}/{billingInfo.paymentMethod.expiryYear}
                                                    </p>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-dashed border-border p-6 text-center">
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                            <CreditCard className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-1 text-lg font-medium">No payment method</h3>
                                        <p className="mb-4 text-sm text-muted-foreground">
                                            Add a payment method to subscribe to a paid plan
                                        </p>
                                        {planId ? (
                                            <Button onClick={handleAddPaymentMethod} className="mx-auto">
                                                Add payment method
                                            </Button>
                                        ) : (
                                            <Button onClick={handleAddPaymentMethod} variant="outline" className="mx-auto">
                                                Add payment method
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {planId && !billingInfo?.paymentMethod && (
                            <div className="mt-6 flex justify-end">
                                <Button
                                    onClick={handleUpgrade}
                                    disabled={isUpgrading || !billingInfo?.paymentMethod}
                                    className="px-8"
                                >
                                    {isUpgrading ? 'Processing...' : 'Complete Upgrade'}
                                </Button>
                            </div>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Receipt className="mr-2 h-5 w-5 text-blue-500" />
                                    Billing History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {billingInfo?.invoices && billingInfo.invoices.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Invoice</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="w-10"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {billingInfo.invoices.map((invoice) => (
                                                <TableRow key={invoice.id}>
                                                    <TableCell>{formatDate(invoice.date)}</TableCell>
                                                    <TableCell>{invoice.id}</TableCell>
                                                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                                                    <TableCell className="flex items-center gap-1">
                                                        {getStatusIcon(invoice.status)}
                                                        <span className="capitalize">{invoice.status}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {invoice.url && (
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">
                                        No billing history available
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
} 