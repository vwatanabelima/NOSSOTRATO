"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ScrollText, Gift, Users, LogOut, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SidebarProps {
    className?: string;
    onClose?: () => void;
}

export function Sidebar({ className = "", onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        toast.success('Logout realizado');
    };

    const menuItems = [
        { href: '/admin/dashboard', label: 'Painel', icon: LayoutDashboard },
        { href: '/admin/dashboard/missions', label: 'Missões', icon: ScrollText },
        { href: '/admin/dashboard/rewards', label: 'Recompensas', icon: Gift },
        { href: '/admin/dashboard/family', label: 'Família', icon: Users },
    ];

    return (
        <aside className={`w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-700 font-pixel ${className}`}>
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-yellow-400 tracking-wider">GAME MASTER</h2>
                {onClose && (
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border border-transparent ${isActive
                                    ? 'bg-purple-900 border-purple-500 text-white shadow-[0px_0px_10px_rgba(168,85,247,0.5)]'
                                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs uppercase">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-colors text-slate-400"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-xs uppercase">Sair</span>
                </button>
            </div>
        </aside>
    );
}
