import { Calculator, CheckSquare, ClipboardList } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ToolsPage() {
  const tools = [
    {
      title: "Eligibility Assessment",
      description: "Check if you qualify for various immigration programs",
      icon: CheckSquare,
      href: "/tools/eligibility",
    },
    {
      title: "Points Calculator",
      description: "Calculate your points for skilled immigration programs",
      icon: Calculator,
      href: "/tools/points-calculator",
    },
    {
      title: "Document Checklist",
      description: "Generate a personalized document checklist",
      icon: ClipboardList,
      href: "/tools/document-checklist",
    },
  ];

  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Immigration Tools</h1>
        <p className="text-lg text-muted-foreground">
          Use our comprehensive tools to assess your immigration eligibility and
          requirements
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.title}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <tool.icon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{tool.title}</h2>
              <p className="text-muted-foreground">{tool.description}</p>
              <Button asChild className="w-full mt-4">
                <Link href={tool.href}>Get Started</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
