"use client";

import { PixelCard } from '@/components/ui/rpg/PixelCard';
import { PixelButton } from '@/components/ui/rpg/PixelButton';
import { Loader2, Coins } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ShopPage() {
    const [loading, setLoading] = useState(true);
    const [rewards, setRewards] = useState<any[]>([]);

    useEffect(() => {
        const fetchRewards = async () => {
            // Fetch rewards from DB
            const { data } = await supabase.from('rewards').select('*').order('cost', { ascending: true });
            if (data && data.length > 0) {
                setRewards(data);
            } else {
                // Se não houver itens no banco, mostra fallback traduzido
                setRewards([
                    { id: '1', title: 'Vale 1 Hora de TV', cost: 100, image_url: '📺' },
                    { id: '2', title: 'Sorvete Extra', cost: 50, image_url: '🍦' },
                    { id: '3', title: 'Dormir Tarde', cost: 200, image_url: '🌙' },
                ]);
            }
            setLoading(false);
        };
        fetchRewards();
    }, []);

    const handleBuy = async (reward: any) => {
        const loadingToast = toast.loading('Processando compra...');

        try {
            // Chama a função RPC segura no banco de dados
            const { data, error } = await supabase.rpc('purchase_reward', {
                p_reward_id: reward.id
            });

            if (error) {
                console.error(error);
                toast.dismiss(loadingToast);
                toast.error('Erro na compra: ' + error.message);
                return;
            }

            toast.dismiss(loadingToast);

            if (data.success) {
                toast.success('Compra realizada com sucesso!');
                // Pequeno delay para atualizar a UI se necessário ou disparar confete
            } else {
                toast.error(data.message || 'Saldo insuficiente ou erro desconhecido.');
            }

        } catch (err) {
            console.error(err);
            toast.dismiss(loadingToast);
            toast.error('Erro de conexão ao comprar.');
        }
    };

    return (
        <div className="space-y-6 font-pixel pb-24 px-4">
            <div className="text-center mt-6 mb-8">
                <h1 className="text-2xl text-yellow-400 mb-2 uppercase tracking-wide drop-shadow-md">Mercador</h1>
                <p className="text-xs text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    <Coins className="w-3 h-3 text-yellow-500" />
                    Gaste seu Ouro com sabedoria
                    <Coins className="w-3 h-3 text-yellow-500" />
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                </div>
            ) : (
                <div className="grid gap-4">
                    {rewards.map((item) => (
                        <div key={item.id} className="bg-slate-900 border-2 border-slate-700 rounded-lg p-4 flex items-center justify-between shadow-md relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-slate-800 rounded border border-slate-600 flex items-center justify-center text-2xl shadow-inner">
                                    {item.image_url || '🎁'}
                                </div>
                                <div>
                                    <h3 className="text-yellow-400 text-sm uppercase tracking-wide">{item.title}</h3>
                                    <span className="text-yellow-600 text-xs font-mono flex items-center gap-1">
                                        <Coins className="w-3 h-3" />
                                        {item.cost} Ouro
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBuy(item)}
                                className="relative z-10 bg-green-600 hover:bg-green-500 text-white text-[10px] uppercase font-bold px-4 py-2 rounded shadow-[0px_4px_0px_#14532d] active:shadow-none active:translate-y-[4px] transition-all border-b-4 border-green-800 active:border-b-0"
                            >
                                Comprar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
