
"use client";

import { PixelCard } from '@/components/ui/rpg/PixelCard';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock data for now, or fetch from Supabase if table exists
const MOCK_ITEMS = [
    { id: 1, name: 'Poção de XP', description: 'Aumenta 50 XP', image: '🧪', type: 'CONSUMABLE' },
    { id: 2, name: 'Escudo de Madeira', description: 'Proteção básica', image: '🛡️', type: 'EQUIPMENT' },
    { id: 3, name: 'Espada de Brinquedo', description: 'Dano leve', image: '⚔️', type: 'EQUIPMENT' },
];

export default function InventoryPage() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            setItems(MOCK_ITEMS);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="space-y-8 font-pixel pb-24">
            <div className="text-center mt-8">
                <h1 className="text-2xl text-yellow-400 mb-2">MOCHILA</h1>
                <p className="text-xs text-gray-400">SEUS ITENS</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                </div>
            ) : items.length === 0 ? (
                <div className="text-center p-12 bg-slate-800 border-4 border-slate-600">
                    <p className="text-gray-500 text-xs">MOCHILA VAZIA.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item) => (
                        <PixelCard key={item.id} className="relative group text-center p-4">
                            <div className="text-4xl mb-2">{item.image}</div>
                            <h3 className="text-yellow-400 text-[10px] mb-1 uppercase">{item.name}</h3>
                            <p className="text-[8px] text-gray-300">{item.description}</p>
                        </PixelCard>
                    ))}
                </div>
            )}
        </div>
    );
}
