import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shared Chat - Hijraah",
  description: "View a shared AI chat conversation",
};

export default function SharedChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
