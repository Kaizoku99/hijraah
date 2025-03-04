import { useState } from 'react';
import { useForm as useHookForm, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface UseFormProps<T extends z.ZodType> {
  schema: T;
  defaultValues?: DefaultValues<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => Promise<void>;
}

export function useForm<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
}: UseFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      form.reset();
      toast({
        title: 'Success',
        description: 'Form submitted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    isSubmitting,
    handleSubmit,
  };
}