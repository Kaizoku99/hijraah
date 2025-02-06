'use client'

import React, { ComponentPropsWithRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  FileText,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  ChevronDown,
  User,
} from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Experts', href: '/experts', icon: Users },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

const userNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Sign out', href: '/auth/signout', icon: LogOut },
]

export const DashboardLayout = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 flex w-64 flex-col">
          {/* Sidebar content */}
          <div className="flex flex-1 flex-col overflow-y-auto bg-gray-900 px-4 py-4">
            {/* Logo */}
            <div className="flex h-16 items-center">
              <Link href="/dashboard" className="flex items-center">
                <span className="text-2xl font-bold text-white">Hijraah</span>
              </Link>
            </div>

            {/* User profile */}
            <div className="mb-8 mt-6">
              <div className="flex items-center gap-4 px-2">
                <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">John Doe</h3>
                  <p className="text-xs text-gray-400">Premium Plan</p>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Main navigation */}
            <nav className="flex-1 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* User navigation */}
            <div className="mt-auto space-y-1 pt-4 border-t border-gray-800">
              {userNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 pl-64 p-8" {...props}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout 