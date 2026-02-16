"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Check, X, ExternalLink, ScrollText } from 'lucide-react';

interface Submission {
    id: string;
    mission_title: string;
    player_name: string;
    proof_url: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export function PendingSubmissionsList({ initialSubmissions }: { initialSubmissions: Submission[] }) {
    const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

    const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        const { error } = await supabase
            .from('submissions')
            .update({ status, reviewed_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            toast.error('Erro ao atualizar: ' + error.message);
        } else {
            const action = status === 'APPROVED' ? 'aprovada' : 'rejeitada';
            toast.success(`Missão ${action}!`);
            setSubmissions(prev => prev.filter(s => s.id !== id));
        }
    };

    if (submissions.length === 0) {
        return (
            <div className="bg-slate-900 border-2 border-slate-700 rounded-lg p-8 text-center shadow-md">
                <ScrollText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-slate-400 text-sm font-pixel uppercase">Sem aprovações pendentes</h3>
                <p className="text-slate-600 text-xs mt-1">Tudo limpo por aqui, Mestre.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden shadow-md">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700">
                <h3 className="text-yellow-500 text-sm font-pixel uppercase flex items-center gap-2">
                    <ScrollText className="w-4 h-4" />
                    Aprovações Pendentes ({submissions.length})
                </h3>
            </div>

            <div className="divide-y divide-slate-800">
                {submissions.map((sub) => (
                    <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                        <div>
                            <p className="font-bold text-slate-200 text-sm">{sub.mission_title}</p>
                            <p className="text-xs text-slate-400 mt-1">por <span className="text-purple-400">{sub.player_name}</span></p>
                            {sub.proof_url && (
                                <a
                                    href={sub.proof_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 mt-2 border border-blue-900/50 bg-blue-900/20 px-2 py-1 rounded"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    Ver Prova
                                </a>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleReview(sub.id, 'APPROVED')}
                                className="w-8 h-8 flex items-center justify-center bg-green-900/30 text-green-500 border border-green-900 hover:bg-green-500 hover:text-white rounded transition-all"
                                title="Aprovar"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleReview(sub.id, 'REJECTED')}
                                className="w-8 h-8 flex items-center justify-center bg-red-900/30 text-red-500 border border-red-900 hover:bg-red-500 hover:text-white rounded transition-all"
                                title="Rejeitar"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
