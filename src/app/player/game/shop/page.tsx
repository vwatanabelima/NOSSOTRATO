
"use client";

import { PixelCard } from '@/components/ui/rpg/PixelCard';
import { PixelButton } from '@/components/ui/rpg/PixelButton';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Mock shop items
const SHOP_ITEMS = [
    { id: 1, name: 'Vale 1 Hora de TV', price: 100, image: '📺' },
    { id: 2, name: 'Sorvete Extra', price: 50, image: '🍦' },
    { id: 3, name: 'Dormir Tarde', price: 200, image: '🌙' },
];

export default function ShopPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const handleBuy = (itemName: string, price: number) => {
        // Here we would implement the purchase logic (check balance, deduct gold, add item/request)
        toast.info(`Tentando comprar: ${itemName} por ${price}G`);
    };

    return (
        <div className="space-y-8 font-pixel pb-24">
            <div className="text-center mt-8">
                <h1 className="text-2xl text-yellow-400 mb-2">LOJA</h1>
                <p className="text-xs text-gray-400">GASTE SEU OURO</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                </div>
            ) : (
                <div className="grid gap-6">
                    {SHOP_ITEMS.map((item) => (
                        <PixelCard key={item.id} className="flex justify-between items-center p-4">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{item.image}</span>
                                <div>
                                    <h3 className="text-yellow-400 text-xs uppercase">{item.name}</h3>
                                    <span className="text-yellow-200 text-[10px]">{item.price} G</span>
                                </div>
                            </div>
                            <PixelButton onClick={() => handleBuy(item.name, item.price)} variant="primary" className="text-[10px] px-3 py-1">
                                COMPRAR
                            </PixelButton>
                        </PixelCard>
                    ))}
                </div>
            )}
        </div>
    );
}
