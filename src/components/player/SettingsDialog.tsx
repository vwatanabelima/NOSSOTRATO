
"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { X, LogOut, Save, User, Lock, Camera } from 'lucide-react';
import { PixelButton } from '@/components/ui/rpg/PixelButton';
import { toast } from 'sonner';

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    profile: any;
    onUpdateProfile: (newProfile: any) => void;
}

export function SettingsDialog({ isOpen, onClose, profile, onUpdateProfile }: SettingsDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(profile?.name || '');
    const [password, setPassword] = useState('');

    // Sync state with profile prop when it opens/changes
    // (In a real app, use useEffect or direct binding if strict sync needed)

    if (!isOpen) return null;

    const handleLogout = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error('Erro ao sair');
            setLoading(false);
        } else {
            router.push('/login');
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const updates: any = {};

            // 1. Update Password if provided
            if (password) {
                const { error: pwdError } = await supabase.auth.updateUser({ password });
                if (pwdError) throw pwdError;
                toast.success('Senha atualizada!');
            }

            // 2. Update Metadata (Name)
            // Assuming 'name' is stored in user_metadata for this simplified implementation
            // or a separate profile table. Based on previous HUD code using profile object, 
            // we'll update metadata for now or just the hook callback.
            if (name !== profile?.name) {
                const { error: metaError } = await supabase.auth.updateUser({
                    data: { name }
                });
                if (metaError) throw metaError;

                onUpdateProfile({ ...profile, name });
                toast.success('Perfil atualizado!');
            }

            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Erro ao salvar alterações');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-slate-900 border-4 border-slate-600 shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b-4 border-slate-700 bg-slate-800">
                    <h2 className="text-yellow-400 font-pixel text-xs tracking-widest uppercase flex items-center gap-2">
                        <span className="text-xl">⚙️</span> Configurações
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                    {/* Avatar Section (Placeholder functionality) */}
                    <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded border-2 border-slate-700 border-dashed">
                        <div className="w-16 h-16 bg-slate-800 rounded border-2 border-slate-600 flex items-center justify-center relative group cursor-pointer hover:border-yellow-400 transition-colors">
                            <User className="w-8 h-8 text-slate-500 group-hover:text-yellow-400" />
                            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center rounded">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-slate-400 mb-1">FOTO DE PERFIL</p>
                            <PixelButton variant="secondary" className="px-2 py-1 text-[8px] w-auto">
                                ALTERAR FOTO
                            </PixelButton>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-bold">Nome de Herói</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-950 border-2 border-slate-700 text-white text-xs py-3 pl-10 pr-3 focus:outline-none focus:border-yellow-400 font-pixel placeholder:text-slate-700"
                                    placeholder="Seu nome..."
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-bold">Nova Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950 border-2 border-slate-700 text-white text-xs py-3 pl-10 pr-3 focus:outline-none focus:border-yellow-400 font-pixel placeholder:text-slate-700"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t-4 border-slate-700 bg-slate-800 flex justify-between items-center">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[10px] text-red-400 hover:text-red-300 font-bold uppercase transition-colors px-2 py-1"
                        disabled={loading}
                    >
                        <LogOut className="w-4 h-4" />
                        Sair do Jogo
                    </button>

                    <div className="flex gap-2">
                        <PixelButton
                            onClick={onClose}
                            variant="secondary"
                            className="px-4 py-2 text-[10px]"
                            disabled={loading}
                        >
                            CANCELAR
                        </PixelButton>
                        <PixelButton
                            onClick={handleSave}
                            variant="primary"
                            className="px-4 py-2 text-[10px] flex gap-2 items-center"
                            disabled={loading}
                        >
                            {loading ? 'SALVANDO...' : <><Save className="w-4 h-4" /> SALVAR</>}
                        </PixelButton>
                    </div>
                </div>

            </div>
        </div>
    );
}
