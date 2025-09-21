"use client";

import { User } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  generateAvatarUrl,
  getDefaultAvatarPath,
  isDefaultAvatar,
} from "@/lib/avatar-utils";

export interface UserAvatarProps {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
  className?: string;
  fallbackClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  /** If true and user has an ID, generates a consistent default avatar for the user */
  useGeneratedAvatar?: boolean;
  /** Override avatar URL */
  avatarUrl?: string;
}

/**
 * A component that displays a user's avatar with proper fallbacks
 * If no avatar is provided, it shows initials or a default user icon
 */
export function UserAvatar({
  user,
  className = "",
  fallbackClassName = "",
  size = "md",
  shape = "circle",
  useGeneratedAvatar = true,
  avatarUrl,
}: UserAvatarProps) {
  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  // Shape classes
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  };

  // Get user initials for fallback
  const getInitials = () => {
    if (!user?.name) return "?";

    return user.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Determine the avatar source with fallback logic
  const getAvatarSrc = () => {
    // Use explicit override first
    if (avatarUrl) return avatarUrl;

    // Use user's avatar if available
    if (user?.avatar) return user.avatar;

    // Generate consistent avatar for user if they have an ID and option is enabled
    if (useGeneratedAvatar && user?.id) {
      return generateAvatarUrl(user.id);
    }

    // Fallback to default
    return getDefaultAvatarPath();
  };

  const avatarSrc = getAvatarSrc();
  const showFallback = !avatarSrc;

  return (
    <Avatar
      className={`${sizeClasses[size]} ${shapeClasses[shape]} ${className}`}
    >
      {!showFallback && (
        <AvatarImage
          src={avatarSrc}
          alt={user?.name || "User Avatar"}
          onError={(e) => {
            console.warn("Avatar image failed to load:", avatarSrc, e);
            // Let fallback display when image fails
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      <AvatarFallback className={`${shapeClasses[shape]} ${fallbackClassName}`}>
        {user?.name ? getInitials() : <User className="h-5 w-5" />}
      </AvatarFallback>
    </Avatar>
  );
}

/**
 * Enhanced avatar component with loading states and better error handling
 */
export function EnhancedUserAvatar({
  user,
  className = "",
  fallbackClassName = "",
  size = "md",
  shape = "circle",
  useGeneratedAvatar = true,
  avatarUrl,
  showBadge = false,
  badgeContent,
}: UserAvatarProps & {
  showBadge?: boolean;
  badgeContent?: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  // Shape classes
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  };

  // Get user initials for fallback
  const getInitials = () => {
    if (!user?.name) return "?";

    return user.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Determine the avatar source with fallback logic
  const getAvatarSrc = () => {
    if (avatarUrl) return avatarUrl;
    if (user?.avatar) return user.avatar;
    if (useGeneratedAvatar && user?.id) {
      return generateAvatarUrl(user.id);
    }
    return getDefaultAvatarPath();
  };

  const avatarSrc = getAvatarSrc();
  const showImage = avatarSrc && !hasError;

  return (
    <div className="relative">
      <Avatar
        className={`${sizeClasses[size]} ${shapeClasses[shape]} ${className} ${
          isLoading && showImage ? "animate-pulse bg-muted" : ""
        }`}
      >
        {showImage && (
          <AvatarImage
            src={avatarSrc}
            alt={user?.name || "User Avatar"}
            onLoad={() => setIsLoading(false)}
            onError={(e) => {
              console.warn("Avatar image failed to load:", avatarSrc, e);
              setHasError(true);
              setIsLoading(false);
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}

        <AvatarFallback
          className={`${shapeClasses[shape]} ${fallbackClassName}`}
        >
          {user?.name ? getInitials() : <User className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>

      {showBadge && badgeContent && (
        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1 text-xs">
          {badgeContent}
        </div>
      )}
    </div>
  );
}
