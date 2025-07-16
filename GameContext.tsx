import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, GameAction, PlayerStats, Theme } from '../types/game';
import { THEMES } from '../data/themes';

const initialStats: PlayerStats = {
  totalGamesPlayed: 0,
  bestScore: 0,
  totalStars: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPlayDate: null,
  unlockedThemes: ['classic'],
  achievements: []
};

const initialState: GameState = {
  currentLevel: 1,
  score: 0,
  stars: 0,
  isPlaying: false,
  showingPattern: false,
  playerTurn: false,
  gamePattern: [],
  playerPattern: [],
  gridSize: 2,
  patternSpeed: 1000,
  currentTheme: 'classic',
  stats: initialStats,
  difficulty: 'auto'
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        currentLevel: 1,
        score: 0,
        stars: 0,
        gamePattern: [],
        playerPattern: [],
        gridSize: 2,
        showingPattern: false,
        playerTurn: false
      };

    case 'SET_PATTERN':
      return {
        ...state,
        gamePattern: action.payload,
        playerPattern: [],
        showingPattern: true,
        playerTurn: false
      };

    case 'START_PLAYER_TURN':
      return {
        ...state,
        showingPattern: false,
        playerTurn: true
      };

    case 'ADD_PLAYER_INPUT':
      return {
        ...state,
        playerPattern: [...state.playerPattern, action.payload]
      };

    case 'PATTERN_SUCCESS':
      const newLevel = state.currentLevel + 1;
      const newScore = state.score + (state.currentLevel * 10);
      const newStars = state.stars + Math.ceil(state.currentLevel / 2);
      
      return {
        ...state,
        currentLevel: newLevel,
        score: newScore,
        stars: newStars,
        playerPattern: [],
        gridSize: Math.min(4, Math.floor((newLevel - 1) / 3) + 2)
      };

    case 'PATTERN_FAILED':
      return {
        ...state,
        playerPattern: []
      };

    case 'END_GAME':
      const updatedStats = {
        ...state.stats,
        totalGamesPlayed: state.stats.totalGamesPlayed + 1,
        bestScore: Math.max(state.stats.bestScore, state.score),
        totalStars: state.stats.totalStars + state.stars,
        lastPlayDate: new Date().toISOString()
      };
      
      return {
        ...state,
        isPlaying: false,
        showingPattern: false,
        playerTurn: false,
        stats: updatedStats
      };

    case 'SET_THEME':
      return {
        ...state,
        currentTheme: action.payload
      };

    case 'UNLOCK_THEME':
      if (!state.stats.unlockedThemes.includes(action.payload)) {
        return {
          ...state,
          stats: {
            ...state.stats,
            unlockedThemes: [...state.stats.unlockedThemes, action.payload]
          }
        };
      }
      return state;

    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      };

    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload
      };

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load saved game data on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('memoryMatchQuest_stats');
    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        dispatch({ type: 'UPDATE_STATS', payload: stats });
      } catch (error) {
        console.error('Failed to load saved stats:', error);
      }
    }
  }, []);

  // Save game data whenever stats change
  useEffect(() => {
    localStorage.setItem('memoryMatchQuest_stats', JSON.stringify(state.stats));
  }, [state.stats]);

  // Check for theme unlocks based on stars
  useEffect(() => {
    const { totalStars } = state.stats;
    
    if (totalStars >= 50 && !state.stats.unlockedThemes.includes('space')) {
      dispatch({ type: 'UNLOCK_THEME', payload: 'space' });
    }
    if (totalStars >= 100 && !state.stats.unlockedThemes.includes('jungle')) {
      dispatch({ type: 'UNLOCK_THEME', payload: 'jungle' });
    }
    if (totalStars >= 200 && !state.stats.unlockedThemes.includes('ocean')) {
      dispatch({ type: 'UNLOCK_THEME', payload: 'ocean' });
    }
  }, [state.stats.totalStars, state.stats.unlockedThemes]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}