'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { AvatarUpload } from '@/components/ui/avatar-upload';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const supabase = getSupabaseClient();
  const [name, setName] = useState(user?.user_metadata?.full_name || '');

  const [settings, setSettings] = useState({
    emailNotifications: true,
    documentReminders: true,
    applicationUpdates: true,
    twoFactorAuth: false,
    theme: 'system',
    language: 'en',
  });

  const handleAvatarUpload = async (url: string) => {
    try {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile',
      });
    }
  };

  const handleSettingChange = async (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    try {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ [`settings_${key}`]: value })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update settings',
      });
    }
  };

  const handleNameUpdate = async () => {
    try {
      setIsLoading(true);
      if (!user) throw new Error('No user');

      // Update auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: name }
      });

      if (updateError) throw updateError;

      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: name } as any)
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Information</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Full Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 rounded-md border px-3 py-2"
                      placeholder="Enter your full name"
                    />
                    <Button
                      onClick={handleNameUpdate}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <AvatarUpload
                  currentAvatarUrl={user?.user_metadata?.avatar_url}
                  onUploadComplete={handleAvatarUpload}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Theme
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred theme
                      </p>
                    </div>
                    <select
                      value={settings.theme}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="w-[200px] rounded-md border"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Language
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred language
                      </p>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="w-[200px] rounded-md border"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Email Notifications
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your application
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange('emailNotifications', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Document Reminders
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded about document deadlines
                  </p>
                </div>
                <Switch
                  checked={settings.documentReminders}
                  onCheckedChange={(checked) =>
                    handleSettingChange('documentReminders', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Application Updates
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Receive status updates about your application
                  </p>
                </div>
                <Switch
                  checked={settings.applicationUpdates}
                  onCheckedChange={(checked) =>
                    handleSettingChange('applicationUpdates', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleSettingChange('twoFactorAuth', checked)
                  }
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <Button variant="outline">
                  Change Password
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessions</h3>
                <Button variant="destructive">
                  Sign Out All Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 