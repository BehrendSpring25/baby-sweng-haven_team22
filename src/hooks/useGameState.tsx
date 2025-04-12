
import { useEffect, useReducer } from 'react';
import { ActivityType, CharacterPosition, CharacterStats, GameState, ShopItem } from '../types';

// Constants for game mechanics
const STAT_MAX = 100;
const STAT_MIN = 0;
const XP_PER_LEVEL = 100;
const TICK_INTERVAL = 1000; // 1 second

// Define how each activity affects stats per tick
const ACTIVITY_EFFECTS: Record<ActivityType, Partial<CharacterStats>> = {
  idle: {
    sleepiness: 0.2,
    stress: 0.1,
    sanity: -0.1
  },
  sleep: {
    sleepiness: -1,
    sanity: 0.2
  },
  gaming: {
    sleepiness: 0.1,
    stress: -0.8,
    sanity: 0.5
  },
  work: {
    sleepiness: 0.5,
    stress: 0.7,
    sanity: -0.4,
    experience: 0.8,
    money: 2
  }
};

// Initial game state
const initialState: GameState = {
  stats: {
    sleepiness: 20,
    stress: 20,
    experience: 0,
    sanity: 80,
    money: 10,
    level: 1
  },
  characterActivity: 'idle',
  characterPosition: { x: 50, y: 50 }, // Center of the screen
  purchasedItems: [],
  isGameOver: false
};

// Actions for the reducer
type GameAction =
  | { type: 'TICK' }
  | { type: 'SET_ACTIVITY'; activity: ActivityType }
  | { type: 'SET_POSITION'; position: CharacterPosition }
  | { type: 'BUY_ITEM'; item: ShopItem }
  | { type: 'RESTART' };

// Reducer function to handle state updates
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'TICK': {
      // If game is over, don't update stats
      if (state.isGameOver) return state;

      const effects = ACTIVITY_EFFECTS[state.characterActivity] || {};
      const newStats = { ...state.stats };
      
      // Apply activity effects to stats
      for (const [stat, value] of Object.entries(effects)) {
        if (stat in newStats) {
          newStats[stat as keyof CharacterStats] = Math.max(
            STAT_MIN,
            Math.min(
              STAT_MAX,
              newStats[stat as keyof CharacterStats] + (value as number)
            )
          );
        }
      }

      // Check if experience is enough to level up
      if (newStats.experience >= XP_PER_LEVEL) {
        newStats.level += 1;
        newStats.experience = 0;
      }

      // Check game over condition
      const isGameOver = newStats.sanity <= STAT_MIN;

      return {
        ...state,
        stats: newStats,
        isGameOver
      };
    }
    
    case 'SET_ACTIVITY':
      return {
        ...state,
        characterActivity: action.activity
      };
    
    case 'SET_POSITION':
      return {
        ...state,
        characterPosition: action.position
      };
    
    case 'BUY_ITEM': {
      const { item } = action;
      const newMoney = state.stats.money - item.price;
      
      // Check if user has enough money
      if (newMoney < 0) return state;
      
      return {
        ...state,
        stats: {
          ...state.stats,
          money: newMoney
        },
        purchasedItems: [...state.purchasedItems, item]
      };
    }
    
    case 'RESTART':
      return {
        ...initialState,
        purchasedItems: [] // Reset purchased items too
      };
    
    default:
      return state;
  }
};

export const useGameState = () => {
  // Try to load state from localStorage
  const loadState = (): GameState => {
    try {
      const savedState = localStorage.getItem('babySwengGameState');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Error loading game state from localStorage:', error);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(gameReducer, loadState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('babySwengGameState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game state to localStorage:', error);
    }
  }, [state]);

  // Set up game tick interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  // Helper functions
  const setActivity = (activity: ActivityType) => {
    dispatch({ type: 'SET_ACTIVITY', activity });
  };

  const setPosition = (position: CharacterPosition) => {
    dispatch({ type: 'SET_POSITION', position });
  };

  const buyItem = (item: ShopItem) => {
    dispatch({ type: 'BUY_ITEM', item });
  };

  const restartGame = () => {
    dispatch({ type: 'RESTART' });
  };

  return {
    state,
    setActivity,
    setPosition,
    buyItem,
    restartGame
  };
};
