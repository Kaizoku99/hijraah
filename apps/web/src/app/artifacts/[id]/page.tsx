import { notFound } from "next/navigation";
import React from "react";

import { Artifact } from "@/components/ui/artifact";
import { auth } from "@/lib/auth";
import { getArtifact } from "@/lib/infrastructure/actions";

interface ArtifactPageProps {
  params: {
    id: string;
  };
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-muted-foreground">
          Please sign in to view artifacts
        </p>
      </div>
    );
  }

  const artifact = await getArtifact(params.id, user.id);

  if (!artifact) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <Artifact id={params.id} />
    </div>
  );
}
