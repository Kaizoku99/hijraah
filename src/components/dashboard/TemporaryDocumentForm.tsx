'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DocumentUpload } from '@/types/documents';

interface TemporaryDocumentFormProps {
    userId: string;
    onSubmit: (data: Partial<DocumentUpload>) => Promise<void>;
    onCancel: () => void;
}

export function TemporaryDocumentForm({ userId, onSubmit, onCancel }: TemporaryDocumentFormProps) {
    const [name, setName] = useState('New Document');
    const [description, setDescription] = useState('Sample description');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file');
            return;
        }

        onSubmit({
            name,
            description,
            file,
            user_id: userId
        });
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-medium">Upload New Document</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Document Name</label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="file" className="text-sm font-medium">File</label>
                    <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                    {file && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Selected file: {file.name} ({Math.round(file.size / 1024)} KB)
                        </p>
                    )}
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={!file}>Upload</Button>
                </div>
            </form>
        </div>
    );
} 