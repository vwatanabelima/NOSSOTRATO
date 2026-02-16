"use client";

import { usePlayerQuests } from '@/hooks/usePlayerQuests';
import { useSupabaseBalance } from '@/hooks/useSupabaseBalance';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Loader2, ScrollText, CheckCircle2 } from 'lucide-react';
import { MysteryLootWidget, TreasuryWidget } from '@/components/ui/rpg/DashboardWidgets';
import { PixelButton } from '@/components/ui/rpg/PixelButton';

export default function PlayerGamePage() {
    const { quests, loading, submitQuest } = usePlayerQuests();
    const [userId, setUserId] = useState<string | null>(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUserId(data.user.id);
            }
        });
    }, []);

    // Hooks need to interact properly to get real balance
    // For now, let's assume the widgets handle display or we need to fetch
    useSupabaseBalance(userId || '');

    return (
        <div className="space-y-8 font-pixel pb-32 pt-4 px-4 max-w-lg mx-auto">
            {/* 1. Mystery Loot Section (Highlight) */}
            <MysteryLootWidget />

            {/* 2. Treasury Section */}
            <TreasuryWidget balance={balance} />

            {/* 4. Active Quests Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-slate-700 pb-2">
                    <h2 className="text-yellow-400 text-sm flex items-center gap-2">
                        <ScrollText className="w-4 h-4" />
                        MISSÕES ATIVAS
                    </h2>
                    <span className="text-[10px] text-slate-500">{quests.length} Disp.</span>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                    </div>
                ) : quests.length === 0 ? (
                    <div className="text-center p-8 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
                        <p className="text-gray-500 text-xs uppercase">Sem missões no momento.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {quests.map((quest) => (
                            <div
                                key={quest.id}
                                className="bg-slate-800 border-l-4 border-l-blue-500 p-4 rounded shadow-sm relative overflow-hidden"
                            >
                                {/* Status Badge */}
                                {quest.status === 'PENDING' && (
                                    <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-400 text-[8px] px-2 py-1 rounded-bl">
                                        EM ANÁLISE
                                    </div>
                                )}
                                {quest.status === 'APPROVED' && (
                                    <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[8px] px-2 py-1 rounded-bl flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> FEITO
                                    </div>
                                )}

                                <h3 className="text-white text-xs mb-1 uppercase tracking-wide pr-16 bg-slate-900/50 p-1 rounded inline-block">
                                    {quest.title}
                                </h3>
                                <p className="text-slate-400 text-[10px] mb-3 leading-relaxed">
                                    {quest.description}
                                </p>

                                <div className="flex justify-between items-center mt-3 border-t border-slate-700/50 pt-2">
                                    <div className="flex gap-3 text-[10px]">
                                        <span className="text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/50">
                                            {quest.gold_reward} Ouro
                                        </span>
                                        <span className="text-blue-400 font-bold bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/50">
                                            {quest.xp_reward} XP
                                        </span>
                                    </div>

                                    {!quest.status && (
                                        <PixelButton
                                            onClick={() => submitQuest(quest.id)}
                                            variant="primary"
                                            className="px-3 py-1 text-[8px] shadow-[0px_3px_0px_#1e3a8a] active:shadow-none"
                                        >
                                            CONCLUIR
                                        </PixelButton>
                                    )}
                                    {quest.status === 'PENDING' && (
                                        <span className="text-[9px] text-yellow-500 font-pixel animate-pulse">AGUARDANDO...</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
