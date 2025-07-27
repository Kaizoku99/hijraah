'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/supabase'

const caseFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    type: z.enum(['visa', 'residence', 'citizenship', 'asylum', 'other']),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    priority: z.enum(['low', 'medium', 'high']),
    documents: z.array(z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.string(),
    })).optional(),
})

type CaseFormData = z.infer<typeof caseFormSchema>

export const CaseForm = () => {
    const t = useTranslations('cases')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const supabase = createClient()

    const form = useForm<CaseFormData>({
        resolver: zodResolver(caseFormSchema),
        defaultValues: {
            title: '',
            type: 'visa',
            description: '',
            priority: 'medium',
            documents: [],
        },
    })

    const onSubmit = async (data: CaseFormData) => {
        try {
            setIsSubmitting(true)

            // Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser()
            if (userError) throw userError

            // Insert case into database
            const { error: insertError } = await supabase
                .from('cases')
                .insert({
                    ...data,
                    user_id: user?.id,
                    status: 'pending',
                    created_at: new Date().toISOString(),
                })

            if (insertError) throw insertError

            toast.success(t('form.submitSuccess'))
            form.reset()
        } catch (error) {
            console.error('Error submitting case:', error)
            toast.error(t('form.submitError'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{t('form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form form={form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('form.fields.title')}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('form.fields.type')}</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('form.fields.selectType')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="visa">{t('form.fields.types.visa')}</SelectItem>
                                            <SelectItem value="residence">{t('form.fields.types.residence')}</SelectItem>
                                            <SelectItem value="citizenship">{t('form.fields.types.citizenship')}</SelectItem>
                                            <SelectItem value="asylum">{t('form.fields.types.asylum')}</SelectItem>
                                            <SelectItem value="other">{t('form.fields.types.other')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('form.fields.description')}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('form.fields.priority')}</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('form.fields.selectPriority')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">{t('form.fields.priorities.low')}</SelectItem>
                                            <SelectItem value="medium">{t('form.fields.priorities.medium')}</SelectItem>
                                            <SelectItem value="high">{t('form.fields.priorities.high')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="documents"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('form.fields.documents')}</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            onRemove={(index: number) => {
                                                const newDocs = [...(field.value || [])]
                                                newDocs.splice(index, 1)
                                                field.onChange(newDocs)
                                            }}
                                            maxSize={10} // 10MB
                                            acceptedTypes={{
                                                'application/pdf': ['.pdf'],
                                                'image/*': ['.png', '.jpg', '.jpeg'],
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('form.submitting')}
                                </>
                            ) : (
                                t('form.submit')
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CaseForm 