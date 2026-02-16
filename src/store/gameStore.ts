import { create } from 'zustand';
import { PlayerProfile, Item } from '@/types';

interface GameState {
    profile: PlayerProfile;
    addXp: (amount: number) => void;
    addGold: (amount: number) => void;
    levelUp: () => void;
    purchaseItem: (item: Item, cost: number) => Promise<{ success: boolean; message: string }>;
}

export const useGameStore = create<GameState>((set) => ({
    profile: {
        id: 'guest',
        name: 'Hero',
        avatarUrl: '/avatars/hero.png',
        level: 1,
        currentXp: 0,
        maxXp: 100,
        gold: 50,
        streak: 0,
        inventory: [],
        activeQuests: []
    },
    addXp: (amount) => set((state) => {
        const newXp = state.profile.currentXp + amount;
        if (newXp >= state.profile.maxXp) {
            // Logic for level up would go here or trigger a separate action
            return {
                profile: { ...state.profile, currentXp: newXp, level: state.profile.level + 1, maxXp: Math.floor(state.profile.maxXp * 1.5) }
            };
        }
        return { profile: { ...state.profile, currentXp: newXp } };
    }),
    addGold: (amount) => set((state) => ({
        profile: { ...state.profile, gold: state.profile.gold + amount }
    })),
    levelUp: () => set((state) => ({
        profile: { ...state.profile, level: state.profile.level + 1, maxXp: Math.floor(state.profile.maxXp * 1.5), currentXp: 0 }
    })),
    purchaseItem: async (item, cost) => {
        // This is a client-side only state update. 
        // Real transaction happens in the component via RPC.
        // We just update the local state to reflect the change immediately if needed.

        // In a real app with store sync, we'd call the API here. 
        // For now, we return success to satisfy the interface.
        set((state) => ({
            profile: {
                ...state.profile,
                gold: state.profile.gold - cost,
                inventory: [...state.profile.inventory, item]
            }
        }));
        return { success: true, message: 'Item purchased locally' };
    }
}));
