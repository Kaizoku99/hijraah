"use client";

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
  Calendar,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useEffect, useState, useCallback, ReactNode } from "react";

import { useChat, type Chat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientLocale } from "@/hooks/use-client-locale";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { isRTL } from "@/i18n/i18n";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/hooks";
import { getUserAvatar, getIdenticonUrl } from "@/lib/avatar-utils";
import {
  useSupabaseBrowser,
  type TypedSSRSupabaseClient,
} from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/supabase";
import { NavUser } from "@/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/ui/sidebar";

import { NotificationButton } from "./notification-button";

// Types for navigation data
interface NavItem {
  titleKey: string;
  url: string;
  isActive?: boolean;
  subMenu?: NavItem[];
}

interface NavSection {
  titleKey: string;
  url: string;
  items: NavItem[];
}

// Hijraah-specific navigation data
const data: {
  navMain: NavSection[];
} = {
  navMain: [
    {
      titleKey: "dashboard",
      url: "/dashboard",
      items: [
        {
          titleKey: "overview",
          url: "/dashboard",
        },
        {
          titleKey: "cases",
          url: "/dashboard/cases",
        },
      ],
    },
    {
      titleKey: "caseManagement",
      url: "/dashboard/cases",
      items: [
        {
          titleKey: "allCases",
          url: "/dashboard/cases",
        },
        {
          titleKey: "newCase",
          url: "/dashboard/cases/new",
        },
        {
          titleKey: "assignedCases",
          url: "/dashboard/cases?assigned=true",
        },
        {
          titleKey: "caseTemplates",
          url: "/dashboard/cases/templates",
        },
        {
          titleKey: "reports",
          url: "/dashboard/cases/reports",
        },
      ],
    },
    {
      titleKey: "immigrationServices",
      url: "#",
      items: [
        {
          titleKey: "visaApplications",
          url: "/services/visas",
        },
        {
          titleKey: "workPermits",
          url: "/services/work-permits",
        },
        {
          titleKey: "residency",
          url: "/services/residency",
        },
        {
          titleKey: "citizenship",
          url: "/services/citizenship",
        },
        {
          titleKey: "familySponsorship",
          url: "/services/family",
        },
        {
          titleKey: "businessImmigration",
          url: "/services/business",
        },
      ],
    },
    {
      titleKey: "documents",
      url: "/documents",
      items: [
        {
          titleKey: "myDocuments",
          url: "/documents",
        },
        {
          titleKey: "uploadDocuments",
          url: "/documents/upload",
        },
        {
          titleKey: "documentStatus",
          url: "/documents/status",
        },
        {
          titleKey: "verification",
          url: "/documents/verification",
        },
      ],
    },
    {
      titleKey: "resources",
      url: "#",
      items: [
        {
          titleKey: "countryInformation",
          url: "/resources/countries",
        },
        {
          titleKey: "immigrationNews",
          url: "/resources/news",
        },
        {
          titleKey: "legalRequirements",
          url: "/resources/legal",
        },
        {
          titleKey: "faqs",
          url: "/resources/faqs",
        },
      ],
    },
    {
      titleKey: "support",
      url: "#",
      items: [
        {
          titleKey: "chatSupport",
          url: "/chat",
        },
        {
          titleKey: "scheduleConsultation",
          url: "/support/schedule",
        },
        {
          titleKey: "knowledgeBase",
          url: "/support/knowledge",
        },
      ],
    },
    {
      titleKey: "admin",
      url: "#",
      items: [
        {
          titleKey: "scrapingSources",
          url: "/admin/scraping-sources",
        },
        {
          titleKey: "systemSettings",
          url: "/admin/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const { user, isLoading, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const t = useTranslations("sidebar");
  const locale = useClientLocale();
  const rtl = isRTL(locale);
  const pathname = usePathname();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const supabase = useSupabaseBrowser();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Chat History State
  const { getChats, deleteChat, isLoading: isLoadingChatAction } = useChat();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    if (user && supabase) {
      const fetchAvatar = async () => {
        try {
          const url = await getUserAvatar(supabase, user.id);
          setAvatarUrl(url);
        } catch (error) {
          console.error("Error fetching avatar:", error);
          if (user?.id) {
            setAvatarUrl(getIdenticonUrl(user.id));
          }
        }
      };
      fetchAvatar();
    }
  }, [user, supabase]);

  // Fetch chat history (memoised to avoid infinite loops)
  const loadChats = useCallback(async () => {
    if (!user) {
      setChats([]); // Clear chats if user logs out
      return;
    }

    let isMounted = true;
    setIsLoadingChats(true);
    setChatError(null);
    try {
      const userChats = await getChats({ limit: 50 });
      if (isMounted) setChats(userChats);
    } catch (error: any) {
      console.error("Error loading chats:", error);
      if (isMounted) setChatError("Failed to load chat history.");
    } finally {
      if (isMounted) setIsLoadingChats(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // Handler for deleting a chat
  const handleDeleteChatClick = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this chat?")) {
      return;
    }
    try {
      await deleteChat(chatId);
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      // Optional: Navigate away if the current chat was deleted
      if (pathname === `/chat/${chatId}`) {
        // Navigate to a safe place, e.g., new chat or dashboard
        window.location.href = "/chat/new"; // Simple redirect for now
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      // Optionally show a toast notification
      setChatError("Failed to delete chat.");
    }
  };

  // If sidebar is closed, return null
  if (!open) {
    return null;
  }

  // If auth state is loading, show a skeleton sidebar
  if (isLoading) {
    return (
      <Sidebar
        collapsible="icon"
        className={cn(
          "border-sidebar-border bg-sidebar-background text-sidebar-foreground",
          rtl ? "border-l ml-auto" : "border-r"
        )}
        {...props}
      >
        <SidebarHeader>
          <div className="p-4 space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Chat History Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-8 w-full" /> {/* New Chat Button */}
              <Skeleton className="h-8 w-full ml-2" />
              <Skeleton className="h-8 w-full ml-2" />
              <Skeleton className="h-8 w-full ml-2" />
            </div>
            {/* Other Skeletons */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full ml-4" />
                <Skeleton className="h-4 w-full ml-4" />
              </div>
            ))}
          </div>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <Skeleton className="h-10 w-full" />
        </SidebarFooter>
      </Sidebar>
    );
  }

  // Filter out admin sections if user is not an admin
  const filteredNavMain = data.navMain.filter(
    (section) => section.titleKey !== "admin" || isAdmin
  );

  // Prepare user data for NavUser component if user is authenticated
  const userData = user
    ? {
        name:
          user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatar: avatarUrl || "/avatars/default-1.png",
      }
    : undefined;

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    // Check if the item URL starts with /admin/ and if the user is an admin
    if (item.url.startsWith("/admin/") && !isAdmin) {
      return null;
    }

    // Refactored isActive check using usePathname
    const isActive = pathname === item.url;

    // Use the translated title
    const itemContent = t(item.titleKey as any); // Use translation

    // Wrap content with Link for navigation
    const linkContent = (
      <Link href={item.url} className="flex-grow w-full">
        {itemContent}
      </Link>
    );

    return (
      <SidebarMenuItem
        key={item.titleKey}
        className={cn({
          "bg-primary/10 text-primary": isActive, // Example active style
          "hover:bg-muted/50": !isActive, // Example hover style for non-active
        })}
        onClick={item.subMenu ? () => toggleSubMenu(item.titleKey) : undefined}
      >
        {item.subMenu ? itemContent : linkContent}
        {item.subMenu && (
          <span className="ml-auto">
            {openSubMenu === item.titleKey ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-sidebar-border bg-sidebar-background text-sidebar-foreground",
        rtl ? "border-l ml-auto" : "border-r"
      )}
      {...props}
    >
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Hijraah</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarMenu>
          {/* Chat History Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
              {t("chats")} {/* Assuming 'chats' translation exists */}
              <Button asChild variant="ghost" size="icon" className="h-6 w-6">
                <Link href="/chat/new" className="inline-flex items-center">
                  <Plus size={16} />
                  <span className="sr-only">New Chat</span>
                </Link>
              </Button>
            </SidebarGroupLabel>
            {isLoadingChats ? (
              <>
                <Skeleton className="h-8 w-full my-1" />
                <Skeleton className="h-8 w-full my-1" />
                <Skeleton className="h-8 w-full my-1" />
              </>
            ) : chatError ? (
              <div className="text-destructive text-xs px-2">{chatError}</div>
            ) : chats.length === 0 ? (
              <div className="text-muted-foreground text-xs px-2">
                No chats yet.
              </div>
            ) : (
              chats.map((chat) => {
                const isActive = pathname === `/chat/${chat.id}`;
                return (
                  <SidebarMenuItem
                    key={chat.id}
                    className={cn("group flex justify-between items-center", {
                      "bg-primary/10 text-primary": isActive,
                      "hover:bg-muted/50": !isActive,
                    })}
                  >
                    <Link
                      href={`/chat/${chat.id}`}
                      className="flex-grow truncate pr-2"
                      title={chat.title || "Untitled Chat"}
                    >
                      {chat.title || "Untitled Chat"}
                    </Link>
                    {/* Delete Button - appears on hover */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive"
                      onClick={(e) => handleDeleteChatClick(e, chat.id)}
                      disabled={isLoadingChatAction}
                    >
                      <Trash2 size={14} />
                      <span className="sr-only">Delete Chat</span>
                    </Button>
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarGroup>

          {/* Existing Navigation Sections */}
          {filteredNavMain.map((section) => (
            <SidebarGroup key={section.titleKey}>
              <SidebarGroupLabel>
                {t(section.titleKey as any)}
              </SidebarGroupLabel>
              {section.items.map((item) => (
                <React.Fragment key={item.titleKey}>
                  {renderNavItem(item)}
                  {item.subMenu && openSubMenu === item.titleKey && (
                    <SidebarMenuSub>
                      {item.subMenu.map((subItem) =>
                        renderNavItem(subItem, true)
                      )}
                    </SidebarMenuSub>
                  )}
                </React.Fragment>
              ))}
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        {userData ? (
          <NavUser user={userData} />
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/auth/login" className="flex-1">
              <SidebarMenuButton className="w-full">
                {t("login")}
              </SidebarMenuButton>
            </Link>
            <Link href="/auth/register" className="flex-1">
              <SidebarMenuButton className="w-full">
                {t("signUp")}
              </SidebarMenuButton>
            </Link>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
