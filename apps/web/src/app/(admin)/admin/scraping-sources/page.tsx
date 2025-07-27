"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Globe,
  Plus,
  MoreHorizontal,
  Calendar,
  Shield,
  Clock,
  Trash,
  Edit,
  Play,
  ExternalLink,
  Info,
  Star,
  ThumbsUp,
  ThumbsDown,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Skeleton } from "@/ui/skeleton";
import { Switch } from "@/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Textarea } from "@/ui/textarea";
import { useToast } from "@/ui/use-toast";

// Type definitions
interface ScrapingSource {
  id: string;
  name: string;
  url: string;
  category: "government" | "legal" | "news" | "blog" | "forum" | "other";
  description?: string;
  trust_score: number;
  last_scraped?: string;
  scrape_frequency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Form schema for adding/editing sources
const sourceFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
  category: z.enum(["government", "legal", "news", "blog", "forum", "other"]),
  description: z.string().optional(),
  scrape_frequency: z.string(),
  is_active: z.boolean().default(true),
});

type SourceFormValues = z.infer<typeof sourceFormSchema>;

// Source validation form schema
const validationFormSchema = z.object({
  score: z.number().min(0).max(100),
  notes: z.string().optional(),
});

type ValidationFormValues = z.infer<typeof validationFormSchema>;

export default function ScrapingSourcesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [sources, setSources] = useState<ScrapingSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [currentSource, setCurrentSource] = useState<ScrapingSource | null>(
    null,
  );
  const [validationLoading, setValidationLoading] = useState(false);

  // Add/Edit form
  const form = useForm<SourceFormValues>({
    resolver: zodResolver(sourceFormSchema),
    defaultValues: {
      name: "",
      url: "",
      category: "other",
      description: "",
      scrape_frequency: "1 day",
      is_active: true,
    },
  });

  // Validation form
  const validationForm = useForm<ValidationFormValues>({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      score: 50,
      notes: "",
    },
  });

  const fetchSources = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/scraping-sources");
      if (!response.ok) {
        throw new Error("Failed to fetch sources");
      }
      const data = await response.json();
      setSources(data);
    } catch (error) {
      console.error("Error fetching sources:", error);
      toast({
        title: "Error",
        description: "Failed to fetch scraping sources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  useEffect(() => {
    // Reset form when dialog closes
    if (!addDialogOpen && !editDialogOpen) {
      form.reset();
    }
  }, [addDialogOpen, editDialogOpen, form]);

  // Reset form values when editing a source
  useEffect(() => {
    if (currentSource && editDialogOpen) {
      form.reset({
        name: currentSource.name,
        url: currentSource.url,
        category: currentSource.category,
        description: currentSource.description || "",
        scrape_frequency: currentSource.scrape_frequency,
        is_active: currentSource.is_active,
      });
    }
  }, [currentSource, editDialogOpen, form]);

  const onSubmit = async (values: SourceFormValues) => {
    try {
      const url = currentSource
        ? `/api/admin/scraping-sources/${currentSource.id}`
        : "/api/admin/scraping-sources";

      const method = currentSource ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${currentSource ? "update" : "create"} source`,
        );
      }

      fetchSources();
      toast({
        title: "Success",
        description: `Source ${currentSource ? "updated" : "created"} successfully`,
      });

      setAddDialogOpen(false);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error saving source:", error);
      toast({
        title: "Error",
        description: `Failed to ${currentSource ? "update" : "create"} source`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteSource = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/scraping-sources/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete source");
      }

      fetchSources();
      toast({
        title: "Success",
        description: "Source deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting source:", error);
      toast({
        title: "Error",
        description: "Failed to delete source",
        variant: "destructive",
      });
    }
  };

  const handleManualScrape = async (id: string) => {
    try {
      const response = await fetch("/api/scheduled-scraping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceIds: [id] }),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger scraping");
      }

      const data = await response.json();
      toast({
        title: "Scraping initiated",
        description: "The source will be scraped in the background",
      });

      // Refresh sources after a delay to show updated last_scraped
      setTimeout(fetchSources, 5000);
    } catch (error) {
      console.error("Error triggering scraping:", error);
      toast({
        title: "Error",
        description: "Failed to trigger scraping",
        variant: "destructive",
      });
    }
  };

  const handleValidateSource = async (values: ValidationFormValues) => {
    if (!currentSource) return;

    setValidationLoading(true);
    try {
      const response = await fetch(
        `/api/admin/scraping-sources/${currentSource.id}/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to validate source");
      }

      fetchSources();
      toast({
        title: "Validation submitted",
        description: "Your validation has been recorded",
      });

      setValidationDialogOpen(false);
      validationForm.reset();
    } catch (error) {
      console.error("Error validating source:", error);
      toast({
        title: "Error",
        description: "Failed to submit validation",
        variant: "destructive",
      });
    } finally {
      setValidationLoading(false);
    }
  };

  const filteredSources =
    activeTab === "all"
      ? sources
      : sources.filter((source) => source.category === activeTab);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Web Scraping Sources</h1>
          <p className="text-muted-foreground">
            Manage the sources for scheduled web scraping.
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Scraping Source</DialogTitle>
              <DialogDescription>
                Add a new website for scheduled scraping.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Canadian Immigration Official Site"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                          <SelectItem value="news">News</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="forum">Forum</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description of this source..."
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="scrape_frequency"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Scrape Frequency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 hour">Every hour</SelectItem>
                          <SelectItem value="6 hours">Every 6 hours</SelectItem>
                          <SelectItem value="12 hours">
                            Every 12 hours
                          </SelectItem>
                          <SelectItem value="1 day">Daily</SelectItem>
                          <SelectItem value="3 days">Every 3 days</SelectItem>
                          <SelectItem value="1 week">Weekly</SelectItem>
                          <SelectItem value="2 weeks">Every 2 weeks</SelectItem>
                          <SelectItem value="1 month">Monthly</SelectItem>
                          <SelectItem value="manual">Manual only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Active</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Should this source be included in scheduled scraping?
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Sources</TabsTrigger>
          <TabsTrigger value="government">Government</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="blog">Blogs</TabsTrigger>
          <TabsTrigger value="forum">Forums</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : filteredSources.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Globe className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No sources found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {activeTab === "all"
                  ? "You haven't added any scraping sources yet."
                  : `No ${activeTab} sources found.`}
              </p>
              <Button onClick={() => setAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Source
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSources.map((source) => (
                <Card key={source.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentSource(source);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              window.open(source.url, "_blank");
                            }}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Source
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentSource(source);
                              setValidationDialogOpen(true);
                            }}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Validate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleManualScrape(source.id)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Scrape Now
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the scraping
                                  source &quot;{source.name}&quot; and all
                                  associated validation records.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSource(source.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={source.is_active ? "default" : "secondary"}
                      >
                        {source.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {source.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground truncate">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {source.url}
                      </a>
                    </p>
                    {source.description && (
                      <p className="text-sm mt-2 line-clamp-2">
                        {source.description}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {source.last_scraped
                            ? new Date(source.last_scraped).toLocaleDateString()
                            : "Never scraped"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {source.scrape_frequency === "manual"
                            ? "Manual only"
                            : `Every ${source.scrape_frequency}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="flex items-center gap-1 rounded-full px-2 py-1 bg-muted"
                        title="Trust Score"
                      >
                        <Shield className="h-3 w-3" />
                        <span className="text-sm font-medium">
                          {source.trust_score}
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Scraping Source</DialogTitle>
            <DialogDescription>
              Update the details for this scraping source.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="forum">Forum</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scrape_frequency"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Scrape Frequency</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1 hour">Every hour</SelectItem>
                        <SelectItem value="6 hours">Every 6 hours</SelectItem>
                        <SelectItem value="12 hours">Every 12 hours</SelectItem>
                        <SelectItem value="1 day">Daily</SelectItem>
                        <SelectItem value="3 days">Every 3 days</SelectItem>
                        <SelectItem value="1 week">Weekly</SelectItem>
                        <SelectItem value="2 weeks">Every 2 weeks</SelectItem>
                        <SelectItem value="1 month">Monthly</SelectItem>
                        <SelectItem value="manual">Manual only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }: any) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Should this source be included in scheduled scraping?
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Validation Dialog */}
      <Dialog
        open={validationDialogOpen}
        onOpenChange={setValidationDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Validate Source</DialogTitle>
            <DialogDescription>
              Rate the reliability and quality of this source.
            </DialogDescription>
          </DialogHeader>
          {currentSource && (
            <>
              <div className="py-4">
                <h3 className="font-medium">{currentSource.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentSource.url}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center gap-1 rounded-full px-2 py-1 bg-muted">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Current score: {currentSource.trust_score}
                    </span>
                  </div>
                </div>
              </div>
              <Form {...validationForm}>
                <form
                  onSubmit={validationForm.handleSubmit(handleValidateSource)}
                  className="space-y-4"
                >
                  <FormField
                    control={validationForm.control}
                    name="score"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Trust Score (0-100)</FormLabel>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              Unreliable
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Very reliable
                            </span>
                          </div>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                className="w-full"
                                {...field}
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value, 10))
                                }
                              />
                              <span className="font-medium w-8 text-center">
                                {field.value}
                              </span>
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={validationForm.control}
                    name="notes"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Why did you give this score? (optional)"
                            className="min-h-[80px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setValidationDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={validationLoading}>
                      {validationLoading
                        ? "Submitting..."
                        : "Submit Validation"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
