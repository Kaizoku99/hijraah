'use client';

import { useAuth } from '@/contexts/auth';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Globe,
  Compass,
  FileText,
  Settings,
  LogOut,
  Users,
  GitCompare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function SidebarWrapper() {
  const { isOpen } = useSidebar();
  const { user } = useAuth();
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Compare', href: '/compare', icon: GitCompare },
    { name: 'Countries', href: '/countries', icon: Globe },
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Documents', href: '/documents', icon: FileText },
  ];

  const bottomItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Community', href: '/community', icon: Users },
  ];

  const NavItem = ({ item, className }: { item: typeof navigationItems[0], className?: string }) => {
    const isActive = pathname === item.href;
    return (
      <Link href={item.href} className="w-full">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            isActive && "bg-muted",
            className
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Button>
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <ScrollArea className="h-full px-3 py-5">
        <div className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-2">
          {bottomItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        {user && (
          <>
            <Separator className="my-4" />
            <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </>
        )}
      </ScrollArea>
    </aside>
  );
} 