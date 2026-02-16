import { create } from 'zustand';
import { PlayerProfile, Item } from '@/types';

interface GameState {
    profile: PlayerProfile;
    addXp: (amount: number) => void;
    addGold: (amount: number) => void;
    levelUp: () => void;
    purchaseItem: (item: Item) => void;
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
    purchaseItem: (item) => set((state) => {
        if (state.profile.gold < 0) return state; // Check price in real logic
        return {
            profile: {
                ...state.profile,
                inventory: [...state.profile.inventory, item]
            }
        };
    })
}));
