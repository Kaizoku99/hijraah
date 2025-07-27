'use client';

import { createBrowserClient } from '@supabase/ssr';
import {
    LogOutIcon,
    SettingsIcon,
    UserIcon,
    ChevronDown,
    BellIcon,
    HelpCircleIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/atoms/avatar';

export function UserProfile() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const [session, setSession] = useState<any>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const getAuthenticatedUser = async () => {
            // First verify the user securely
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                setSession(null);
                return;
            }

            // Then get the session
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (!sessionError && session) {
                setSession(session);
            }
        };

        getAuthenticatedUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            // Verify the user on auth state change too
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (!userError && user && session) {
                setSession(session);
            } else {
                setSession(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    useEffect(() => {
        async function getProfile() {
            if (!session?.user?.id) return;

            const { data: profile } = await supabase
                .from('profiles')
                .select('avatar_url, full_name')
                .eq('id', session.user.id)
                .single();

            if (profile?.avatar_url) {
                setAvatarUrl(profile.avatar_url);
            }

            if (profile?.full_name) {
                setUserName(profile.full_name);
            }
        }

        getProfile();
    }, [session, supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    if (!session?.user) return null;

    const displayName = userName || session.user.email || 'User';
    const emailDisplay = session.user.email;
    const userInitial = (userName?.charAt(0) || session.user.email?.charAt(0) || 'U').toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className="flex items-center gap-3 rounded-md p-2 cursor-pointer hover:bg-accent transition-colors duration-200"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <Avatar className="h-8 w-8 border-2 border-primary/10">
                        <AvatarImage
                            src={avatarUrl || undefined}
                            alt={displayName}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                            {userInitial}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{displayName}</p>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                            {emailDisplay}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate('/profile')}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('/notifications')}>
                    <BellIcon className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                    <Badge className="ml-auto bg-primary text-xs">3</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('/settings')}>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('/help')}>
                    <HelpCircleIcon className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleSignOut}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}