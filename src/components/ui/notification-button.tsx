'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/lib/supabase/client';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    created_at: string;
    read: boolean;
}

export function NotificationButton() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!user) return;

        // Fetch initial notifications
        const fetchNotifications = async () => {
            try {
                const { data, error } = await supabase
                    .from('notifications')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (error) {
                    console.error('Error fetching notifications:', error);
                    return;
                }

                setNotifications(data || []);
                setUnreadCount(data?.filter(n => !n.read).length || 0);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        };

        fetchNotifications();

        // Subscribe to new notifications
        const subscription = supabase
            .channel('notifications')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setNotifications(prev => [payload.new as Notification, ...prev]);
                        setUnreadCount(prev => prev + 1);
                    } else if (payload.eventType === 'UPDATE') {
                        setNotifications(prev =>
                            prev.map(n => n.id === payload.new.id ? payload.new as Notification : n)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [user]);

    const markAsRead = async (notificationId: string) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('id', notificationId);

            if (error) {
                console.error('Error marking notification as read:', error);
                return;
            }

            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    const markAllAsRead = async () => {
        if (!user?.id) return;

        try {
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('user_id', user.id)
                .eq('read', false);

            if (error) {
                console.error('Error marking all notifications as read:', error);
                return;
            }

            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (err) {
            console.error('Error marking all notifications as read:', err);
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    {unreadCount > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[400px]">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={`flex flex-col items-start gap-1 p-4 border-b last:border-0 ${!notification.read ? 'bg-muted/50' : ''
                                    }`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex items-center gap-2 w-full">
                                    <span className="font-medium">{notification.title}</span>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 