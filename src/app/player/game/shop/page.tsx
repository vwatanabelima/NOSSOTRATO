
"use client";

import { PixelCard } from '@/components/ui/rpg/PixelCard';
import { PixelButton } from '@/components/ui/rpg/PixelButton';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Mock shop items (Fallback)
const SHOP_ITEMS = [
    { id: 1, name: 'Vale 1 Hora de TV', price: 100, image: '📺' },
    { id: 2, name: 'Sorvete Extra', price: 50, image: '🍦' },
    { id: 3, name: 'Dormir Tarde', price: 200, image: '🌙' },
];

export default function ShopPage() {
    const [loading, setLoading] = useState(true);
    const [rewards, setRewards] = useState<any[]>([]);

    useEffect(() => {
        const fetchRewards = async () => {
            // Fetch rewards from DB
            const { data } = await supabase.from('rewards').select('*').order('cost', { ascending: true });
            if (data) setRewards(data);

            // If no rewards in DB, fall back to mock or empty
            if (!data || data.length === 0) {
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
        toast.loading('Processando compra...');

        try {
            const { data, error } = await supabase.rpc('purchase_reward', {
                p_reward_id: reward.id
            });

            if (error) {
                console.error(error);
                toast.dismiss();
                toast.error('Erro na compra: ' + error.message);
                return;
            }

            toast.dismiss();
            if (data.success) {
                toast.success(data.message);
                // Optionally update local balance state here if not using a global store subscription
            } else {
                toast.error(data.message);
            }

        } catch (err) {
            console.error(err);
            toast.dismiss();
            toast.error('Erro de conexão ao comprar.');
        }
    };

    return (
        <div className="space-y-8 font-pixel pb-24">
            <div className="text-center mt-8">
                <h1 className="text-2xl text-yellow-400 mb-2">LOJA</h1>
                <p className="text-xs text-slate-400">GASTE SEU OURO</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                </div>
            ) : (
                <div className="grid gap-6">
                    {rewards.map((item) => (
                        <PixelCard key={item.id} className="flex justify-between items-center p-4">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{item.image_url || '🎁'}</span>
                                <div>
                                    <h3 className="text-yellow-400 text-xs uppercase">{item.title}</h3>
                                    <span className="text-yellow-200 text-[10px]">{item.cost} G</span>
                                </div>
                            </div>
                            <PixelButton onClick={() => handleBuy(item)} variant="primary" className="text-[10px] px-3 py-1">
                                COMPRAR
                            </PixelButton>
                        </PixelCard>
                    ))}
                </div>
            )}
        </div>
    );
}
