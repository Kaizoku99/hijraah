"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  BarChart3, 
  Search, 
  Filter,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  FileText,
  Code,
  Table,
  Image,
  Package
} from 'lucide-react';

import {
  useAllArtifacts,
  useArtifactAnalytics,
  useArtifactSearch,
  useArtifactTypeMonitor,
  useArtifactLifecycle,
  ArtifactType
} from '@/artifacts/ai-sdk-tools';

/**
 * Enhanced Artifact Dashboard using v0.4 useArtifacts capabilities
 * Demonstrates the power of the new AI SDK Tools features
 */
export function ArtifactDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ArtifactType | 'all'>('all');

  // Use the enhanced hooks
  const allArtifacts = useAllArtifacts();
  const analytics = useArtifactAnalytics();
  const { searchArtifacts } = useArtifactSearch();
  const textMonitor = useArtifactTypeMonitor(['text', 'code']);
  
  // Initialize lifecycle monitoring
  useArtifactLifecycle();

  // Filter artifacts based on search and type
  const filteredArtifacts = useMemo(() => {
    let filtered = allArtifacts.artifacts;

    if (searchQuery.trim()) {
      filtered = searchArtifacts(searchQuery);
    }

    if (selectedType !== 'all') {
      const typeId = `${selectedType}-artifact`;
      filtered = filtered.filter(artifact => artifact.type === typeId);
    }

    return filtered;
  }, [allArtifacts.artifacts, searchQuery, selectedType, searchArtifacts]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'streaming': 
      case 'loading': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    const cleanType = type.replace('-artifact', '');
    switch (cleanType) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'code': return <Code className="h-4 w-4" />;
      case 'sheet': return <Table className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artifact Dashboard</h1>
          <p className="text-muted-foreground">
            Enhanced with AI SDK Tools v0.4 - Real-time artifact monitoring and analytics
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Activity className="h-3 w-3" />
          {allArtifacts.hasActiveArtifacts ? 'Active' : 'Idle'}
        </Badge>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artifacts</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.recent.last24Hours} in last 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analytics.performance.completionRate * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.byStatus.complete} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.byStatus.streaming + analytics.byStatus.loading}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analytics.performance.errorRate * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.byStatus.error} failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Active Artifact */}
      {allArtifacts.current && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getTypeIcon(allArtifacts.current.type)}
              Current Artifact
            </CardTitle>
            <CardDescription>
              {allArtifacts.currentArtifactType} - Version {allArtifacts.current.version}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(allArtifacts.current.status)}
                  <span className="capitalize">{allArtifacts.current.status}</span>
                </div>
                <Badge variant="outline">
                  {allArtifacts.current.type.replace('-artifact', '')}
                </Badge>
              </div>
              
              {allArtifacts.current.progress !== undefined && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(allArtifacts.current.progress * 100)}%</span>
                  </div>
                  <Progress 
                    value={allArtifacts.current.progress * 100} 
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search artifacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ArtifactType | 'all')}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="text">Text</option>
              <option value="code">Code</option>
              <option value="sheet">Sheet</option>
              <option value="image">Image</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Artifacts List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Artifacts ({filteredArtifacts.length})
          </CardTitle>
          <CardDescription>
            Real-time artifact monitoring with v0.4 capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredArtifacts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No artifacts found matching your criteria
              </p>
            ) : (
              filteredArtifacts.map((artifact) => (
                <div 
                  key={`${artifact.id}-${artifact.version}`}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTypeIcon(artifact.type)}
                    <div>
                      <div className="font-medium">
                        {(artifact.payload as any)?.title || 'Untitled'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {artifact.type.replace('-artifact', '')} • v{artifact.version}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {artifact.progress !== undefined && (
                      <span className="text-sm text-muted-foreground">
                        {Math.round(artifact.progress * 100)}%
                      </span>
                    )}
                    {getStatusIcon(artifact.status)}
                    <Badge 
                      variant={
                        artifact.status === 'complete' ? 'default' :
                        artifact.status === 'error' ? 'destructive' :
                        artifact.status === 'streaming' ? 'secondary' : 'outline'
                      }
                    >
                      {artifact.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Type Distribution</CardTitle>
          <CardDescription>
            Breakdown of artifacts by type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(analytics.byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(`${type}-artifact`)}
                  <span className="capitalize">{type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{count}</span>
                  <Progress 
                    value={(count / analytics.total) * 100} 
                    className="w-20 h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ArtifactDashboard;