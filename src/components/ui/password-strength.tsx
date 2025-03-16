import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { calculatePasswordStrength, getPasswordStrengthLabel } from '@/lib/validations/auth';

interface PasswordStrengthProps {
    password: string;
    className?: string;
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
    const [score, setScore] = useState(0);
    const [{ label, color }, setStrengthInfo] = useState({
        label: 'Very Weak',
        color: 'bg-destructive',
    });

    useEffect(() => {
        const strength = calculatePasswordStrength(password);
        setScore(strength);
        setStrengthInfo(getPasswordStrengthLabel(strength));
    }, [password]);

    return (
        <div className={cn("space-y-1.5", className)}>
            <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Password Strength</label>
                <span className="text-xs font-medium">{label}</span>
            </div>
            <div className="flex h-2 w-full gap-1">
                {/* 4 segments representing the strength levels */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "h-full flex-1 rounded-full transition-all",
                            index < score ? color : "bg-muted"
                        )}
                        aria-hidden="true"
                    />
                ))}
            </div>
        </div>
    );
} 