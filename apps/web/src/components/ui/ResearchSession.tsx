import { Loader2, AlertCircle, Check, X } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useHijraahApi } from "@/hooks/useHijarahApi";
import { ResearchSession } from "@/types/api";

export function ResearchSessionStarter() {
  const [query, setQuery] = useState("");
  const [maxDepth, setMaxDepth] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { research } = useHijraahApi();
  const { toast } = useToast();

  const handleStartResearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a research query",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await research.start(query, maxDepth);

      if (error) {
        throw new Error(error);
      }

      if (data) {
        setSessionId(data.sessionId);
        toast({
          title: "Research Started",
          description: "Your research session has been successfully initiated",
          variant: "default",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to start research",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Start New Research</CardTitle>
        <CardDescription>
          Enter a query to research immigration-related information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="query">Research Query</Label>
          <Textarea
            id="query"
            placeholder="E.g., What are the immigration requirements for skilled workers in Canada?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="depth">Research Depth</Label>
            <span className="text-sm text-muted-foreground">{maxDepth}</span>
          </div>
          <Slider
            id="depth"
            min={1}
            max={5}
            step={1}
            defaultValue={[maxDepth]}
            onValueChange={(values) => setMaxDepth(values[0])}
          />
          <p className="text-xs text-muted-foreground">
            Higher depth means more thorough research but may take longer
          </p>
        </div>

        {sessionId && (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Research in progress</AlertTitle>
            <AlertDescription>
              Your research is being processed. Session ID: {sessionId}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleStartResearch}
          disabled={isSubmitting || !query.trim() || !!sessionId}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Starting Research...
            </>
          ) : (
            "Start Research"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface SessionListProps {
  onSelectSession: (session: ResearchSession) => void;
}

export function ResearchSessionList({ onSelectSession }: SessionListProps) {
  const [sessions, setSessions] = useState<ResearchSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { research } = useHijraahApi();
  const { toast } = useToast();

  const fetchSessions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await research.getUserSessions();

      if (error) {
        throw new Error(error);
      }

      if (data?.sessions) {
        setSessions(data.sessions);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load sessions");
      toast({
        title: "Error",
        description: err.message || "Failed to load research sessions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load sessions when component mounts
  useState(() => {
    fetchSessions();
  });

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      active: { color: "bg-blue-100 text-blue-800", label: "Active" },
      processing: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Processing",
      },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      error: { color: "bg-red-100 text-red-800", label: "Error" },
      cancelled: { color: "bg-gray-100 text-gray-800", label: "Cancelled" },
    };

    const { color, label } = statusMap[status] || {
      color: "bg-gray-100 text-gray-800",
      label: status,
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (sessions.length === 0) {
    return (
      <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Sessions Found</AlertTitle>
        <AlertDescription>
          You haven&apos;t started any research sessions yet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Research Sessions</h3>
      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card
            key={session.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectSession(session)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{session.query}</CardTitle>
                {getStatusBadge(session.status)}
              </div>
              <CardDescription>
                Created: {new Date(session.created_at).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSession(session);
                }}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSession(session);
                      }}
                    >
                      View Results
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      It&apos;s recommended to limit results for better
                      performance.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button variant="outline" onClick={fetchSessions} className="w-full">
        Refresh Sessions
      </Button>
    </div>
  );
}
