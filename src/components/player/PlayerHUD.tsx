
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Settings } from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';

export function PlayerHUD() {
    const [profile, setProfile] = useState<any>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Fetch profile logic here if table exists, otherwise mock
                // For now using user metadata or mock
                setProfile({
                    name: user.user_metadata?.name || user.email?.split('@')[0] || 'Hero',
                    level: 1,
                    xp: 450,
                    maxXp: 1000,
                    class: 'Ranger'
                });
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = (newProfile: any) => {
        setProfile(newProfile);
    };

    const xpPercentage = profile ? Math.min((profile.xp / profile.maxXp) * 100, 100) : 0;

    return (
        <>
            <div className="sticky top-0 z-50 bg-slate-900 border-b-4 border-slate-700 p-4 font-pixel shadow-lg">
                <div className="container mx-auto">
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex items-center gap-4">
                            {/* Avatar Frame with Level Badge */}
                            <div className="relative w-14 h-14 bg-slate-800 border-4 border-slate-600 rounded-lg flex items-center justify-center shrink-0">
                                {/* Placeholder Avatar Image or Icon */}
                                <div className="w-full h-full bg-slate-700/50 flex items-center justify-center overflow-hidden rounded">
                                    <User className="w-8 h-8 text-slate-400" />
                                </div>

                                {/* Level Badge - Overlapping Bottom Left/Right based on style, sticking to reference 'LVL 9' style */}
                                <div className="absolute -bottom-2 -left-2 bg-yellow-500 text-black text-[10px] px-1.5 py-0.5 border-2 border-white font-bold rotate-[-5deg] shadow-sm z-10">
                                    NVL {profile?.level || 1}
                                </div>
                            </div>

                            {/* Name & Class */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h2 className="text-yellow-400 text-sm truncate uppercase tracking-widest font-bold drop-shadow-md">
                                    {profile?.name || 'HERO'}
                                </h2>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] text-slate-300 uppercase tracking-wide">
                                        {profile?.class || 'Ranger Class'}
                                    </span>
                                </div>
                            </div>

                            {/* Settings Button (Replaced Bell with Settings Gear) */}
                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                className="w-10 h-10 bg-slate-800 border-2 border-slate-600 rounded flex items-center justify-center shadow-lg hover:border-yellow-400 hover:text-yellow-400 text-slate-400 transition-all active:scale-95 group"
                            >
                                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        {/* Full Width XP Bar below header */}
                        <div className="w-full">
                            <div className="flex justify-between text-[8px] text-slate-400 mb-0.5 font-bold">
                                <span>XP</span>
                                <span>{profile ? `${profile.xp}/${profile.maxXp}` : '0/1000'}</span>
                            </div>
                            <div className="relative w-full h-3 bg-slate-950 border border-slate-700 rounded-sm overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                                    style={{ width: `${xpPercentage}%` }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SettingsDialog
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
            />
        </>
    );
}
