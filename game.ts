export interface GameState {
  currentLevel: number;
  score: number;
  stars: number;
  isPlaying: boolean;
  showingPattern: boolean;
  playerTurn: boolean;
  gamePattern: number[];
  playerPattern: number[];
  gridSize: number;
  patternSpeed: number;
  currentTheme: string;
  stats: PlayerStats;
  difficulty: 'easy' | 'normal' | 'hard' | 'auto';
}

export interface PlayerStats {
  totalGamesPlayed: number;
  bestScore: number;
  totalStars: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayDate: string | null;
  unlockedThemes: string[];
  achievements: string[];
}

export interface Theme {
  id: string;
  name: string;
  colors: string[];
  shapes: string[];
  bgGradient: string;
  unlockRequirement: number;
}

export type GameAction = 
  | { type: 'START_GAME' }
  | { type: 'SET_PATTERN'; payload: number[] }
  | { type: 'START_PLAYER_TURN' }
  | { type: 'ADD_PLAYER_INPUT'; payload: number }
  | { type: 'PATTERN_SUCCESS' }
  | { type: 'PATTERN_FAILED' }
  | { type: 'END_GAME' }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'UNLOCK_THEME'; payload: string }
  | { type: 'UPDATE_STATS'; payload: Partial<PlayerStats> }
  | { type: 'SET_DIFFICULTY'; payload: 'easy' | 'normal' | 'hard' | 'auto' };