"use client";

import { useAuth } from "@/lib/auth/hooks";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import RoadmapView from "@/components/ui/roadmap/roadmap-view";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function RoadmapDetailPage() {
  const params = useParams();
  const roadmapId = params.id as string;
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!user) return;

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("roadmaps")
          .select("*, cases:case_id(*)")
          .eq("id", roadmapId)
          .single();

        if (error) {
          setError("Failed to load roadmap data");
          return;
        }

        // Check if user has access
        if (
          data.user_id !== user.id &&
          (!data.cases?.assignments ||
            !data.cases.assignments.some((a: any) => a.userId === user.id))
        ) {
          setError("You do not have access to this roadmap");
          return;
        }

        setRoadmap(data);
      } catch (err) {
        console.error(err);
        setError("An error occurred while loading the roadmap");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId, user, supabase]);

  const deleteRoadmap = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this roadmap? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("roadmaps")
        .delete()
        .eq("id", roadmapId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete roadmap",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Roadmap deleted successfully",
      });

      // Redirect to roadmaps list
      window.location.href = "/dashboard/roadmaps";
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "An error occurred while deleting the roadmap",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <div className="mt-4">
              <Link href="/dashboard/roadmaps" legacyBehavior>
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Roadmaps
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/dashboard/roadmaps" legacyBehavior>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Roadmaps
          </Button>
        </Link>

        {user && roadmap && roadmap.user_id === user.id && (
          <Button variant="destructive" onClick={deleteRoadmap}>
            Delete Roadmap
          </Button>
        )}
      </div>
      {roadmap && user && (
        <RoadmapView roadmapId={roadmapId} userId={user.id} />
      )}
      {roadmap && roadmap.cases && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Case</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-medium">Case Title:</span>{" "}
                {roadmap.cases.title}
              </p>
              <p>
                <span className="font-medium">Case Number:</span>{" "}
                {roadmap.cases.case_number}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {roadmap.cases.status}
              </p>

              <div className="mt-4">
                <Link
                  href={`/dashboard/cases/${roadmap.case_id}`}
                  legacyBehavior
                >
                  <Button variant="outline">View Case</Button>
                </Link>

                <Link
                  href={`/dashboard/cases/${roadmap.case_id}/roadmap`}
                  className="ml-2"
                  legacyBehavior
                >
                  <Button variant="outline">Manage Roadmaps</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
