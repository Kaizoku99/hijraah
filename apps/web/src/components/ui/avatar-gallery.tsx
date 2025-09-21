"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getAvatarMetadata,
  getAllDefaultAvatars,
  getRandomDefaultAvatar,
  generateAvatarUrl,
} from "@/lib/avatar-utils";

interface AvatarGalleryProps {
  className?: string;
  onSelectAvatar?: (avatarUrl: string) => void;
  showActions?: boolean;
  userId?: string; // For showing user's generated avatar
}

/**
 * Gallery component displaying all available avatars with metadata
 */
export function AvatarGallery({
  className,
  onSelectAvatar,
  showActions = false,
  userId,
}: AvatarGalleryProps) {
  const avatars = getAvatarMetadata();
  const userGeneratedAvatar = userId ? generateAvatarUrl(userId) : null;

  const handleDownload = async (avatarUrl: string, name: string) => {
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.toLowerCase()}-avatar.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download avatar:", error);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Avatar Gallery</h2>
        <p className="text-muted-foreground">
          Explore our collection of diverse avatar styles
        </p>
      </div>

      {/* User's Generated Avatar */}
      {userId && userGeneratedAvatar && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Generated Avatar
            </CardTitle>
            <CardDescription>
              This is your automatically generated avatar based on your user ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={userGeneratedAvatar}
                  alt="Your generated avatar"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Badge variant="default" className="mb-2">
                  Generated
                </Badge>
                <p className="text-sm text-muted-foreground">
                  This avatar is consistently generated based on your unique
                  user identifier.
                </p>
              </div>
              {onSelectAvatar && (
                <Button onClick={() => onSelectAvatar(userGeneratedAvatar)}>
                  Use This Avatar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Default Avatar Collection */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {avatars.map((avatar) => (
          <Card key={avatar.url} className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={avatar.url}
                    alt={avatar.name}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-lg">{avatar.name}</CardTitle>
              <CardDescription className="text-sm">
                {avatar.description}
              </CardDescription>
            </CardHeader>

            {showActions && (
              <CardContent className="pt-0">
                <div className="flex gap-2 justify-center">
                  {onSelectAvatar && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onSelectAvatar(avatar.url)}
                    >
                      Select
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(avatar.url, avatar.name)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Random Avatar Demo */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Random Avatar Generator</CardTitle>
          <CardDescription>
            See how our system picks random avatars for new users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RandomAvatarDemo onSelectAvatar={onSelectAvatar} />
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Component to demonstrate random avatar generation
 */
function RandomAvatarDemo({
  onSelectAvatar,
}: {
  onSelectAvatar?: (avatarUrl: string) => void;
}) {
  const [randomAvatar, setRandomAvatar] = useState<string>("");

  const generateRandom = () => {
    setRandomAvatar(getRandomDefaultAvatar());
  };

  // Generate initial random avatar
  React.useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage
          src={randomAvatar}
          alt="Random avatar"
          className="object-cover"
        />
        <AvatarFallback>
          <User className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex gap-2 mb-2">
          <Button onClick={generateRandom} variant="outline" size="sm">
            Generate Random
          </Button>
          {onSelectAvatar && randomAvatar && (
            <Button onClick={() => onSelectAvatar(randomAvatar)} size="sm">
              Use This Avatar
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Click "Generate Random" to see different avatar options
        </p>
      </div>
    </div>
  );
}
