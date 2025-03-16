import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormErrorProps {
    message?: string;
    className?: string;
    id?: string;
}

export function FormError({ message, className, id }: FormErrorProps) {
    if (!message) return null;

    return (
        <div
            className={cn(
                "flex items-center gap-x-2 text-destructive text-sm mt-1",
                className
            )}
            aria-live="assertive"
            id={id}
        >
            <XCircle className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
} 