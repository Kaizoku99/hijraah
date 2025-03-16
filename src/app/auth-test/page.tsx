'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, useUser, useIsAuthenticated, useHasRole } from '@/lib/auth/hooks';
import { hasPermission, createPermission } from '@/lib/auth/rbac';

export default function AuthTestPage() {
    const auth = useAuth();
    const user = useUser();
    const isAuthenticated = useIsAuthenticated();
    const isAdmin = useHasRole('admin');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState<any>(null);
    const [permissionTest, setPermissionTest] = useState('');

    // Test permission
    const canAccessUsers = user ? hasPermission(user, 'users:view') : false;

    const handleSignIn = async () => {
        try {
            const response = await auth.signIn({ email, password });
            setResult({ success: true, data: response });
        } catch (error) {
            setResult({ success: false, error });
        }
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            setResult({ success: true, message: 'Signed out successfully' });
        } catch (error) {
            setResult({ success: false, error });
        }
    };

    const checkPermission = () => {
        try {
            const hasAccess = user ? hasPermission(user, permissionTest) : false;
            setResult({
                success: true,
                message: `Permission check: ${permissionTest}`,
                hasAccess
            });
        } catch (error) {
            setResult({ success: false, error });
        }
    };

    useEffect(() => {
        // Log current auth state when it changes
        console.log('Auth state:', { user, isAuthenticated, isAdmin });
    }, [user, isAuthenticated, isAdmin]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Auth System Test Page</h1>

            <Tabs defaultValue="status">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="status">Auth Status</TabsTrigger>
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                    <TabsTrigger value="debug">Debug</TabsTrigger>
                </TabsList>

                <TabsContent value="status">
                    <Card>
                        <CardHeader>
                            <CardTitle>Authentication Status</CardTitle>
                            <CardDescription>Current user authentication information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}
                                </div>

                                {user && (
                                    <>
                                        <div>
                                            <strong>User ID:</strong> {user.id}
                                        </div>
                                        <div>
                                            <strong>Email:</strong> {user.email}
                                        </div>
                                        <div>
                                            <strong>Name:</strong> {user.user_metadata?.full_name || 'Not set'}
                                        </div>
                                        <div>
                                            <strong>Role:</strong> {user.user_metadata?.role || 'Not set'}
                                        </div>
                                        <div>
                                            <strong>Is Admin:</strong> {isAdmin ? '✅ Yes' : '❌ No'}
                                        </div>
                                        <div>
                                            <strong>Can Access Users:</strong> {canAccessUsers ? '✅ Yes' : '❌ No'}
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            {isAuthenticated ? (
                                <Button onClick={handleSignOut} variant="destructive">Sign Out</Button>
                            ) : (
                                <Button disabled>Not Signed In</Button>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>Test signing in with credentials</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSignIn}>Sign In</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="permissions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Test Permissions</CardTitle>
                            <CardDescription>Check if the current user has specific permissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Permission</label>
                                    <input
                                        type="text"
                                        value={permissionTest}
                                        onChange={(e) => setPermissionTest(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                        placeholder="e.g. users:view"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Examples: users:view, applications:manage, system:settings
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={checkPermission} disabled={!isAuthenticated}>
                                Test Permission
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="debug">
                    <Card>
                        <CardHeader>
                            <CardTitle>Debug Information</CardTitle>
                            <CardDescription>Raw data and operation results</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <strong>Last Operation Result:</strong>
                                    <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60">
                                        {result ? JSON.stringify(result, null, 2) : 'No operations performed yet'}
                                    </pre>
                                </div>

                                <div>
                                    <strong>User Object:</strong>
                                    <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60">
                                        {user ? JSON.stringify(user, null, 2) : 'No user data'}
                                    </pre>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 