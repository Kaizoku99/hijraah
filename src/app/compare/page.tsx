'use client';

import { useState } from 'react';
import { ImmigrationComparison } from '@/components/immigration/comparison';
import { ApiClient } from '@/lib/api-client';
import { toast } from 'sonner';

const apiClient = new ApiClient();

export default function ComparePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [comparison, setComparison] = useState<string | null>(null);

  const handleCompare = async (countries: string[], category: string) => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.compareCountries(countries, category);
      setComparison(data);
      toast.success('Comparison generated successfully');
    } catch (error) {
      console.error('Comparison error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to compare countries');
      setComparison('Failed to compare countries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Immigration Requirements</h1>
      <ImmigrationComparison
        onCompare={handleCompare}
        isLoading={isLoading}
        comparison={comparison}
      />
    </div>
  );
} 