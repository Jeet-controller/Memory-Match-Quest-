import React, { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useAudio } from '../contexts/AudioContext';

interface GameResultsProps {
  score: number;
  level: number;
  stars: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function GameResults({ 
  score, 
  level, 
  stars, 
  onPlayAgain, 
  onMainMenu 
}: GameResultsProps) {
  const { state } = useGame();
  const { playSound } = useAudio();
  const [showStars, setShowStars] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  useEffect(() => {
    // Check if this is a new best score
    if (score > state.stats.bestScore) {
      setIsNewBest(true);
      playSound('unlock');
      setTimeout(() => playSound('star'), 200);
      setTimeout(() => playSound('success'), 400);
    }

    // Animate stars
    setTimeout(() => {
      setShowStars(true);
      if (stars > 0) {
        playSound('star');
        setTimeout(() => playSound('star'), 150);
        setTimeout(() => playSound('star'), 300);
      }
    }, 300);
    
    // Victory sound
    playSound('success');
    setTimeout(() => playSound('success'), 400);
  }, [score, stars, state.stats.bestScore, playSound]);

  return (
    <div className="text-center space-y-4 p-4 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 backdrop-blur-lg rounded-3xl border-4 border-white shadow-2xl relative overflow-hidden min-h-[80vh] flex flex-col">
      {/* Simple celebration background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-2 left-2 text-4xl animate-bounce">🎉</div>
        <div className="absolute top-2 right-2 text-4xl animate-pulse">⭐</div>
        <div className="absolute bottom-2 left-2 text-4xl animate-spin">🌟</div>
        <div className="absolute bottom-2 right-2 text-4xl animate-bounce">🎊</div>
      </div>
      
      {/* PLAY AGAIN BUTTON - FIRST AND BIGGEST */}
      <div className="flex-shrink-0 mt-2">
        <button
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-black py-6 px-6 rounded-full transform hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xl border-4 border-yellow-300 flex items-center justify-center space-x-3 text-3xl animate-pulse relative"
          style={{
            boxShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)'
          }}
        >
          <span className="text-4xl animate-spin">🎮</span>
          <span>PLAY AGAIN!</span>
          <span className="text-4xl animate-bounce">🚀</span>
        </button>
      </div>

      {/* Quick celebration message */}
      <div className="flex-shrink-0">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 rounded-2xl font-black text-xl border-2 border-white animate-bounce">
          🎯 Level {level} Complete! 🎯
        </div>
        
        {isNewBest && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-black text-lg animate-pulse border-2 border-white mt-2">
            🏆 NEW BEST SCORE! 🏆
          </div>
        )}
      </div>

      {/* Essential stats only - compact */}
      <div className="flex-shrink-0 grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-3 border-2 border-white shadow-lg">
          <div className="text-3xl mb-1">🏆</div>
          <div className="text-2xl font-black text-white">{score}</div>
          <div className="text-white text-sm font-bold">Your Score</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-3 border-2 border-white shadow-lg">
          <div className="flex justify-center items-center mb-1">
            {showStars && Array.from({ length: Math.min(stars, 3) }, (_, i) => (
              <span
                key={i}
                className="text-2xl animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >⭐</span>
            ))}
            {!showStars && <span className="text-3xl">⭐</span>}
          </div>
          <div className="text-2xl font-black text-white">{stars}</div>
          <div className="text-white text-sm font-bold">Stars Earned</div>
        </div>
      </div>

      {/* Best score comparison - compact */}
      <div className="flex-shrink-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-3 border-2 border-white">
        <div className="flex justify-between items-center text-white">
          <span className="text-sm font-bold">🏆 Your Best:</span>
          <span className="font-black text-lg">{Math.max(score, state.stats.bestScore)}</span>
        </div>
      </div>

      {/* Spacer to push home button down */}
      <div className="flex-grow"></div>

      {/* Home button - small and at bottom */}
      <div className="flex-shrink-0">
        <button
          onClick={onMainMenu}
          className="w-1/2 mx-auto bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 text-white font-bold py-2 px-4 rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg border-2 border-white flex items-center justify-center space-x-2 text-sm opacity-70"
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </button>
      </div>
    </div>
  );
}