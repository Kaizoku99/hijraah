'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useEmailTemplates } from '@/hooks/useEmailTemplates';
import { Locale } from '@/emails/i18n/translations';

export default function EmailTemplatePreview() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('passwordReset');
    const [selectedLocale, setSelectedLocale] = useState<Locale>('en');
    const [previewHtml, setPreviewHtml] = useState<string>('');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const { generateEmailHtml, loading, error } = useEmailTemplates({
        defaultLocale: selectedLocale,
    });

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTemplate(e.target.value);
    };

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocale(e.target.value as Locale);
    };

    const generatePreview = useCallback(() => {
        try {
            // Example props for each template type
            const templateProps: Record<string, any> = {
                passwordReset: {
                    actionUrl: 'https://example.com/reset-password?token=example',
                    email: 'user@example.com',
                    name: 'John Doe',
                },
                emailConfirmation: {
                    actionUrl: 'https://example.com/confirm-email?token=example',
                    email: 'user@example.com',
                    name: 'John Doe',
                },
                magicLink: {
                    actionUrl: 'https://example.com/login?token=example',
                    email: 'user@example.com',
                    name: 'John Doe',
                },
                emailChange: {
                    actionUrl: 'https://example.com/confirm-email-change?token=example',
                    oldEmail: 'old@example.com',
                    newEmail: 'new@example.com',
                    name: 'John Doe',
                },
                userInvitation: {
                    actionUrl: 'https://example.com/accept-invite?token=example',
                    inviterName: 'Jane Smith',
                    inviterEmail: 'jane@example.com',
                    organizationName: 'Acme Inc',
                    recipientEmail: 'user@example.com',
                },
            };

            // Generate the preview HTML
            // Note: We're only supporting passwordReset for now
            const html = generateEmailHtml({
                type: 'passwordReset',
                locale: selectedLocale,
                props: templateProps.passwordReset,
            });

            setPreviewHtml(html);

            // Update the iframe if it exists
            if (iframeRef.current) {
                const iframe = iframeRef.current;
                const doc = iframe.contentDocument || iframe.contentWindow?.document;

                if (doc) {
                    doc.open();
                    doc.write(html);
                    doc.close();
                }
            }
        } catch (err) {
            console.error('Failed to generate preview:', err);
        }
    }, [selectedTemplate, selectedLocale, generateEmailHtml]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Email Template Preview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Template</label>
                    <select
                        value={selectedTemplate}
                        onChange={handleTemplateChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="passwordReset">Password Reset</option>
                        <option value="emailConfirmation" disabled>Email Confirmation</option>
                        <option value="magicLink" disabled>Magic Link</option>
                        <option value="emailChange" disabled>Email Change</option>
                        <option value="userInvitation" disabled>User Invitation</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                        value={selectedLocale}
                        onChange={handleLocaleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="ar">Arabic</option>
                    </select>
                </div>

                <div className="flex items-end">
                    <button
                        onClick={generatePreview}
                        disabled={loading}
                        className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Preview'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
                    Error: {error.message}
                </div>
            )}

            <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-lg font-semibold mb-4">Preview</h2>
                <div className="bg-white border rounded overflow-hidden h-[600px]">
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full"
                        title="Email Preview"
                        sandbox="allow-same-origin"
                    />
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Raw HTML</h2>
                <div className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-[300px]">
                    <pre>{previewHtml}</pre>
                </div>
            </div>
        </div>
    );
} 