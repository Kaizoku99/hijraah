"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAvatarMetadata, isDefaultAvatar } from "@/lib/avatar-utils";

interface AvatarSelectorProps {
  selectedAvatar?: string;
  onAvatarSelect: (avatarUrl: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  columns?: number;
}

/**
 * Component for selecting from available default avatars
 */
export function AvatarSelector({
  selectedAvatar,
  onAvatarSelect,
  className,
  size = "md",
  showLabels = true,
  columns = 5,
}: AvatarSelectorProps) {
  const avatars = getAvatarMetadata();

  // Size classes
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Choose Avatar</CardTitle>
        <CardDescription>
          Select from our collection of default avatars
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "grid gap-4",
            gridCols[columns as keyof typeof gridCols] || "grid-cols-5"
          )}
        >
          {avatars.map((avatar) => {
            const isSelected = selectedAvatar === avatar.url;

            return (
              <div
                key={avatar.url}
                className="flex flex-col items-center space-y-2"
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "relative p-2 rounded-full transition-all duration-200 hover:scale-105",
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 bg-primary/10"
                      : "hover:bg-muted"
                  )}
                  onClick={() => onAvatarSelect(avatar.url)}
                >
                  <Avatar className={sizeClasses[size]}>
                    <AvatarImage
                      src={avatar.url}
                      alt={avatar.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </Button>

                {showLabels && (
                  <div className="text-center">
                    <Badge variant="secondary" className="text-xs">
                      {avatar.name}
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact avatar selector for use in forms or smaller spaces
 */
export function CompactAvatarSelector({
  selectedAvatar,
  onAvatarSelect,
  className,
}: Pick<
  AvatarSelectorProps,
  "selectedAvatar" | "onAvatarSelect" | "className"
>) {
  const avatars = getAvatarMetadata();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {avatars.map((avatar) => {
        const isSelected = selectedAvatar === avatar.url;

        return (
          <Button
            key={avatar.url}
            variant="ghost"
            size="sm"
            className={cn(
              "relative p-1 rounded-full transition-all duration-200 hover:scale-105",
              isSelected
                ? "ring-2 ring-primary ring-offset-1 bg-primary/10"
                : "hover:bg-muted"
            )}
            onClick={() => onAvatarSelect(avatar.url)}
            title={avatar.name}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={avatar.url}
                alt={avatar.name}
                className="object-cover"
              />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            {isSelected && (
              <div className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="h-2.5 w-2.5" />
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
}

/**
 * Hook for managing avatar selection state
 */
export function useAvatarSelection(initialAvatar?: string) {
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar || "");

  const selectAvatar = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const isSelected = (avatarUrl: string) => selectedAvatar === avatarUrl;

  const isDefault = isDefaultAvatar(selectedAvatar);

  return {
    selectedAvatar,
    selectAvatar,
    isSelected,
    isDefault,
    setSelectedAvatar,
  };
}
