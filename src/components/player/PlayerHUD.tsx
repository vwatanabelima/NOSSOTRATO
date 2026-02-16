
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from 'lucide-react';

export function PlayerHUD() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Fetch profile logic here if table exists, otherwise mock
                // For now using user metadata or mock
                setProfile({
                    name: user.email?.split('@')[0] || 'Hero',
                    level: 1,
                    xp: 450,
                    maxXp: 1000,
                    class: 'Ranger'
                });
            }
        };
        fetchProfile();
    }, []);

    const xpPercentage = profile ? Math.min((profile.xp / profile.maxXp) * 100, 100) : 0;

    return (
        <div className="sticky top-0 z-50 bg-slate-900 border-b-4 border-slate-700 p-4 font-pixel shadow-lg">
            <div className="container mx-auto">
                <div className="flex items-center gap-4">
                    {/* Avatar Frame */}
                    <div className="relative w-16 h-16 bg-slate-800 border-4 border-slate-600 rounded-lg flex items-center justify-center shrink-0">
                        <User className="w-8 h-8 text-slate-400" />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-[10px] px-1.5 py-0.5 border-2 border-white font-bold rotate-[-5deg]">
                            LVL {profile?.level || 1}
                        </div>
                    </div>

                    {/* Stats & Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h2 className="text-yellow-400 text-sm truncate uppercase tracking-wide">
                                {profile?.name || 'Loading...'}
                            </h2>
                            <span className="text-[8px] text-green-400 uppercase tracking-wider">
                                {profile?.class || 'Novice'}
                            </span>
                        </div>

                        {/* XP Bar */}
                        <div className="relative w-full h-4 bg-slate-950 border-2 border-slate-700 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out"
                                style={{ width: `${xpPercentage}%` }}
                            >
                                {/* Shine effect */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white drop-shadow-md">
                                {profile ? `${profile.xp}/${profile.maxXp} XP` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
