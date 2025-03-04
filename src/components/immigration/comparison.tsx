'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { countryConfigs } from '@/lib/scrapers/config';
import OpenAI from 'openai';

interface ImmigrationComparisonProps {
  onCompare: (countries: string[], category: string) => Promise<void>;
  isLoading: boolean;
  comparison: string | null;
}

const categories = [
  'visa',
  'study',
  'work',
  'immigrate',
  'citizenship',
];

export function ImmigrationComparison({
  onCompare,
  isLoading: isComparing,
  comparison,
}: ImmigrationComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('visa');
  const [error, setError] = useState<Error | null>(null);

  const availableCountries = Object.keys(countryConfigs);

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleCompare = async () => {
    if (selectedCountries.length < 2) {
      alert('Please select at least 2 countries to compare');
      return;
    }
    try {
      await onCompare(selectedCountries, selectedCategory);
    } catch (err) {
      setError(err as Error);
    }
  };

  // Example of using OpenAI - commented out since it needs configuration
  /* 
  const stream = async () => {
    if (selectedCountries.length < 2) {
      alert('Please select at least 2 countries to compare');
      return;
    }
    try {
      const openai = new OpenAI();
      const prompt = `Compare immigration policies between ${selectedCountries.join(', ')}`;
      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Compare immigration policies" },
          { role: "user", content: prompt }
        ],
        stream: true
      });
      // Handle streaming response
    } catch (err) {
      setError(err as Error);
    }
  };
  */

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Select Countries to Compare</h2>
        <div className="flex flex-wrap gap-2">
          {availableCountries.map(country => (
            <Button
              key={country}
              variant={selectedCountries.includes(country) ? 'secondary' : 'outline'}
              onClick={() => handleCountryToggle(country)}
              className="capitalize"
            >
              {country}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Select Category</h2>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleCompare}
        disabled={selectedCountries.length < 2 || isComparing}
        className="w-full"
      >
        {isComparing ? 'Comparing...' : 'Compare Selected Countries'}
      </Button>

      {comparison && (
        <>
          <Separator />
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-4">Comparison Results</h2>
            <ScrollArea className="h-[400px]">
              <div className="prose dark:prose-invert max-w-none">
                {comparison}
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
} 