"use client";

import React from "react";
import { AvatarGallery } from "@/components/ui/avatar-gallery";
import {
  AvatarSelector,
  CompactAvatarSelector,
  useAvatarSelection,
} from "@/components/ui/avatar-selector";
import { UserAvatar, EnhancedUserAvatar } from "@/components/ui/user-avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  getAllDefaultAvatars,
  getAvatarMetadata,
  generateAvatarUrl,
  getRandomDefaultAvatar,
  isDefaultAvatar,
} from "@/lib/avatar-utils";

export default function AvatarDemoPage() {
  const avatarMetadata = getAvatarMetadata();
  const allAvatars = getAllDefaultAvatars();

  // Sample user data for testing
  const sampleUser = {
    id: "demo-user-123",
    name: "Demo User",
    email: "demo@hijraah.com",
    avatar: "/avatars/default-2.png",
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Avatar System Demo
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our enhanced avatar system with multiple styles, automatic
          generation, and seamless user experience.
        </p>
      </div>

      {/* Avatar Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>
            Current avatar system capabilities and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {allAvatars.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Default Avatars
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Avatar Styles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">
                Generated Options
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">✓</div>
              <div className="text-sm text-muted-foreground">
                Auto Fallbacks
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* User Avatar Examples */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            UserAvatar Component Examples
          </h2>
          <p className="text-muted-foreground mb-4">
            Different ways to display user avatars with various configurations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Avatar</CardTitle>
              <CardDescription>
                Default user avatar with fallback
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <UserAvatar user={sampleUser} size="lg" />
              <Badge variant="secondary">Standard Display</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generated Avatar</CardTitle>
              <CardDescription>
                Consistent avatar based on user ID
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <UserAvatar
                user={{ ...sampleUser, avatar: undefined }}
                size="lg"
                useGeneratedAvatar={true}
              />
              <Badge variant="outline">Auto-Generated</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enhanced Avatar</CardTitle>
              <CardDescription>With loading states and badge</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <EnhancedUserAvatar
                user={sampleUser}
                size="lg"
                showBadge={true}
                badgeContent="✓"
              />
              <Badge variant="default">Enhanced</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Avatar Sizes */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Avatar Sizes</h2>
          <p className="text-muted-foreground mb-4">
            Available avatar sizes from small to extra large.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center space-y-2">
                <UserAvatar user={sampleUser} size="sm" />
                <Badge variant="outline" className="text-xs">
                  Small
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <UserAvatar user={sampleUser} size="md" />
                <Badge variant="outline" className="text-xs">
                  Medium
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <UserAvatar user={sampleUser} size="lg" />
                <Badge variant="outline" className="text-xs">
                  Large
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <UserAvatar user={sampleUser} size="xl" />
                <Badge variant="outline" className="text-xs">
                  Extra Large
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Avatar Selection Demo */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Avatar Selection</h2>
          <p className="text-muted-foreground mb-4">
            Interactive components for users to select their preferred avatar.
          </p>
        </div>

        <AvatarSelectorDemo />
      </section>

      <Separator />

      {/* Avatar Gallery */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Avatar Gallery</h2>
          <p className="text-muted-foreground mb-4">
            Browse all available avatar styles with detailed information.
          </p>
        </div>

        <AvatarGallery showActions={true} userId={sampleUser.id} />
      </section>

      <Separator />

      {/* Technical Information */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Technical Implementation
          </h2>
          <p className="text-muted-foreground mb-4">
            Details about how the avatar system works under the hood.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avatar Generation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Sample User ID:</strong> {sampleUser.id}
              </div>
              <div>
                <strong>Generated Avatar:</strong>
                <code className="ml-2 text-sm bg-muted px-2 py-1 rounded">
                  {generateAvatarUrl(sampleUser.id)}
                </code>
              </div>
              <div>
                <strong>Random Avatar:</strong>
                <code className="ml-2 text-sm bg-muted px-2 py-1 rounded">
                  {getRandomDefaultAvatar()}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fallback Logic</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li>1. User&apos;s uploaded avatar</li>
                <li>2. Generated default avatar (if user ID available)</li>
                <li>3. Static default avatar</li>
                <li>4. User initials</li>
                <li>5. Generic user icon</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

/**
 * Interactive demo component for avatar selection
 */
function AvatarSelectorDemo() {
  const [selectedAvatar, setSelectedAvatar] = React.useState<string>(
    "/avatars/default-1.png"
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Selection</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <UserAvatar
            user={{ name: "Preview User", avatar: selectedAvatar }}
            size="lg"
          />
          <div>
            <p className="font-medium">Selected Avatar:</p>
            <code className="text-sm text-muted-foreground">
              {selectedAvatar}
            </code>
            <div className="mt-2">
              <Badge
                variant={
                  isDefaultAvatar(selectedAvatar) ? "default" : "secondary"
                }
              >
                {isDefaultAvatar(selectedAvatar)
                  ? "Default Avatar"
                  : "Custom Avatar"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <AvatarSelector
        selectedAvatar={selectedAvatar}
        onAvatarSelect={setSelectedAvatar}
        showLabels={true}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compact Selector</CardTitle>
          <CardDescription>
            Smaller version for forms and modals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompactAvatarSelector
            selectedAvatar={selectedAvatar}
            onAvatarSelect={setSelectedAvatar}
          />
        </CardContent>
      </Card>
    </div>
  );
}
