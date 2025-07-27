/**
 * @deprecated This file is maintained for backward compatibility.
 * Please import from '@/ui/molecules/password-strength' instead.
 */

"use client";

import React from "react";

import { cn } from "@/lib/utils";

export type PasswordStrength = "weak" | "medium" | "strong" | "very-strong";

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export function PasswordStrengthMeter({
  password,
  className,
}: PasswordStrengthMeterProps) {
  const strength = getPasswordStrength(password);
  const strengthPercentage = getStrengthPercentage(strength);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="h-1 w-full bg-muted rounded overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", {
            "bg-destructive": strength === "weak",
            "bg-yellow-500": strength === "medium",
            "bg-green-500": strength === "strong",
            "bg-primary": strength === "very-strong",
          })}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {strength === "weak" && "Weak password"}
        {strength === "medium" && "Medium strength password"}
        {strength === "strong" && "Strong password"}
        {strength === "very-strong" && "Very strong password"}
      </p>
    </div>
  );
}

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return "weak";
  if (password.length < 6) return "weak";
  if (password.length < 8) return "medium";

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const criteriaCount = [
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChars,
  ].filter(Boolean).length;

  if (password.length >= 12 && criteriaCount >= 3) return "very-strong";
  if (password.length >= 8 && criteriaCount >= 2) return "strong";
  return "medium";
}

function getStrengthPercentage(strength: PasswordStrength): number {
  switch (strength) {
    case "weak":
      return 25;
    case "medium":
      return 50;
    case "strong":
      return 75;
    case "very-strong":
      return 100;
  }
}

export { getPasswordStrength };
