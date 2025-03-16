"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/language-switcher';
import { MobileNav } from '@/components/mobile-nav';
import { createBrowserClient } from '@supabase/ssr';
import { Session } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js'

export function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image
                src="/Hijraah_logo.png"
                alt="Hijraah"
                width={32}
                height={32}
                className="h-8 w-8"
                priority
              />
              <span className="font-bold text-xl">Hijraah</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/Hijraah_logo.png"
              alt="Hijraah"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="font-bold text-xl">Hijraah</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/tools" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Tools
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/chat" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Chat
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="hidden md:flex space-x-2">
              {user ? (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
          <MobileNav session={session} />
        </div>
      </div>
    </header>
  );
}