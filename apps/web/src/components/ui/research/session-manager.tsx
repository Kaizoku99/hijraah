"use client";

import { formatDistanceToNow } from "date-fns";
import { Search, Plus, Archive, Trash2, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";

// Import UI components with correct paths
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Skeleton } from "@/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

import { DeepResearch as ResearchComponent } from "@/_core/research/components/DeepResearch";

// Types
interface ResearchSession {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "archived" | "completed";
  createdBy: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  caseId?: string;
  category: string;
  notes?: string;
}

interface ResearchSessionManagerProps {
  initialSessions?: ResearchSession[];
  onSessionSelect?: (session: ResearchSession) => void;
  onSessionCreate?: (session: Partial<ResearchSession>) => void;
  onSessionDelete?: (sessionId: string) => void;
  onSessionArchive?: (sessionId: string) => void;
  initialSelectedSessionId?: string;
}

// Session manager component
export function ResearchSessionManager({
  initialSessions,
  onSessionSelect,
  onSessionCreate,
  onSessionDelete,
  onSessionArchive,
  initialSelectedSessionId,
}: ResearchSessionManagerProps) {
  const [sessions, setSessions] = useState<ResearchSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<ResearchSession[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSession, setSelectedSession] =
    useState<ResearchSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "archived">(
    "all",
  );

  // Simulate fetching sessions
  useEffect(() => {
    const fetchSessions = async () => {
      // In a real implementation, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use initial sessions if provided, otherwise use mock data
      const data = initialSessions || mockSessions;
      setSessions(data);
      setFilteredSessions(data);
      setIsLoading(false);

      // Select initial session if ID is provided and session exists
      if (initialSelectedSessionId) {
        const initialSession = data.find(
          (s) => s.id === initialSelectedSessionId,
        );
        if (initialSession) {
          setSelectedSession(initialSession);
          if (onSessionSelect) {
            onSessionSelect(initialSession); // Notify parent if needed
          }
        }
      }
    };

    fetchSessions();
  }, [initialSessions, initialSelectedSessionId, onSessionSelect]);

  // Filter sessions based on search query and active tab
  useEffect(() => {
    let filtered = [...sessions];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (session) =>
          session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          session.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((session) => session.status === activeTab);
    }

    setFilteredSessions(filtered);
  }, [sessions, searchQuery, activeTab]);

  // Handle session selection
  const handleSessionSelect = (session: ResearchSession) => {
    setSelectedSession(session);
    if (onSessionSelect) {
      onSessionSelect(session);
    }
  };

  // Create a new session
  const handleCreateSession = () => {
    const newSession: ResearchSession = {
      id: `session-${Date.now()}`,
      title: "New Research Session",
      description: "Click to add description",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
      createdBy: {
        id: "user-1",
        name: "Current User",
      },
      category: "General",
    };

    setSessions([newSession, ...sessions]);

    if (onSessionCreate) {
      onSessionCreate(newSession);
    }

    // Select the new session
    setSelectedSession(newSession);
  };

  // Delete a session
  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id));

    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }

    if (onSessionDelete) {
      onSessionDelete(id);
    }
  };

  // Archive a session
  const handleArchiveSession = (id: string) => {
    setSessions(
      sessions.map((session) =>
        session.id === id
          ? { ...session, status: "archived" as const, updatedAt: new Date() }
          : session,
      ),
    );

    if (onSessionArchive) {
      onSessionArchive(id);
    }
  };

  // The DeepResearch component (nested)
  const DeepResearch = () => {
    const [isResearchLoading, setIsResearchLoading] = useState(false);
    const [researchResult, setResearchResult] = useState<string | null>(null);

    if (!selectedSession) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
          <h3 className="text-xl font-medium">No Session Selected</h3>
          <p className="mt-2">
            Select a research session from the list or create a new one
          </p>
        </div>
      );
    }

    // Placeholder onResearch handler
    const handleSessionResearch = async (
      query: string,
      options: {
        country?: string;
        category?: string;
        depth: "basic" | "detailed" | "comprehensive";
      },
    ) => {
      setIsResearchLoading(true);
      // In a real scenario, this would use selectedSession.id or other details
      // to perform research, e.g., call an API.
      console.log(
        `Researching for session ${selectedSession.id}: Query - ${query}, Options - ${JSON.stringify(options)}`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      setResearchResult(
        `Results for query "${query}" on session "${selectedSession.title}". Options: ${JSON.stringify(options)}`,
      );
      setIsResearchLoading(false);
    };

    return (
      <div className="h-full overflow-auto">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{selectedSession.title}</CardTitle>
            <CardDescription>
              Created{" "}
              {formatDistanceToNow(selectedSession.createdAt, {
                addSuffix: true,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1">{selectedSession.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">{selectedSession.category}</p>
              </div>

              {selectedSession.caseId && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Related Case
                  </h3>
                  <p className="mt-1">{selectedSession.caseId}</p>
                </div>
              )}

              {selectedSession.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="mt-1 whitespace-pre-line">
                    {selectedSession.notes}
                  </p>
                </div>
              )}

              {/* Use the imported ResearchComponent with correct props */}
              <ResearchComponent
                onResearch={handleSessionResearch}
                isLoading={isResearchLoading}
                results={researchResult}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleArchiveSession(selectedSession.id)}
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteSession(selectedSession.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Research Sessions</h2>
          <Button onClick={handleCreateSession} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search sessions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="active" onClick={() => setActiveTab("active")}>
              Active
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              onClick={() => setActiveTab("archived")}
            >
              Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-0 mt-2">
            <SessionList
              sessions={filteredSessions}
              selectedId={selectedSession?.id}
              onSelect={handleSessionSelect}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="active" className="space-y-0 mt-2">
            <SessionList
              sessions={filteredSessions}
              selectedId={selectedSession?.id}
              onSelect={handleSessionSelect}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="archived" className="space-y-0 mt-2">
            <SessionList
              sessions={filteredSessions}
              selectedId={selectedSession?.id}
              onSelect={handleSessionSelect}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <DeepResearch />
      </div>
    </div>
  );
}

// Session list component
function SessionList({
  sessions,
  selectedId,
  onSelect,
  isLoading,
}: {
  sessions: ResearchSession[];
  selectedId?: string;
  onSelect: (session: ResearchSession) => void;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SessionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center border rounded-md">
        <p className="text-sm text-gray-500">No sessions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <Card
          key={session.id}
          className={`cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedId === session.id ? "border-primary" : ""
          }`}
          onClick={() => onSelect(session)}
        >
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{session.title}</CardTitle>
                <CardDescription className="text-xs">
                  {session.description.length > 60
                    ? `${session.description.substring(0, 60)}...`
                    : session.description}
                </CardDescription>
              </div>
              <Badge
                variant={
                  session.status === "active"
                    ? "default"
                    : session.status === "completed"
                      ? "secondary"
                      : "secondary"
                }
              >
                {session.status}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="p-4 pt-0 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
              </div>
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {session.createdBy.name}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// Loading skeleton
function SessionSkeleton() {
  return (
    <Card>
      <CardHeader className="p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-3 w-1/2" />
      </CardFooter>
    </Card>
  );
}

// Mock data for development
const mockSessions: ResearchSession[] = [
  {
    id: "1",
    title: "Visa Requirements Research",
    description:
      "Research on eligibility requirements for work visas in the UK",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    status: "active",
    createdBy: {
      id: "user-1",
      name: "Jane Smith",
      avatarUrl: "/avatars/jane-smith.png",
    },
    caseId: "case-12345",
    category: "Work Visas",
    notes:
      "Client needs to know about the latest changes to Skilled Worker Visa requirements.",
  },
  {
    id: "2",
    title: "Family Reunification Process",
    description:
      "Analysis of documentation needed for family reunification applications",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    status: "active",
    createdBy: {
      id: "user-2",
      name: "John Davis",
    },
    category: "Family Visas",
  },
  {
    id: "3",
    title: "Student Visa Extensions",
    description:
      "Research on policy changes affecting student visa extensions post-graduation",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    status: "archived",
    createdBy: {
      id: "user-1",
      name: "Jane Smith",
      avatarUrl: "/avatars/jane-smith.png",
    },
    category: "Student Visas",
  },
  {
    id: "4",
    title: "Asylum Procedure Updates",
    description:
      "Summary of recent changes to asylum application procedures and processing times",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    status: "active",
    createdBy: {
      id: "user-3",
      name: "Michael Chen",
    },
    caseId: "case-67890",
    category: "Asylum",
    notes: "Need to compile a comprehensive guide for legal team reference.",
  },
  {
    id: "5",
    title: "Brexit Impact Analysis",
    description:
      "Analysis of Brexit impacts on EEA nationals currently residing in the UK",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    status: "completed",
    createdBy: {
      id: "user-2",
      name: "John Davis",
    },
    category: "Policy Analysis",
    notes:
      "This research has been completed and findings have been compiled into a report for clients.",
  },
];
