"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";

export default function HelpPage() {
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <div className="grid gap-6">
        {/* Quick Support Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-muted-foreground mb-4">
            Our AI assistant is available 24/7 to help answer your questions.
          </p>
          <Button asChild>
            <Link href="/chat" legacyBehavior>
              <a>
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </a>
            </Link>
          </Button>
        </Card>

        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is">
              <AccordionTrigger>What is Hijraah?</AccordionTrigger>
              <AccordionContent>
                Hijraah is an AI-powered immigration assistant that helps you
                navigate the complex immigration process. We provide
                personalized guidance, document assistance, and real-time
                support for your immigration journey.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-works">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent>
                Our AI analyzes your specific situation and provides tailored
                guidance based on current immigration laws and regulations. You
                can chat with our AI assistant, get document reviews, and
                receive step-by-step guidance throughout your immigration
                process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features">
              <AccordionTrigger>What features are available?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>24/7 AI Chat Support</li>
                  <li>Document Review and Analysis</li>
                  <li>Eligibility Assessment</li>
                  <li>Step-by-Step Immigration Guidance</li>
                  <li>Real-time Updates and Notifications</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger>How can I get support?</AccordionTrigger>
              <AccordionContent>
                You can get support through multiple channels:
                <ul className="list-disc pl-4 space-y-2 mt-2">
                  <li>Chat with our AI assistant 24/7</li>
                  <li>Email support at support@hijraah.com</li>
                  <li>Check our documentation for detailed guides</li>
                  <li>Join our community forum</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
