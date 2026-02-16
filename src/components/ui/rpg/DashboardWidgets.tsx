
"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';

interface DashboardWidgetProps {
    title: string;
    children: ReactNode;
    type?: 'default' | 'mystery' | 'gold' | 'quest';
    actionLabel?: string;
    actionHref?: string;
}

export function DashboardWidget({
    title,
    children,
    type = 'default',
    actionLabel,
    actionHref
}: DashboardWidgetProps) {

    const typeStyles = {
        default: 'border-slate-600 bg-slate-800',
        mystery: 'border-purple-500 bg-slate-900 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
        gold: 'border-amber-500 bg-amber-950/30',
        quest: 'border-blue-500 bg-slate-900',
    };

    const titleColors = {
        default: 'text-slate-300',
        mystery: 'text-purple-400',
        gold: 'text-amber-400',
        quest: 'text-blue-400',
    };

    return (
        <div className={`relative border-4 p-4 rounded-xl ${typeStyles[type]} transition-all hover:scale-[1.01]`}>
            {/* Header Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-white px-3 py-1 rounded shadow-md z-10">
                <span className={`text-[10px] font-pixel font-bold uppercase ${titleColors[type]}`}>
                    {title}
                </span>
            </div>

            {/* Content */}
            <div className="pt-2">
                {children}
            </div>

            {/* Action Buttom (Optional) */}
            {actionHref && (
                <div className="mt-4 flex justify-end">
                    <Link href={actionHref} className="
                        flex items-center gap-1 bg-white text-black 
                        px-3 py-1 text-[10px] font-bold uppercase rounded 
                        hover:bg-yellow-400 transition-colors
                    ">
                        {actionLabel || 'Ver'} <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            )}
        </div>
    );
}

// Sub-components for specific widgets
export function MysteryLootWidget({ daysLeft = 4 }) {
    return (
        <DashboardWidget title="Loot Misterioso" type="mystery" actionHref="#">
            <div className="flex flex-col items-center justify-center py-4 gap-3 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full"></div>

                <div className="text-6xl animate-bounce">🎁</div>

                <div className="bg-slate-950/80 px-4 py-2 rounded border border-purple-500/50 flex items-center gap-2">
                    <Lock className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-purple-200 font-pixel">
                        ABRE EM: <span className="text-yellow-400">{daysLeft}D 12H</span>
                    </span>
                </div>
            </div>
        </DashboardWidget>
    );
}

export function TreasuryWidget({ balance = 0 }) {
    return (
        <DashboardWidget title="Tesouraria" type="gold" actionHref="/player/game/shop" actionLabel="Gastar">
            <div className="flex flex-col items-center py-2">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                        <span className="text-lg">🪙</span>
                    </div>
                    <span className="text-2xl text-white font-pixel font-bold tracking-tight">
                        {balance.toLocaleString()}
                    </span>
                </div>
                <div className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/30">
                    +50 G Recente
                </div>
            </div>
        </DashboardWidget>
    );
}
