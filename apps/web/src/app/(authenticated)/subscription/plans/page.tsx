"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SubscriptionPlans } from "@/components/ui/subscription-plans";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth/hooks";
import { useSupabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

export default function SubscriptionPlansPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = useSupabaseBrowser();
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        setCurrentPlan(data?.plan_id || null);
      } catch (error) {
        console.error("Error fetching subscription:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch subscription information",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [user, supabase, toast]);

  const handleSelectPlan = async (planId: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // In a real implementation, this would redirect to a checkout page
    // or handle the subscription process through Stripe or another payment provider
    router.push(`/settings/billing?plan=${planId}`);
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Select the plan that best fits your needs. Upgrade anytime or cancel
            whenever you want.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <SubscriptionPlans
            currentPlan={currentPlan}
            onSelectPlan={handleSelectPlan}
          />
        )}

        <div className="mx-auto max-w-2xl text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need a custom plan?</CardTitle>
              <CardDescription>
                Contact our sales team for enterprise options and custom
                solutions
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => router.push("/contact")}>
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
