import React from 'react';
import { Play, Settings, Trophy, Star } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface MenuScreenProps {
  onNavigate: (screen: 'menu' | 'game' | 'settings' | 'stats') => void;
}

export default function MenuScreen({ onNavigate }: MenuScreenProps) {
  const { state } = useGame();

  return (
    <div className="text-center space-y-8 p-8 bg-white/90 backdrop-blur-lg rounded-3xl border-4 border-yellow-400 shadow-2xl relative overflow-hidden">
      {/* Fun decorative elements */}
      <div className="absolute top-2 left-2 text-3xl animate-spin">🌟</div>
      <div className="absolute top-2 right-2 text-3xl animate-bounce">🎮</div>
      
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-5xl font-black text-purple-600 drop-shadow-lg animate-pulse">
          Memory Match Quest
        </h1>
        <p className="text-purple-500 text-xl font-bold">
          🧠 Make your brain super strong! 🧠
        </p>
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 border-4 border-white shadow-lg transform hover:scale-105 transition-all">
          <div className="text-3xl font-black text-white">{state.stats.bestScore}</div>
          <div className="text-white text-lg font-bold">🏆 Best Score</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 border-4 border-white shadow-lg transform hover:scale-105 transition-all">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-3xl font-black text-white">{state.stats.totalStars}</span>
          </div>
          <div className="text-white text-lg font-bold">⭐ Stars</div>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => onNavigate('game')}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-black py-8 px-8 rounded-3xl transform hover:scale-115 active:scale-95 transition-all duration-200 shadow-2xl border-6 border-yellow-300 flex items-center justify-center space-x-4 text-3xl animate-pulse"
          style={{
            boxShadow: '0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)'
          }}
        >
          <span className="text-4xl">🎮</span>
          <span>LET'S PLAY!</span>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('stats')}
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-black py-4 px-4 rounded-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 shadow-xl border-4 border-white flex items-center justify-center space-x-2 text-lg"
          >
            <span className="text-2xl">🏆</span>
            <span>My Scores</span>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="bg-gradient-to-r from-indigo-400 to-purple-600 hover:from-indigo-500 hover:to-purple-700 text-white font-black py-4 px-4 rounded-2xl transform hover:scale-110 active:scale-95 transition-all duration-200 shadow-xl border-4 border-white flex items-center justify-center space-x-2 text-lg"
          >
            <span className="text-2xl">⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Daily Motivation */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 border-4 border-white shadow-lg">
        <p className="text-white text-xl font-black">
          🎯 Can you beat {state.stats.bestScore} points? 🎯
        </p>
        <p className="text-white text-lg font-bold mt-2">
          Every game makes you SMARTER! 🧠✨
        </p>
      </div>
    </div>
  );
}