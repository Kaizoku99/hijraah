"use client";

import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/auth/hooks";
import {
  useSupabaseBrowser,
  type TypedSSRSupabaseClient,
} from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

export function NotificationButton() {
  const { user } = useAuth();
  const supabase = useSupabaseBrowser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user || !supabase) return;

    const fetchNotifications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (fetchError) {
          throw fetchError;
        }

        setNotifications(data || []);
        const unread = (data || []).filter(
          (n: Notification) => !n.is_read
        ).length;
        setUnreadCount(unread);
      } catch (err: any) {
        console.error(
          "Error fetching notifications (raw):",
          err,
          "Error fetching notifications (JSON):",
          JSON.stringify(err, Object.getOwnPropertyNames(err))
        );
        setError("Failed to load notifications");
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();

    const channel = supabase
      .channel("public:notifications")
      .on<Notification>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload: RealtimePostgresChangesPayload<Notification>) => {
          console.log("New notification received:", payload);
          setNotifications((prev) =>
            [payload.new as Notification, ...prev].slice(0, 10)
          );
          setUnreadCount((prev) => prev + 1);
        }
      )
      .on<Notification>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload: RealtimePostgresChangesPayload<Notification>) => {
          console.log("Notification updated:", payload);
          const updatedNotification = payload.new as Notification;
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === updatedNotification.id ? updatedNotification : n
            )
          );
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      if (supabase && channel) {
        supabase
          .removeChannel(channel)
          .catch((err: Error) => console.error("Error removing channel:", err));
      }
    };
  }, [user, supabase]);

  const markAsRead = async (notificationId: string) => {
    if (!user || !supabase) return;
    try {
      const { error: updateError } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notificationId)
        .eq("user_id", user.id);

      if (updateError) {
        throw updateError;
      }

      setNotifications((prev) =>
        prev.map((n) => {
          if (n.id === notificationId && !n.is_read) {
            setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
            return { ...n, is_read: true };
          }
          return n;
        })
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    if (!user || !supabase || unreadCount === 0) return;
    try {
      const { error: updateError } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (updateError) {
        throw updateError;
      }

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="link"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-0"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </p>
          ) : error ? (
            <p className="p-4 text-center text-sm text-destructive">{error}</p>
          ) : notifications.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No new notifications
            </p>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex flex-col items-start gap-1 p-4 border-b last:border-0 cursor-pointer hover:bg-muted/50 ${
                    !notification.is_read
                      ? "bg-blue-50 dark:bg-blue-900/20 font-medium"
                      : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && markAsRead(notification.id)
                  }
                >
                  <p className="text-sm leading-tight">
                    {notification.message || "No message content"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
