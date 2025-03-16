import { AuthProvider } from "@/contexts/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Hijraah",
    description: "Immigration management platform",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
} 