"use strict";
"use client";

import { usePlayerQuests } from '@/hooks/usePlayerQuests';
import { PixelCard } from '@/components/ui/rpg/PixelCard';
import { PixelButton } from '@/components/ui/rpg/PixelButton';
import { Loader2 } from 'lucide-react';
import { useSupabaseBalance } from '@/hooks/useSupabaseBalance';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function PlayerGamePage() {
    const { quests, loading, submitQuest } = usePlayerQuests();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUserId(data.user?.id || null);
        });
    }, []);

    useSupabaseBalance(userId || '');

    return (
        <div className="space-y-8 font-pixel pb-24">
            <div className="text-center mt-8">
                <h1 className="text-2xl text-yellow-400 mb-2">DIÁRIO DE MISSÕES</h1>
                <p className="text-xs text-gray-400">MISSÕES DISPONÍVEIS</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                </div>
            ) : quests.length === 0 ? (
                <div className="text-center p-12 bg-slate-800 border-4 border-slate-600">
                    <p className="text-gray-500 text-xs">SEM MISSÕES NO MOMENTO.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {quests.map((quest) => (
                        <PixelCard key={quest.id} className="relative group">
                            {quest.status === 'PENDING' && (
                                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] px-2 py-1 border border-white z-10">
                                    PENDENTE
                                </div>
                            )}
                            {quest.status === 'APPROVED' && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-1 border border-white z-10">
                                    CONCLUÍDA
                                </div>
                            )}

                            <h3 className="text-yellow-400 text-sm mb-2 uppercase">{quest.title}</h3>
                            <p className="text-[10px] text-gray-300 mb-4">{quest.description}</p>

                            <div className="flex justify-between items-end">
                                <div className="flex gap-2">
                                    <span className="text-blue-300 text-[10px]">+ {quest.xp_reward} XP</span>
                                    <span className="text-yellow-300 text-[10px]">+ {quest.gold_reward} G</span>
                                </div>

                                {!quest.status && (
                                    <PixelButton onClick={() => submitQuest(quest.id)} variant="primary">
                                        ACEITAR & FAZER
                                    </PixelButton>
                                )}
                            </div>
                        </PixelCard>
                    ))}
                </div>
            )}
        </div>
    );
}
