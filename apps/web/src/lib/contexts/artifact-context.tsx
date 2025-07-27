"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useToast } from "@/components/ui/toast";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  Artifact,
  ArtifactMessage,
  ArtifactType,
  ArtifactVisibility,
} from "@/types/artifact";

interface ArtifactContextType {
  artifacts: Artifact[];
  currentArtifact: Artifact | null;
  artifactMessages: ArtifactMessage[];
  isLoading: boolean;
  error: string | null;
  createArtifact: (
    title: string,
    type: ArtifactType,
    content: any,
    chatId?: string
  ) => Promise<Artifact>;
  updateArtifact: (id: string, updates: Partial<Artifact>) => Promise<void>;
  deleteArtifact: (id: string) => Promise<void>;
  getArtifact: (id: string) => Promise<void>;
  addArtifactMessage: (
    artifactId: string,
    message: string,
    role: "user" | "assistant" | "system"
  ) => Promise<void>;
  updateArtifactVisibility: (
    id: string,
    visibility: ArtifactVisibility
  ) => Promise<void>;
}

const ArtifactContext = createContext<ArtifactContextType | undefined>(
  undefined
);

export function ArtifactProvider({ children }: { children: React.ReactNode }) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [currentArtifact, setCurrentArtifact] = useState<Artifact | null>(null);
  const [artifactMessages, setArtifactMessages] = useState<ArtifactMessage[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = getSupabaseClient();

  // Fetch all artifacts for current user
  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("artifacts")
          .select("*")
          .order("updated_at", { ascending: false });

        if (error) throw error;
        setArtifacts(data || []);
      } catch (error) {
        setError("Failed to fetch artifacts");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifacts();

    // Set up subscription for real-time updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const subscription = supabase
      .channel("artifacts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "artifacts",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setArtifacts((prev) => [payload.new as Artifact, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setArtifacts((prev) =>
              prev.map((artifact) =>
                artifact.id === payload.new.id
                  ? (payload.new as Artifact)
                  : artifact
              )
            );
            if (currentArtifact?.id === payload.new.id) {
              setCurrentArtifact(payload.new as Artifact);
            }
          } else if (payload.eventType === "DELETE") {
            setArtifacts((prev) =>
              prev.filter((artifact) => artifact.id !== payload.old.id)
            );
            if (currentArtifact?.id === payload.old.id) {
              setCurrentArtifact(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getArtifact = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch artifact
      const { data: artifact, error: artifactError } = await supabase
        .from("artifacts")
        .select("*")
        .eq("id", id)
        .single();

      if (artifactError) throw artifactError;
      setCurrentArtifact(artifact);

      // Fetch artifact messages
      const { data: messages, error: messagesError } = await supabase
        .from("artifact_messages")
        .select("*")
        .eq("artifact_id", id)
        .order("created_at", { ascending: true });

      if (messagesError) throw messagesError;
      setArtifactMessages(messages || []);
    } catch (error) {
      console.error("Error fetching artifact:", error);
      setError("Failed to fetch artifact");
    } finally {
      setIsLoading(false);
    }
  };

  const createArtifact = async (
    title: string,
    type: ArtifactType,
    content: any,
    chatId?: string
  ): Promise<Artifact> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        throw new Error("User not authenticated");
      }

      const newArtifact = {
        title,
        type,
        content,
        user_id: userData.user.id,
        chat_id: chatId,
        visibility: "private" as ArtifactVisibility,
      };

      const { data, error } = await supabase
        .from("artifacts")
        .insert(newArtifact)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Artifact created",
        description: `${title} has been created successfully`,
        variant: "success",
      });

      return data;
    } catch (error) {
      const errorMessage = "Failed to create artifact";
      setError(errorMessage);
      console.error(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateArtifact = async (id: string, updates: Partial<Artifact>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from("artifacts")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Artifact updated",
        description: "Your changes have been saved",
        variant: "success",
      });
    } catch (error) {
      const errorMessage = "Failed to update artifact";
      setError(errorMessage);
      console.error(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArtifact = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.from("artifacts").delete().eq("id", id);

      if (error) throw error;

      if (currentArtifact?.id === id) {
        setCurrentArtifact(null);
        router.push("/artifacts");
      }

      toast({
        title: "Artifact deleted",
        description: "The artifact has been removed",
        variant: "success",
      });
    } catch (error) {
      const errorMessage = "Failed to delete artifact";
      setError(errorMessage);
      console.error(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addArtifactMessage = async (
    artifactId: string,
    message: string,
    role: "user" | "assistant" | "system"
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const newMessage = {
        artifact_id: artifactId,
        content: message,
        role,
      };

      const { error } = await supabase
        .from("artifact_messages")
        .insert(newMessage);

      if (error) throw error;

      // Refresh messages
      await getArtifact(artifactId);
    } catch (error) {
      setError("Failed to add message");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateArtifactVisibility = async (
    id: string,
    visibility: ArtifactVisibility
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from("artifacts")
        .update({ visibility })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Visibility updated",
        description: `Artifact is now ${visibility}`,
        variant: "success",
      });
    } catch (error) {
      const errorMessage = "Failed to update visibility";
      setError(errorMessage);
      console.error(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    artifacts,
    currentArtifact,
    artifactMessages,
    isLoading,
    error,
    createArtifact,
    updateArtifact,
    deleteArtifact,
    getArtifact,
    addArtifactMessage,
    updateArtifactVisibility,
  };

  return (
    <ArtifactContext.Provider value={value}>
      {children}
    </ArtifactContext.Provider>
  );
}

export const useArtifact = () => {
  const context = useContext(ArtifactContext);
  if (context === undefined) {
    throw new Error("useArtifact must be used within an ArtifactProvider");
  }
  return context;
};
