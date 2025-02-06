import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CaseType, CaseStatus, CaseStage } from '@/types/cases';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getFileTypeIcon(fileType: string): string {
  const type = fileType.split('/')[0];
  switch (type) {
    case 'image':
      return '🖼️';
    case 'video':
      return '🎥';
    case 'audio':
      return '🎵';
    case 'application':
      return '📄';
    default:
      return '📁';
  }
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function groupBy<T>(
  array: T[],
  key: keyof T
): { [key: string]: T[] } {
  return array.reduce((result, currentValue) => {
    const groupKey = String(currentValue[key]);
    (result[groupKey] = result[groupKey] || []).push(currentValue);
    return result;
  }, {} as { [key: string]: T[] });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
}

export const CASE_TYPE_LABELS: Record<CaseType, string> = {
  student_visa: 'Student Visa',
  work_visa: 'Work Visa',
  family_visa: 'Family Visa',
  permanent_residence: 'Permanent Residence',
  citizenship: 'Citizenship',
  business_visa: 'Business Visa',
  tourist_visa: 'Tourist Visa',
  other: 'Other',
};

export const CASE_STATUS_LABELS: Record<CaseStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  in_progress: 'In Progress',
  pending_review: 'Pending Review',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
  archived: 'Archived',
};

export const CASE_STAGE_LABELS: Record<CaseStage, string> = {
  document_collection: 'Document Collection',
  review: 'Review',
  submission: 'Submission',
  processing: 'Processing',
  decision: 'Decision',
  completed: 'Completed',
};

export function formatCaseReference(id: string): string {
  return `CASE-${id.slice(0, 8).toUpperCase()}`;
}

export function getCaseProgress(stage: CaseStage): number {
  const stages: CaseStage[] = [
    'document_collection',
    'review',
    'submission',
    'processing',
    'decision',
    'completed',
  ];
  const currentIndex = stages.indexOf(stage);
  return Math.round(((currentIndex + 1) / stages.length) * 100);
}

export function getDocumentCategory(fileType: string): string {
  const type = fileType.split('/')[0];
  switch (type) {
    case 'image':
      return 'Images';
    case 'application':
      return fileType.includes('pdf') ? 'PDF Documents' : 'Documents';
    case 'text':
      return 'Text Documents';
    default:
      return 'Other';
  }
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some((type) => file.type.startsWith(type));
}

export function validateFileSize(file: File, maxSizeInMB: number): boolean {
  return file.size <= maxSizeInMB * 1024 * 1024;
}

export function getDateRangeFromPeriod(
  period: 'today' | 'week' | 'month' | 'year'
): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(start.getDate() - 7);
      break;
    case 'month':
      start.setMonth(start.getMonth() - 1);
      break;
    case 'year':
      start.setFullYear(start.getFullYear() - 1);
      break;
  }

  return { start, end };
}

export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}
