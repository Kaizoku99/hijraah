"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for individuals getting started",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      "Up to 5 documents",
      "Basic research tools",
      "Limited document storage",
      "Standard support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced features for professionals",
    price: {
      monthly: 15,
      yearly: 144,
    },
    features: [
      "Unlimited documents",
      "Advanced research tools",
      "10GB document storage",
      "Priority support",
      "No watermark",
      "Collaboration tools",
    ],
    isPopular: true,
  },
  {
    id: "business",
    name: "Business",
    description: "Enterprise-grade features for teams",
    price: {
      monthly: 49,
      yearly: 468,
    },
    features: [
      "Everything in Pro",
      "50GB document storage",
      "Admin controls",
      "API access",
      "Team collaboration tools",
      "Premium support",
      "Custom integrations",
    ],
  },
];

interface SubscriptionPlansProps {
  currentPlan: string | null;
  onSelectPlan: (planId: string) => void;
}

export function SubscriptionPlans({
  currentPlan,
  onSelectPlan,
}: SubscriptionPlansProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="space-y-6">
      <div className="mx-auto flex w-fit flex-col items-center space-y-4">
        <Tabs
          defaultValue="monthly"
          onValueChange={(value) =>
            setBillingCycle(value as "monthly" | "yearly")
          }
        >
          <TabsList>
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">Yearly Billing (Save 20%)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col ${
              plan.isPopular ? "border-blue-500 shadow-lg" : ""
            } relative`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  $
                  {billingCycle === "monthly"
                    ? plan.price.monthly
                    : Math.round(plan.price.yearly / 12)}
                </span>
                <span className="text-muted-foreground">/month</span>
                {billingCycle === "yearly" && (
                  <div className="mt-1 text-sm text-muted-foreground">
                    Billed yearly (${plan.price.yearly})
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={currentPlan === plan.id ? "outline" : "default"}
                className={`w-full ${
                  currentPlan === plan.id
                    ? "border-green-500 text-green-600"
                    : ""
                } ${plan.isPopular && currentPlan !== plan.id ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                onClick={() => onSelectPlan(plan.id)}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Current Plan" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
