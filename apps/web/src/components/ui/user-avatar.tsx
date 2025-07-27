"use client";

import { User } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

export interface UserAvatarProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  className?: string;
  fallbackClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
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

  return (
    <Avatar
      className={`${sizeClasses[size]} ${shapeClasses[shape]} ${className}`}
    >
      {user?.avatar ? (
        <AvatarImage
          src={user.avatar}
          alt={user?.name || "User Avatar"}
          onError={(e) => {
            console.warn("Avatar image failed to load:", e);
            // Let fallback display when image fails
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}

      <AvatarFallback className={`${shapeClasses[shape]} ${fallbackClassName}`}>
        {user?.name ? getInitials() : <User className="h-5 w-5" />}
      </AvatarFallback>
    </Avatar>
  );
}
