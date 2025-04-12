
export type ActivityType = 'sleep' | 'gaming' | 'work' | 'idle';

export interface CharacterStats {
  sleepiness: number;
  stress: number;
  experience: number;
  sanity: number;
  money: number;
  level: number;
  xpPerLevel: number;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  position: {
    x: number;
    y: number;
  };
  isRepeatable?: boolean;
  effects: Partial<CharacterStats>; // Effects on character stats
}

export interface CharacterPosition {
  x: number;
  y: number;
}

export interface GameState {
  stats: CharacterStats;
  characterActivity: ActivityType;
  characterPosition: CharacterPosition;
  purchasedItems: ShopItem[];
  isGameOver: boolean;
  canvasBackground: string; // URL to the background image
}
