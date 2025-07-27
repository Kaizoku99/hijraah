import { Metadata } from "next";

import { CasesDashboard } from "@/components/presentation/cases/cases-dashboard";

export const metadata: Metadata = {
  title: "Cases | Hijraah Immigration Platform",
  description: "Manage your immigration cases",
};

export default function CasesPage() {
  return <CasesDashboard />;
}
