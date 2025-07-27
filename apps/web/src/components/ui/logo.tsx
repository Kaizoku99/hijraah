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
      <>
        <div className="relative h-8 w-8 overflow-hidden">
          <Image
            src="/Hijraah_logo.png"
            alt="Hijraah Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
            priority
          />
        </div>
        {showText && (
          <div className="relative overflow-hidden">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Hijraah
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </div>
        )}
      </>
    </Link>
  );
}
