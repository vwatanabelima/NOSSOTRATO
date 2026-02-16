import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function PixelCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "bg-slate-800 border-4 border-slate-600 p-4 relative",
                "before:absolute before:inset-0 before:border-2 before:border-slate-900/50 before:pointer-events-none",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
