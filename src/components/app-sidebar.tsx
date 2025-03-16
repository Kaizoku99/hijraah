"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Terminal,
  Code,
  Activity,
  Briefcase,
  FileCheck,
  Users,
  Globe,
  BarChart,
  MessagesSquare,
  Lightbulb,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { NavUser } from "@/components/nav-user"
import { useAuth } from "@/contexts/auth"
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { getUserAvatar } from '@/lib/avatar-utils'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar"

// Types for navigation data
interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
}

interface NavSection {
  title: string;
  url: string;
  items: NavItem[];
}

// Hijraah-specific navigation data
const data: {
  navMain: NavSection[];
} = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Cases",
          url: "/dashboard/cases",
        },
      ],
    },
    {
      title: "Immigration Services",
      url: "#",
      items: [
        {
          title: "Visa Applications",
          url: "/services/visas",
        },
        {
          title: "Work Permits",
          url: "/services/work-permits",
        },
        {
          title: "Residency",
          url: "/services/residency",
        },
        {
          title: "Citizenship",
          url: "/services/citizenship",
        },
        {
          title: "Family Sponsorship",
          url: "/services/family",
        },
        {
          title: "Business Immigration",
          url: "/services/business",
        },
      ],
    },
    {
      title: "Documents",
      url: "/documents",
      items: [
        {
          title: "My Documents",
          url: "/documents",
        },
        {
          title: "Upload Documents",
          url: "/documents/upload",
        },
        {
          title: "Document Status",
          url: "/documents/status",
        },
        {
          title: "Verification",
          url: "/documents/verification",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Country Information",
          url: "/resources/countries",
        },
        {
          title: "Immigration News",
          url: "/resources/news",
        },
        {
          title: "Legal Requirements",
          url: "/resources/legal",
        },
        {
          title: "FAQs",
          url: "/resources/faqs",
        },
      ],
    },
    {
      title: "Support",
      url: "#",
      items: [
        {
          title: "Chat Support",
          url: "/chat",
        },
        {
          title: "Schedule Consultation",
          url: "/support/schedule",
        },
        {
          title: "Knowledge Base",
          url: "/support/knowledge",
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      items: [
        {
          title: "Scraping Sources",
          url: "/admin/scraping-sources",
        },
        {
          title: "System Settings",
          url: "/admin/settings",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    user?.user_metadata?.avatar_url
  );

  // Fetch user avatar if not present in metadata
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user || avatarUrl) return;

      try {
        // Get avatar from profile or generate a default one
        const url = await getUserAvatar(user.id);
        setAvatarUrl(url);
      } catch (error) {
        console.error('Error fetching user avatar:', error);
        // If error, use a default avatar
        setAvatarUrl('/avatars/default-1.png');
      }
    };

    fetchAvatar();
  }, [user, avatarUrl]);

  // If sidebar is closed, return null to hide it completely
  if (!open) {
    return null;
  }

  // Filter out admin sections if user is not an admin
  const filteredNavMain = data.navMain.filter(section =>
    section.title !== 'Admin' || isAdmin
  );

  // Prepare user data for NavUser component if user is authenticated
  const userData = user ? {
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    avatar: avatarUrl || '/avatars/default-1.png'
  } : undefined;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar-background text-sidebar-foreground"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Globe className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Hijraah</span>
                  <span className="">Immigration Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filteredNavMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="font-medium"
                    {...(item.title === "Support" ? { "data-tour": "help" } : {})}
                  >
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
