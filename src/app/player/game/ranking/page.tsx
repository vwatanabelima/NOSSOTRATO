
"use client";

import { PixelCard } from '@/components/ui/rpg/PixelCard';
import { Loader2, Trophy, Medal } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock ranking data
const RANKING_DATA = [
    { id: 1, name: 'Herói (Você)', xp: 1250, level: 5, avatar: '🦸' },
    { id: 2, name: 'Irmão', xp: 900, level: 3, avatar: '🦹' },
    { id: 3, name: 'Primo', xp: 450, level: 2, avatar: '🧙' },
];

export default function RankingPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 600);
    }, []);

    return (
        <div className="space-y-8 font-pixel pb-24">
            <div className="text-center mt-8">
                <h1 className="text-2xl text-yellow-400 mb-2">HALL DA FAMA</h1>
                <p className="text-xs text-gray-400">OS MAIORES HERÓIS</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                </div>
            ) : (
                <div className="space-y-4">
                    {RANKING_DATA.map((player, index) => (
                        <PixelCard key={player.id} className={`flex items-center p-4 ${index === 0 ? 'border-yellow-400' : ''}`}>
                            <div className="flex items-center justify-center w-8 h-8 mr-4 bg-slate-800 border-2 border-slate-600 rounded text-yellow-500 font-bold">
                                {index + 1}
                            </div>
                            <div className="text-2xl mr-4">{player.avatar}</div>
                            <div className="flex-1">
                                <h3 className={`text-sm uppercase ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                                    {player.name}
                                </h3>
                                <p className="text-[10px] text-gray-400">Lvl {player.level}</p>
                            </div>
                            <div className="text-blue-300 text-xs">
                                {player.xp} XP
                            </div>
                        </PixelCard>
                    ))}
                </div>
            )}
        </div>
    );
}
