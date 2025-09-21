"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthIndexRedirect() {
  const router = useRouter();
  useEffect(() => {
    // Use relative path so the current locale prefix is preserved
    router.replace("register");
  }, [router]);
  return null;
}
