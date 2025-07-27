"use client"

import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "sidebar" }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const isSidebar = variant === "sidebar"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-9 w-9 rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
                        "border border-border/40 shadow-sm transition-all duration-200",
                        "hover:shadow-md data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                        "focus-visible:ring-offset-0 focus-visible:border-primary/50",
                        mounted && "animate-in fade-in-50 duration-300",
                        isSidebar && "h-8 w-8 rounded-md"
                    )}
                >
                    <Sun className={cn("h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0", isSidebar && "h-4 w-4")} />
                    <Moon className={cn("absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100", isSidebar && "h-4 w-4")} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        theme === "light" && "bg-accent font-medium text-accent-foreground"
                    )}
                >
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        theme === "dark" && "bg-accent font-medium text-accent-foreground"
                    )}
                >
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        theme === "system" && "bg-accent font-medium text-accent-foreground"
                    )}
                >
                    <Laptop className="h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}