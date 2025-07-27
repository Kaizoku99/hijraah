'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { casesService } from '@/lib/services/cases';
import { CaseType } from '@/types/cases';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select';
import { Textarea } from '@/ui/textarea';
import { useToast } from '@/ui/use-toast';

export function NewCaseForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        case_type: '' as CaseType,
        description: '',
        notes: '',
    });

    // These would typically come from an API call or config
    const caseTypes = [
        { value: 'green_card', label: 'Green Card Application' },
        { value: 'citizenship', label: 'Citizenship Application' },
        { value: 'visa_application', label: 'Visa Application' },
        { value: 'asylum', label: 'Asylum' },
        { value: 'work_permit', label: 'Work Permit' },
        { value: 'family_petition', label: 'Family Petition' },
    ];

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.case_type) {
            toast({
                title: 'Missing fields',
                description: 'Please fill in all required fields.',
                variant: 'destructive',
            });
            return;
        }

        setSubmitting(true);

        try {
            const caseData = {
                ...formData,
                status: 'pending' as const,
            };

            const result = await casesService.createCase(caseData);

            toast({
                title: 'Success',
                description: 'Case created successfully.',
            });

            router.push(`/dashboard/cases/${result.id}`);
        } catch (error) {
            console.error('Error creating case:', error);
            toast({
                title: 'Error',
                description: 'Failed to create case. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={() => router.back()} className="mr-2">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <h1 className="text-2xl font-bold">New Case</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Case</CardTitle>
                    <CardDescription>
                        Fill out the form below to create a new immigration case
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Case Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                placeholder="Enter a title for this case"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="case_type">Case Type <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.case_type}
                                onValueChange={(value) => handleChange('case_type', value)}
                            >
                                <SelectTrigger id="case_type">
                                    <SelectValue placeholder="Select case type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {caseTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Provide a brief description of this case"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Add any additional notes or information"
                                value={formData.notes}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/dashboard/cases')}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Case
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
} 