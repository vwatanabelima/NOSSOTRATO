"use client";

import { Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 font-pixel">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden text-white p-2 hover:bg-slate-800 rounded-md"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-sm md:text-lg text-yellow-400 tracking-wide uppercase">Painel de Controle</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-xs text-slate-300 uppercase">Mestre do Jogo</span>
                    <span className="text-[10px] text-slate-500">Admin</span>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg border-2 border-purple-400 flex items-center justify-center shadow-lg">
                    <span className="text-lg">👑</span>
                </div>
            </div>
        </header>
    );
}
