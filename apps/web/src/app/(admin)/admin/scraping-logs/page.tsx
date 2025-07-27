"use client";

import { format, parseISO } from "date-fns";
import {
  ArrowLeft,
  RefreshCw,
  Check,
  AlertCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import { Skeleton } from "@/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { useToast } from "@/ui/use-toast";

interface ScrapingLog {
  id: string;
  triggered_at: string;
  status_code: number;
  message: string;
  created_at: string;
}

interface ScrapeHistoryItem {
  id: string;
  source_id: string;
  source_name?: string;
  source_url?: string;
  artifact_id?: string;
  status: "success" | "error" | "pending";
  error_message?: string;
  has_changes: boolean;
  change_summary?: string;
  scraped_at: string;
}

export default function ScrapingLogsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [scrapingLogs, setScrapingLogs] = useState<ScrapingLog[]>([]);
  const [scrapeHistory, setScrapeHistory] = useState<ScrapeHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<"logs" | "history">("logs");

  const fetchScrapingLogs = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/scraping-logs?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch scraping logs");
      }
      const data = await response.json();
      setScrapingLogs(data.logs);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching scraping logs:", error);
      throw error;
    }
  }, [page]);

  const fetchScrapeHistory = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/scrape-history?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch scrape history");
      }
      const data = await response.json();
      setScrapeHistory(data.history);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching scrape history:", error);
      throw error;
    }
  }, [page]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "logs") {
        await fetchScrapingLogs();
      } else {
        await fetchScrapeHistory();
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
      toast({
        title: "Error",
        description: `Failed to fetch ${activeTab}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [activeTab, fetchScrapingLogs, fetchScrapeHistory, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy HH:mm:ss");
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <Badge variant="default">Success</Badge>;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <Badge variant="secondary">Client Error</Badge>;
    } else if (statusCode >= 500) {
      return <Badge variant="destructive">Server Error</Badge>;
    } else {
      return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getScrapeStatusBadge = (status: "success" | "error" | "pending") => {
    if (status === "success") {
      return <Badge variant="default">Success</Badge>;
    } else if (status === "error") {
      return <Badge variant="destructive">Error</Badge>;
    } else {
      return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const handleRefresh = async (e: any) => {
    fetchData();
  };

  const handlePageChange = (e: any) => {
    setPage(e);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin" legacyBehavior>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Scraping Logs</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Monitor scheduled scraping jobs and their results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button asChild>
            <Link href="/admin/scraping-sources">Manage Sources</Link>
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab("logs")}
            className={`py-2 px-4 border-b-2 ${
              activeTab === "logs"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Cron Job Logs
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-2 px-4 border-b-2 ${
              activeTab === "history"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Scrape History
          </button>
        </div>
      </div>
      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>
      ) : activeTab === "logs" ? (
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Job Execution Logs</CardTitle>
            <CardDescription>
              Records of each time the scheduled scraping job ran
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scrapingLogs.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No scraping logs found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scrapingLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">
                          {formatDate(log.triggered_at)}
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status_code)}</TableCell>
                        <TableCell>{log.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Individual Scrape History</CardTitle>
            <CardDescription>
              History of individual source scraping attempts and results
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scrapeHistory.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No scrape history found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Changes</TableHead>
                      <TableHead>Message/Error</TableHead>
                      <TableHead>Document</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scrapeHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">
                          {formatDate(item.scraped_at)}
                        </TableCell>
                        <TableCell>
                          {item.source_name || item.source_id}
                          {item.source_url && (
                            <a
                              href={item.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          {getScrapeStatusBadge(item.status)}
                        </TableCell>
                        <TableCell>
                          {item.status === "success" && (
                            <Badge
                              variant={
                                item.has_changes ? "outline" : "secondary"
                              }
                            >
                              {item.has_changes
                                ? "Changes Detected"
                                : "No Changes"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="max-w-md truncate">
                          {item.error_message ||
                            (item.has_changes
                              ? item.change_summary
                              : "Successful scrape")}
                        </TableCell>
                        <TableCell>
                          {item.artifact_id && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/documents/${item.artifact_id}`}>
                                View
                              </Link>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) handlePageChange(page - 1);
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNum);
                    }}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && page < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) handlePageChange(page + 1);
                }}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
