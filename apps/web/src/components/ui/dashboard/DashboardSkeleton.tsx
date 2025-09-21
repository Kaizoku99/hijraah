"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardFooter } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <Tabs defaultValue="cases">
            <div className="mb-6 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="cases">Cases</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <Skeleton className="h-10 w-32" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-12 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cases List Skeleton */}
            <TabsContent value="cases" className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            {/* Documents List Skeleton */}
            <TabsContent value="documents" className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <div>
                          <Skeleton className="h-6 w-48 mb-2" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Skeleton className="h-8 w-32" />
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            {/* Analytics Skeleton */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="h-[400px] w-full rounded-md border border-dashed flex items-center justify-center">
                <Skeleton className="h-8 w-64" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
