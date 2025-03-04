"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps = {}) {
    return (
        <Link
            href="/"
            className={cn(
                "flex items-center gap-2 group transition-opacity hover:opacity-90",
                className
            )}
            aria-label="Hijraah - Immigration Platform"
        >
            <div className="relative h-8 w-8 overflow-hidden">
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white transition-transform duration-300 group-hover:scale-110"
                    >
                        <path
                            d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <path
                            d="M12 6L12 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7 9.5L17 14.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17 9.5L7 14.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            {showText && (
                <div className="relative overflow-hidden">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Hijraah
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
                </div>
            )}
        </Link>
    );
}