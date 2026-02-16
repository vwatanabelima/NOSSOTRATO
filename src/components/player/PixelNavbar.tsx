
"use client";

import { Map, ShoppingBag, Trophy, Backpack, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PixelNavbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { href: '/player/game', icon: Map, label: 'MISSÕES' }, // Left 1
        { href: '/player/game/inventory', icon: Backpack, label: 'MOCHILA' }, // Left 2
        { href: '/player/game/dashboard', icon: Home, label: 'INÍCIO', isCenter: true }, // Center
        { href: '/player/game/shop', icon: ShoppingBag, label: 'LOJA' }, // Right 1
        { href: '/player/game/ranking', icon: Trophy, label: 'RANK' }, // Right 2
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-slate-900 border-t-4 border-slate-700 pb-safe z-50">
            <div className="flex justify-between items-end px-2 pt-2 pb-3 max-w-lg mx-auto relative">

                {/* Background extension for curved look if needed, simplified for pixel art by just borders */}

                {navItems.map((item, index) => {
                    const active = isActive(item.href);
                    const isCenter = item.isCenter;

                    if (isCenter) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative -top-5" // Lift center button
                            >
                                <div className={`
                                    w-16 h-16 flex flex-col items-center justify-center 
                                    bg-slate-800 border-4 ${active ? 'border-yellow-400' : 'border-slate-600'} 
                                    rotate-45 shadow-lg transition-transform active:scale-95
                                `}>
                                    <item.icon className={`
                                        w-8 h-8 -rotate-45 
                                        ${active ? 'text-yellow-400' : 'text-slate-400'}
                                    `} />
                                </div>
                                <span className={`
                                    absolute -bottom-6 left-1/2 -translate-x-1/2 
                                    text-[8px] font-pixel font-bold uppercase tracking-widest
                                    ${active ? 'text-yellow-400' : 'text-slate-500'}
                                `}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex flex-col items-center gap-1 min-w-[3rem]
                                transition-colors duration-200
                                ${active ? 'text-white' : 'text-slate-500'}
                            `}
                        >
                            <item.icon className={`
                                w-6 h-6 stroke-2 
                                ${active ? 'stroke-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : ''}
                            `} />
                            <span className="text-[8px] font-pixel font-bold">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
