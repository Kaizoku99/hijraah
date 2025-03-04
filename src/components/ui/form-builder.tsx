'use client';

import * as React from 'react';
import { useTranslation } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export type FieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'date'
    | 'file'
    | 'checkbox';

export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    help?: string;
    options?: { value: string; label: string }[];
    validation?: z.ZodTypeAny;
    defaultValue?: any;
    className?: string;
}

export interface FormBuilderProps {
    fields: FormField[];
    onSubmit: (data: any) => void;
    submitText?: string;
    cancelText?: string;
    onCancel?: () => void;
    className?: string;
    loading?: boolean;
    defaultValues?: Record<string, any>;
}

export function FormBuilder({
    fields,
    onSubmit,
    submitText = 'Submit',
    cancelText = 'Cancel',
    onCancel,
    className,
    loading = false,
    defaultValues = {},
}: FormBuilderProps) {
    const { t } = useTranslation('common');

    // Build schema dynamically based on fields
    const schema = z.object(
        fields.reduce((acc, field) => {
            let validator = field.validation;
            if (!validator) {
                if (field.type === 'email') {
                    validator = z.string().email(t('validation.invalidEmail'));
                } else if (field.type === 'number') {
                    validator = z.number();
                } else {
                    validator = field.required
                        ? z.string().min(1, t('validation.required', { field: field.label }))
                        : z.string().optional();
                }
            }
            return { ...acc, [field.name]: validator };
        }, {})
    );

    // Prepare default values
    const formDefaultValues = fields.reduce((acc, field) => {
        const value = defaultValues[field.name] ?? field.defaultValue ?? '';
        return { ...acc, [field.name]: value };
    }, {});

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: formDefaultValues,
    });

    const handleSubmit = form.handleSubmit(onSubmit);

    const renderField = (field: FormField) => {
        const error = form.formState.errors[field.name];

        switch (field.type) {
            case 'textarea':
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                        <Textarea
                            id={field.name}
                            placeholder={field.placeholder}
                            {...form.register(field.name)}
                            className={cn(error && 'border-red-500', field.className)}
                        />
                        {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
                        {error && <p className="text-sm text-red-500">{error.message?.toString()}</p>}
                    </div>
                );

            case 'select':
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                        <Select
                            id={field.name}
                            onValueChange={(value) => form.setValue(field.name, value)}
                            defaultValue={formDefaultValues[field.name]}
                            className={cn(error && 'border-red-500', field.className)}
                        >
                            {field.options?.map((option) => (
                                <Select.Item key={option.value} value={option.value}>
                                    {option.label}
                                </Select.Item>
                            ))}
                        </Select>
                        {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
                        {error && <p className="text-sm text-red-500">{error.message?.toString()}</p>}
                    </div>
                );

            case 'date':
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !form.watch(field.name) && "text-muted-foreground",
                                        error && 'border-red-500',
                                        field.className
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {form.watch(field.name) ? (
                                        format(form.watch(field.name), 'PPP')
                                    ) : (
                                        <span>{field.placeholder || t('form.selectDate')}</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={form.watch(field.name)}
                                    onSelect={(date) => form.setValue(field.name, date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
                        {error && <p className="text-sm text-red-500">{error.message?.toString()}</p>}
                    </div>
                );

            case 'file':
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                        <Input
                            id={field.name}
                            type="file"
                            {...form.register(field.name)}
                            className={cn(error && 'border-red-500', field.className)}
                        />
                        {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
                        {error && <p className="text-sm text-red-500">{error.message?.toString()}</p>}
                    </div>
                );

            default:
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                        <Input
                            id={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            {...form.register(field.name, field.type === 'number' ? { valueAsNumber: true } : {})}
                            className={cn(error && 'border-red-500', field.className)}
                        />
                        {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
                        {error && <p className="text-sm text-red-500">{error.message?.toString()}</p>}
                    </div>
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
            {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                    {renderField(field)}
                </div>
            ))}

            <div className="flex items-center justify-end gap-2">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                )}
                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="animate-spin mr-2">&#9696;</span>
                            {t('form.processing')}
                        </>
                    ) : (
                        submitText
                    )}
                </Button>
            </div>
        </form>
    );
} 