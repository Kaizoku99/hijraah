"use client";

import {
  HomeIcon,
  FileTextIcon,
  MessageSquareIcon,
  UserIcon,
  CheckSquareIcon,
  CalculatorIcon,
  BellIcon,
  SettingsIcon,
  GlobeIcon,
  CompassIcon,
  BookOpenIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarGroup as BaseSidebarGroup,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { cn } from "@/shared/utils/cn";

import type { Route } from "next";

// Extend SidebarGroup to include label prop
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

const SidebarGroup = ({ label, ...props }: SidebarGroupProps) => (
  <BaseSidebarGroup className="mb-4" data-label={label} {...props} />
);

// Define route types with proper Next.js types
type AppRoute = Route;

type RouteKey =
  | "home"
  | "documents"
  | "chat"
  | "requirements"
  | "calculator"
  | "notifications"
  | "profile"
  | "settings"
  | "countries"
  | "compare"
  | "explore";

type Routes = {
  [K in RouteKey]: AppRoute;
};

const routes: Routes = {
  home: "/" as AppRoute,
  documents: "/documents" as AppRoute,
  chat: "/chat" as AppRoute,
  requirements: "/requirements" as AppRoute,
  calculator: "/calculator" as AppRoute,
  notifications: "/notifications" as AppRoute,
  profile: "/profile" as AppRoute,
  settings: "/settings" as AppRoute,
  countries: "/countries" as AppRoute,
  compare: "/compare" as AppRoute,
  explore: "/explore" as AppRoute,
} as const;

export /**
 * NavigationMenu component
 *
 * @example
 * ```tsx
 * <NavigationMenu>Content</NavigationMenu>
 * ```
 */
function NavigationMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="px-2 py-4">
      <SidebarGroup label="Main">
        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.home &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.home}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.compare &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.compare}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <CalculatorIcon className="h-5 w-5" />
              <span>Compare</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.countries &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.countries}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <GlobeIcon className="h-5 w-5" />
              <span>Countries</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.explore &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.explore}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <CompassIcon className="h-5 w-5" />
              <span>Explore</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.documents &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.documents}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <FileTextIcon className="h-5 w-5" />
              <span>Documents</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.chat &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.chat}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <a>
                <MessageSquareIcon className="h-5 w-5" />
                <span>Chat</span>
              </a>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
      <SidebarGroup label="Account">
        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.profile &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.profile}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <UserIcon className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={cn(
            "mb-1 transition-all hover:bg-accent/50",
            pathname === routes.settings &&
              "bg-accent text-accent-foreground font-medium",
          )}
        >
          <SidebarMenuButton asChild className="py-2">
            <Link
              href={routes.settings}
              className="flex items-center gap-3"
              legacyBehavior
            >
              <SettingsIcon className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarMenu>
  );
}
