'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Case } from '@/types/cases';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';

interface TemporaryCaseFormProps {
    onSubmit: (data: Partial<Case>) => Promise<void>;
    onCancel: () => void;
}

export function TemporaryCaseForm({ onSubmit, onCancel }: TemporaryCaseFormProps) {
    const t = useTranslations('temporaryCaseForm');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title: title || t('initialTitle'),
            description: description || t('initialDescription'),
            status: 'active',
        });
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-medium">{t('formTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">{t('titleLabel')}</label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        placeholder={t('initialTitle')}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">{t('descriptionLabel')}</label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        rows={3}
                        placeholder={t('initialDescription')}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        {t('cancelButton')}
                    </Button>
                    <Button type="submit">{t('createButton')}</Button>
                </div>
            </form>
        </div>
    );
} 