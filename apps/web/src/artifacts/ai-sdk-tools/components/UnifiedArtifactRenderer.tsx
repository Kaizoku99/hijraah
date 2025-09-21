"use client";

import React, { memo, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { useAllArtifacts } from '../hooks';
import { ArtifactType } from '../artifact-definitions';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Code, 
  Table, 
  Image, 
  X, 
  Maximize2, 
  Minimize2,
  Download,
  Share,
  Settings
} from 'lucide-react';

// Lazy load artifact components
const TextArtifact = React.lazy(() => 
  import('./TextArtifact').then(module => ({ default: module.TextArtifact }))
);
const CodeArtifact = React.lazy(() => 
  import('./CodeArtifact').then(module => ({ default: module.CodeArtifact }))
);

interface UnifiedArtifactRendererProps {
  className?: string;
  onClose?: () => void;
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
  readonly?: boolean;
}

/**
 * Unified Artifact Renderer with AI SDK Tools integration
 * Renders the current active artifact with enhanced UI and controls
 */
export const UnifiedArtifactRenderer = memo(function UnifiedArtifactRenderer({
  className,
  onClose,
  fullscreen = false,
  onToggleFullscreen,
  readonly = false,
}: UnifiedArtifactRendererProps) {
  const { current, currentArtifactType } = useAllArtifacts();

  if (!current || !currentArtifactType) {
    return (
      <div className={cn("flex items-center justify-center p-8 border-2 border-dashed rounded-lg", className)}>
        <div className="text-center text-muted-foreground">
          <div className="mx-auto h-12 w-12 mb-4 bg-muted rounded-full flex items-center justify-center">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="font-medium mb-1">No Active Artifact</h3>
          <p className="text-sm">Start a conversation to generate artifacts</p>
        </div>
      </div>
    );
  }

  const getIcon = (type: ArtifactType) => {
    const icons = {
      text: FileText,
      code: Code,
      sheet: Table,
      image: Image,
      generic: FileText,
    };
    const IconComponent = icons[type];
    return <IconComponent className="h-4 w-4" />;
  };

  const getArtifactComponent = () => {
    switch (currentArtifactType) {
      case 'text':
        return <TextArtifact readonly={readonly} className="h-full" />;
      case 'code':
        return <CodeArtifact readonly={readonly} className="h-full" />;
      case 'sheet':
        // return <SheetArtifact readonly={readonly} className="h-full" />;
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Table className="mx-auto h-12 w-12 mb-4" />
              <p>Sheet artifact component coming soon</p>
            </div>
          </div>
        );
      case 'image':
        // return <ImageArtifact readonly={readonly} className="h-full" />;
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Image className="mx-auto h-12 w-12 mb-4" />
              <p>Image artifact component coming soon</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4" />
              <p>Unknown artifact type: {currentArtifactType}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "flex flex-col bg-background border rounded-lg overflow-hidden",
      fullscreen && "fixed inset-0 z-50 rounded-none",
      className
    )}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center space-x-2">
          {getIcon(currentArtifactType)}
          <h2 className="font-semibold">
            {current.data?.title || `${currentArtifactType} Artifact`}
          </h2>
          <Badge variant="outline" className="capitalize">
            {currentArtifactType}
          </Badge>
          {current.status && (
            <Badge 
              variant={current.status === 'complete' ? 'default' : 
                      current.status === 'error' ? 'destructive' : 'secondary'}
              className={current.status === 'streaming' ? 'animate-pulse' : ''}
            >
              {current.status}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          {onToggleFullscreen && (
            <Button variant="ghost" size="sm" onClick={onToggleFullscreen}>
              {fullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      {current.status === 'streaming' && current.progress !== undefined && (
        <div className="px-3 py-2 bg-muted/30">
          <Progress value={current.progress * 100} className="h-1" />
        </div>
      )}

      {/* Artifact content */}
      <div className="flex-1 overflow-hidden">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          {getArtifactComponent()}
        </Suspense>
      </div>
    </div>
  );
});

/**
 * Mini artifact preview for sidebars or inline display
 */
export const ArtifactPreview = memo(function ArtifactPreview({
  type,
  className,
  onClick,
}: {
  type: ArtifactType;
  className?: string;
  onClick?: () => void;
}) {
  const { getLatestByType } = useAllArtifacts();
  const artifact = getLatestByType(type);

  if (!artifact) return null;

  const getIcon = () => {
    const icons = {
      text: FileText,
      code: Code,
      sheet: Table,
      image: Image,
      generic: FileText,
    };
    const IconComponent = icons[type];
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div 
      className={cn(
        "p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2 mb-2">
        {getIcon()}
        <span className="text-sm font-medium capitalize">{type}</span>
        <Badge variant="outline" size="sm">
          {artifact.status}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {artifact.data?.title || `Latest ${type} artifact`}
      </p>
    </div>
  );
});

/**
 * Artifact type switcher for switching between different artifact types
 */
export const ArtifactTypeSwitcher = memo(function ArtifactTypeSwitcher({
  className,
}: {
  className?: string;
}) {
  const { byType } = useAllArtifacts();
  const availableTypes = Object.keys(byType) as ArtifactType[];

  if (availableTypes.length === 0) return null;

  return (
    <div className={cn("flex space-x-1", className)}>
      {availableTypes.map(type => (
        <ArtifactPreview
          key={type}
          type={type}
          className="flex-1"
        />
      ))}
    </div>
  );
});

export { UnifiedArtifactRenderer as ArtifactRenderer };