import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "New Unified Chat - Hijraah",
  description: "Start a new unified AI chat conversation",
};

export default function NewChatLayout({ children }: { children: ReactNode }) {
  return children;
}
