import { Theme } from '../types/game';

export const THEMES: Record<string, Theme> = {
  classic: {
    id: 'classic',
    name: 'Classic Shapes',
    colors: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400', 'bg-purple-500', 'bg-pink-500'],
    shapes: ['🔴', '🔵', '🟢', '🟡', '🟣', '🩷'],
    bgGradient: 'from-yellow-300 via-pink-400 to-purple-500',
    unlockRequirement: 0
  },
  space: {
    id: 'space',
    name: 'Space Adventure',
    colors: ['bg-indigo-600', 'bg-purple-600', 'bg-blue-600', 'bg-cyan-500', 'bg-pink-500', 'bg-orange-500'],
    shapes: ['🚀', '⭐', '🌙', '🛸', '🪐', '☄️'],
    bgGradient: 'from-indigo-600 via-purple-600 to-blue-800',
    unlockRequirement: 50
  },
  jungle: {
    id: 'jungle',
    name: 'Jungle Friends',
    colors: ['bg-green-600', 'bg-emerald-500', 'bg-lime-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'],
    shapes: ['🐸', '🦋', '🌺', '🍃', '🐒', '🦜'],
    bgGradient: 'from-green-500 via-emerald-400 to-lime-300',
    unlockRequirement: 100
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean World',
    colors: ['bg-blue-600', 'bg-cyan-500', 'bg-teal-500', 'bg-blue-400', 'bg-indigo-500', 'bg-purple-500'],
    shapes: ['🐠', '🐙', '🦀', '🐚', '🌊', '⭐'],
    bgGradient: 'from-blue-500 via-cyan-400 to-teal-300',
    unlockRequirement: 200
  }
};