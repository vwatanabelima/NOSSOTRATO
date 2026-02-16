
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useGameStore } from '@/store/gameStore';

export function useSupabaseBalance(userId: string) {
    const { addGold, profile } = useGameStore(); // Or updateProfile action if we had one
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        // 1. Initial Fetch
        const fetchBalance = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('gold_balance, current_xp, level')
                .eq('id', userId)
                .single();

            if (data && !error) {
                // Sync with local store (mocking the update via direct store manipulation for now)
                // ideally we'd dispatch an action like setProfile({ ...profile, ...data })
                useGameStore.setState((state) => ({
                    profile: {
                        ...state.profile,
                        gold: data.gold_balance,
                        currentXp: data.current_xp,
                        level: data.level
                    }
                }));
            }
            setLoading(false);
        };

        fetchBalance();

        // 2. Realtime Subscription
        const subscription = supabase
            .channel('balance-updates')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${userId}`,
                },
                (payload) => {
                    const newData = payload.new as { gold_balance: number; current_xp: number; level: number };
                    // Realtime update
                    useGameStore.setState((state) => ({
                        profile: {
                            ...state.profile,
                            gold: newData.gold_balance,
                            currentXp: newData.current_xp,
                            level: newData.level
                        }
                    }));
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [userId]);

    return { loading };
}
