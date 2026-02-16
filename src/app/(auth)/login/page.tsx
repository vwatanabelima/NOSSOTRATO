"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                toast.error("Erro no login: " + authError.message);
                setLoading(false);
                return;
            }

            if (authData.user) {
                // Fetch User Profile to check Role
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', authData.user.id)
                    .single();

                if (profileError) {
                    toast.error("Erro ao carregar perfil: " + profileError.message);
                    setLoading(false);
                    return;
                }

                toast.success("Bem-vindo de volta!");

                if (profile?.role === 'ADMIN') {
                    router.refresh();
                    router.push('/admin/dashboard');
                } else {
                    router.refresh();
                    router.push('/player/game');
                }
            }
        } catch (err) {
            toast.error("Ocorreu um erro inesperado.");
            console.error(err);
        } finally {
            // setLoading(false); // Keep loading state during redirect
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <Input
                    type="password"
                    placeholder="******"
                    className="mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center text-sm text-gray-500 my-4">OU</div>

            <div className="text-center space-y-2">
                <p className="text-xs text-slate-500">
                    Não tem uma conta?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-bold">
                        Criar Nova Conta
                    </Link>
                </p>
            </div>
        </form>
    );
}
