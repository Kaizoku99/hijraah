"use client";

import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import * as React from "react";

import { useAuth } from "@/lib/auth/hooks";


interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  fallback = <DefaultFallback />,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isLoading && !user) {
      const redirectUrl = new URLSearchParams();
      redirectUrl.set("redirect", pathname);
      router.push(`/auth/login?${redirectUrl.toString()}`);
    }
  }, [user, isLoading, router, pathname]);

  // Show loading state
  if (isLoading) {
    return fallback;
  }

  // Show children only if authenticated
  return user ? <>{children}</> : null;
}

function DefaultFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
