"use strict";
"use client";

import { useMissions } from '@/hooks/useMissions';
import { CreateMissionDialog } from '@/components/admin/CreateMissionDialog';
import { Loader2, Trash2, ScrollText, Coins, Star } from 'lucide-react';

export default function MissionsPage() {
    const { missions, loading, createMission, deleteMission } = useMissions();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-yellow-500 font-pixel uppercase tracking-wide">Quadro de Missões</h2>
                    <p className="text-slate-400 text-sm">Crie tarefas e desafios para os jogadores.</p>
                </div>
                <CreateMissionDialog onCreate={createMission} />
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : missions.length === 0 ? (
                <div className="text-center p-12 bg-slate-900 border-2 border-dashed border-slate-700 rounded-lg">
                    <ScrollText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 font-pixel text-sm">Nenhuma missão encontrada.</p>
                    <p className="text-slate-600 text-xs mt-1">Crie a primeira missão para começar a aventura!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {missions.map((mission) => (
                        <div key={mission.id} className="bg-slate-900 border-2 border-slate-700 rounded-lg p-5 shadow-lg relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold text-slate-200 font-pixel leading-tight">{mission.title}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (confirm('Tem certeza que deseja deletar esta missão?')) {
                                                deleteMission(mission.id);
                                            }
                                        }}
                                        className="text-slate-600 hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded p-3 mb-4 min-h-[60px]">
                                <p className="text-sm text-slate-400 line-clamp-3">{mission.description}</p>
                            </div>

                            <div className="flex justify-between items-center text-xs font-mono">
                                <span className="flex items-center gap-1 text-blue-400 bg-blue-900/20 px-2 py-1 rounded border border-blue-900/50">
                                    <Star className="w-3 h-3" /> {mission.xp_reward} XP
                                </span>
                                <span className="flex items-center gap-1 text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded border border-yellow-900/50">
                                    <Coins className="w-3 h-3" /> {mission.gold_reward} Ouro
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
