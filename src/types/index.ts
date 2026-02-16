export type Role = 'ADMIN' | 'PLAYER';

export interface Task {
  id: string;
  title: string;
  description?: string;
  xpReward: number;
  goldReward: number;
  status: 'PENDING' | 'COMPLETED' | 'APPROVED' | 'REJECTED';
  proofUrl?: string;
  assignedTo: string; // Player ID
  verificationRequired: boolean;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  imageUrl?: string;
  stock?: number;
}

export interface Item {
  id: string;
  name: string;
  type: 'CONSUMABLE' | 'EQUIPMENT' | 'COLLECTIBLE';
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  imageUrl: string;
}

export interface PlayerProfile {
  id: string;
  name: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  maxXp: number;
  gold: number;
  streak: number;
  inventory: Item[];
  activeQuests: Task[];
}
