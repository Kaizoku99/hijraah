import React from "react";

import { LoginForm } from "@/components/ui/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginForm />
    </div>
  );
}
