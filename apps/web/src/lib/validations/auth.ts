import * as z from 'zod';

// Password validation helpers
const containsUppercase = (str: string) => /[A-Z]/.test(str);
const containsLowercase = (str: string) => /[a-z]/.test(str);
const containsNumber = (str: string) => /[0-9]/.test(str);
const containsSpecialChar = (str: string) => /[^A-Za-z0-9]/.test(str);

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Registration form validation schema
export const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine(containsUppercase, {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(containsLowercase, {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine(containsNumber, {
      message: 'Password must contain at least one number',
    })
    .refine(containsSpecialChar, {
      message: 'Password must contain at least one special character',
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Helper functions to calculate password strength
export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  
  // Character types
  if (containsUppercase(password)) strength += 1;
  if (containsLowercase(password)) strength += 1;
  if (containsNumber(password)) strength += 1;
  if (containsSpecialChar(password)) strength += 1;
  
  // Scale to 0-4 range
  return Math.min(4, strength);
}

export function getPasswordStrengthLabel(score: number): {
  label: string;
  color: string;
} {
  switch (score) {
    case 0:
      return { label: 'Very Weak', color: 'bg-destructive' };
    case 1:
      return { label: 'Weak', color: 'bg-destructive/80' };
    case 2:
      return { label: 'Fair', color: 'bg-orange-500' };
    case 3:
      return { label: 'Good', color: 'bg-amber-500' };
    case 4:
      return { label: 'Strong', color: 'bg-emerald-500' };
    default:
      return { label: 'Very Weak', color: 'bg-destructive' };
  }
} 