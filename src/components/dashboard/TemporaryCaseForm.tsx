'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Case } from '@/types/cases';

interface TemporaryCaseFormProps {
    onSubmit: (data: Partial<Case>) => Promise<void>;
    onCancel: () => void;
}

export function TemporaryCaseForm({ onSubmit, onCancel }: TemporaryCaseFormProps) {
    const [title, setTitle] = useState('New Case');
    const [description, setDescription] = useState('Sample description');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit({
            title,
            description,
            status: 'active',
        });
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-medium">Create New Case</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </div>
    );
} 