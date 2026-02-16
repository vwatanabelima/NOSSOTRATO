"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from 'next/link';
import { User, Users } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'parent' | 'player'>('parent');

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const role = activeTab === 'parent' ? 'ADMIN' : 'PLAYER';

            // Prepare metadata
            const metadata: any = {
                full_name: name,
                role: role,
            };

            if (activeTab === 'player') {
                if (!inviteCode) {
                    toast.error("Por favor, insira o código de convite.");
                    setLoading(false);
                    return;
                }
                metadata.invite_code = inviteCode;
            }

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata,
                },
            });

            if (error) {
                toast.error("Erro no cadastro: " + error.message);
                return;
            }

            if (data.user) {
                toast.success("Conta criada com sucesso! Redirecionando...");
                // Small delay to allow trigger to run
                setTimeout(() => {
                    if (role === 'ADMIN') {
                        router.push('/admin/dashboard');
                    } else {
                        router.push('/player/game');
                    }
                }, 1500);
            }

        } catch (err) {
            console.error(err);
            toast.error("Erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-200">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Criar Nova Conta</h1>
                    <p className="text-sm text-slate-500">Comece sua jornada no Nosso Trato</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setActiveTab('parent')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'parent'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        Sou Responsável
                    </button>
                    <button
                        onClick={() => setActiveTab('player')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'player'
                            ? 'bg-white text-green-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <User className="w-4 h-4" />
                        Sou Jogador
                    </button>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nome Completo</label>
                        <Input
                            type="text"
                            placeholder={activeTab === 'parent' ? "Seu nome" : "Nome do Herói"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <Input
                            type="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Senha</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1"
                        />
                    </div>

                    {activeTab === 'player' && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-medium text-slate-700">Código de Convite</label>
                            <Input
                                type="text"
                                placeholder="Peça ao seu responsável (ex: A1B2C3)"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                required={activeTab === 'player'}
                                className="mt-1 border-dashed border-2 border-green-300 bg-green-50"
                            />
                            <p className="text-xs text-slate-400 mt-1">O código é gerado no painel do responsável.</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className={`w-full mt-4 ${activeTab === 'parent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Criando..." : (activeTab === 'parent' ? "Criar Família" : "Entrar na Família")}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-slate-500">Já tem uma conta? </span>
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        Fazer Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
