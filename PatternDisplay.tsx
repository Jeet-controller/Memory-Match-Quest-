import React from 'react';
import { Eye, Hand } from 'lucide-react';

interface PatternDisplayProps {
  isShowing: boolean;
  isPlayerTurn: boolean;
  patternLength: number;
}

export default function PatternDisplay({ 
  isShowing, 
  isPlayerTurn, 
  patternLength 
}: PatternDisplayProps) {
  return (
    <div className="text-center bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl p-6 border-4 border-white shadow-xl">
      {isShowing && (
        <div className="flex items-center justify-center space-x-3 text-white">
          <span className="text-3xl animate-pulse">👀</span>
          <span className="text-2xl font-black">WATCH!</span>
          <div className="bg-yellow-400 text-yellow-900 px-3 py-2 rounded-full text-lg font-black border-2 border-white">
            {patternLength} steps
          </div>
        </div>
      )}
      
      {isPlayerTurn && (
        <div className="flex items-center justify-center space-x-3 text-white">
          <span className="text-3xl animate-bounce">👆</span>
          <span className="text-2xl font-black">YOUR TURN!</span>
          <div className="bg-green-400 text-green-900 px-3 py-2 rounded-full text-lg font-black border-2 border-white animate-pulse">
            TAP!
          </div>
        </div>
      )}
      
      {!isShowing && !isPlayerTurn && (
        <div className="flex items-center justify-center space-x-3 text-white">
          <div className="animate-spin text-3xl">⚡</div>
          <span className="text-2xl font-black">GET READY...</span>
        </div>
      )}
    </div>
  );
}