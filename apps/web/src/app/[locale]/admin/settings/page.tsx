"use client";

import { useParams , redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { locales, defaultLocale as appDefaultLocale , isRTL } from "@/i18n/i18n";
import { cn } from "@/lib/utils";


// Mock API (Replace with actual API calls)
const fetchSettings = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Return mock settings - replace with actual fetched data
  return {
    appName: "Hijraah",
    defaultLocale: appDefaultLocale,
    theme: "system",
    enable2fa: false,
  };
};

const saveSettingsAPI = async (settings: any) => {
  console.log("Saving settings:", settings);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate success/failure
  if (Math.random() > 0.1) return { success: true };
  return { success: false, error: "Simulated network error" };
};

export default function AdminSettingsPage() {
  const params = useParams();
  const locale = params.locale || "en";
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const t = useTranslations("adminSettings");
  const rtl = isRTL(locale as string);

  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch settings on load
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const fetchedSettings = await fetchSettings();
        setSettings(fetchedSettings);
      } catch (error) {
        console.error("Failed to load settings:", error);
        toast.error("Could not load settings.");
      } finally {
        setIsLoading(false);
      }
    };
    if (isAdmin) {
      loadSettings();
    }
  }, [isAdmin]); // Re-fetch if isAdmin status changes (e.g., after login)

  // Redirect non-admins
  useEffect(() => {
    if (!isAdminLoading && !isAdmin) {
      redirect(`/${locale}/dashboard`);
    }
  }, [isAdmin, isAdminLoading, locale]);

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await saveSettingsAPI(settings);
      if (result.success) {
        toast.success(t("saveSuccess"));
      } else {
        toast.error(`${t("saveError")} ${result.error || ""}`);
      }
    } catch (error) {
      toast.error(t("saveError"));
      console.error("Save settings error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Display loading states
  if (isAdminLoading || (isAdmin && isLoading)) {
    return <div className="p-4">Loading...</div>; // Replace with skeleton
  }
  if (!isAdmin) {
    return null; // Or an unauthorized message, redirect is handled by useEffect
  }

  return (
    <div
      className={cn("p-4 md:p-6 lg:p-8 space-y-6", rtl ? "rtl" : "ltr")}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{t("pageTitle")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t("generalSection")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appName">{t("appNameLabel")}</Label>
            <Input
              id="appName"
              value={settings.appName || ""}
              onChange={(e) => handleInputChange("appName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultLocale">{t("defaultLocaleLabel")}</Label>
            <Select
              value={settings.defaultLocale || ""}
              onValueChange={(value) =>
                handleInputChange("defaultLocale", value)
              }
            >
              <SelectTrigger id="defaultLocale">
                <SelectValue placeholder="Select default language" />
              </SelectTrigger>
              <SelectContent>
                {locales.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {/* We might need a mapping from locale code to native name here */}
                    {loc.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t("appearanceSection")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">{t("themeLabel")}</Label>
            <Select
              value={settings.theme || "system"}
              onValueChange={(value) => handleInputChange("theme", value)}
            >
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">{t("themeSystem")}</SelectItem>
                <SelectItem value="light">{t("themeLight")}</SelectItem>
                <SelectItem value="dark">{t("themeDark")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t("securitySection")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="enable2fa" className="flex flex-col space-y-1">
              <span>{t("enable2faLabel")}</span>
              {/* Optional: <span className="font-normal leading-snug text-muted-foreground">Extra security for admin accounts.</span> */}
            </Label>
            <Switch
              id="enable2fa"
              checked={settings.enable2fa || false}
              onCheckedChange={(checked) =>
                handleInputChange("enable2fa", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : t("saveButton")}
        </Button>
      </div>
    </div>
  );
}
