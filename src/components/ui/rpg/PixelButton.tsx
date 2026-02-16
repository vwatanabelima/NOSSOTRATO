import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export function PixelButton({ className, variant = 'primary', ...props }: PixelButtonProps) {
    const variants = {
        primary: "bg-yellow-400 text-black border-white hover:bg-yellow-300",
        secondary: "bg-slate-700 text-white border-slate-500 hover:bg-slate-600",
        danger: "bg-red-500 text-white border-red-300 hover:bg-red-400",
    };

    return (
        <button
            className={cn(
                "font-pixel text-xs px-4 py-2 border-2 shadow-sm transition-transform active:scale-95 uppercase tracking-wider",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
