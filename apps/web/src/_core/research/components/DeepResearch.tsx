"use client";

import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Separator } from "@/ui/separator";
import { Textarea } from "@/ui/textarea";

interface DeepResearchProps {
  onResearch: (
    query: string,
    options: {
      country?: string;
      category?: string;
      depth: "basic" | "detailed" | "comprehensive";
    },
  ) => Promise<void>;
  isLoading: boolean;
  results: string | null;
}

const categories = ["visa", "study", "work", "immigrate", "citizenship"];

const depthLevels = [
  { value: "basic", label: "Basic Overview" },
  { value: "detailed", label: "Detailed Analysis" },
  { value: "comprehensive", label: "Comprehensive Research" },
] as const;

export function DeepResearch({
  onResearch,
  isLoading,
  results,
}: DeepResearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDepth, setSelectedDepth] = useState<
    "basic" | "detailed" | "comprehensive"
  >("detailed");

  const availableCountries: string[] = [];

  const handleResearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a research query");
      return;
    }

    try {
      await onResearch(query, {
        country: selectedCountry || undefined,
        category: selectedCategory || undefined,
        depth: selectedDepth,
      });
    } catch (error) {
      console.error("Research error:", error);
      toast.error("Failed to perform research. Please try again.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Deep Immigration Research</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Research Query</h3>
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research question..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Country (Optional)</h3>
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Country</SelectItem>
                  {availableCountries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country.charAt(0).toUpperCase() + country.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Category (Optional)</h3>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Research Depth</h3>
              <Select
                value={selectedDepth}
                onValueChange={(
                  value: "basic" | "detailed" | "comprehensive",
                ) => setSelectedDepth(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent>
                  {depthLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={handleResearch}
          disabled={isLoading || !query.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Researching...
            </>
          ) : (
            "Start Deep Research"
          )}
        </Button>

        {results && (
          <>
            <Separator />
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold mb-4">Research Results</h2>
              <ScrollArea className="h-[600px]">
                <div className="prose dark:prose-invert max-w-none">
                  {results}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
