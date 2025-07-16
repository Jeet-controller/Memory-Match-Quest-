import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Star, Trophy } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useAudio } from '../contexts/AudioContext';
import GameGrid from './GameGrid';
import PatternDisplay from './PatternDisplay';
import GameResults from './GameResults';

interface GameScreenProps {
  onBack: () => void;
}

export default function GameScreen({ onBack }: GameScreenProps) {
  const { state, dispatch } = useGame();
  const { playSound } = useAudio();
  const [showResults, setShowResults] = useState(false);
  const [showingIndex, setShowingIndex] = useState(-1);

  const generatePattern = useCallback(() => {
    const gridCells = state.gridSize * state.gridSize;
    const patternLength = Math.min(state.currentLevel + 1, gridCells);
    const newPattern = Array.from({ length: patternLength }, () => 
      Math.floor(Math.random() * gridCells)
    );
    dispatch({ type: 'SET_PATTERN', payload: newPattern });
  }, [state.gridSize, state.currentLevel, dispatch]);

  const showPattern = useCallback(async () => {
    for (let i = 0; i < state.gamePattern.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setShowingIndex(state.gamePattern[i]);
      playSound('tap');
      await new Promise(resolve => setTimeout(resolve, state.patternSpeed));
      setShowingIndex(-1);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    dispatch({ type: 'START_PLAYER_TURN' });
  }, [state.gamePattern, state.patternSpeed, dispatch, playSound]);

  const handleCellClick = useCallback((index: number) => {
    if (!state.playerTurn) return;

    playSound('tap');
    dispatch({ type: 'ADD_PLAYER_INPUT', payload: index });

    const newPlayerPattern = [...state.playerPattern, index];
    const currentIndex = newPlayerPattern.length - 1;

    // Check if the current input is correct
    if (newPlayerPattern[currentIndex] !== state.gamePattern[currentIndex]) {
      // Wrong input
      playSound('error');
      setTimeout(() => {
        dispatch({ type: 'PATTERN_FAILED' });
        setShowResults(true);
      }, 500);
      return;
    }

    // Check if pattern is complete
    if (newPlayerPattern.length === state.gamePattern.length) {
      // Success!
      playSound('success');
      playSound('star');
      setTimeout(() => {
        dispatch({ type: 'PATTERN_SUCCESS' });
        generatePattern();
      }, 800);
    }
  }, [state.playerTurn, state.playerPattern, state.gamePattern, dispatch, playSound, generatePattern]);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
    setShowResults(false);
    generatePattern();
  }, [dispatch, generatePattern]);

  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
    setShowResults(true);
  }, [dispatch]);

  // Start showing pattern when it's set
  useEffect(() => {
    if (state.showingPattern && state.gamePattern.length > 0) {
      showPattern();
    }
  }, [state.showingPattern, showPattern]);

  // Generate first pattern when game starts
  useEffect(() => {
    if (state.isPlaying && state.gamePattern.length === 0) {
      generatePattern();
    }
  }, [state.isPlaying, state.gamePattern.length, generatePattern]);

  if (showResults) {
    return (
      <GameResults
        score={state.score}
        level={state.currentLevel}
        stars={state.stars}
        onPlayAgain={startGame}
        onMainMenu={onBack}
      />
    );
  }

  if (!state.isPlaying) {
    return (
      <div className="text-center space-y-8 p-8 bg-white/90 backdrop-blur-lg rounded-3xl border-4 border-green-400 shadow-2xl relative">
        {/* Fun decorative elements */}
        <div className="absolute top-2 left-2 text-3xl animate-bounce">🎯</div>
        <div className="absolute top-2 right-2 text-3xl animate-pulse">🧠</div>
        
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full border-2 border-white shadow-lg transform hover:scale-110 transition-all"
        >
          <span className="text-xl">🏠</span>
        </button>

        <div className="space-y-4">
          <h2 className="text-4xl font-black text-green-600">Ready to Play?</h2>
          <div className="bg-yellow-300 rounded-2xl p-4 border-4 border-orange-400">
            <p className="text-purple-600 text-xl font-black">
              🎯 WATCH the colors light up!
            </p>
            <p className="text-purple-600 text-xl font-black">
              👆 Then TAP them in the same order!
            </p>
          </div>
          
          <div className="bg-blue-300 rounded-2xl p-4 border-4 border-blue-500">
            <p className="text-blue-800 text-lg font-bold">
              🌟 Get it right = STARS! 🌟
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-pink-300 to-purple-400 rounded-2xl p-4 border-4 border-white">
            <div className="flex items-center justify-center space-x-6 text-white">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-lg font-bold">Best Score</div>
                <div className="text-2xl font-black">{state.stats.bestScore}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-lg font-bold">Total Stars</div>
                <div className="text-2xl font-black">{state.stats.totalStars}</div>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-black py-8 px-8 rounded-3xl transform hover:scale-115 active:scale-95 transition-all duration-200 shadow-2xl border-6 border-yellow-300 text-4xl animate-bounce"
            style={{
              boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 0 80px rgba(255, 0, 0, 0.5), inset 0 0 25px rgba(255, 255, 255, 0.3)'
            }}
          >
            🚀 START GAME! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white/90 backdrop-blur-lg rounded-3xl border-4 border-blue-400 shadow-2xl relative">
      {/* Fun decorative elements */}
      <div className="absolute top-2 left-2 text-2xl animate-spin">⚡</div>
      <div className="absolute top-2 right-2 text-2xl animate-bounce">🎯</div>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={endGame}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full border-2 border-white shadow-lg transform hover:scale-110 transition-all"
        >
          <span className="text-xl">🏠</span>
        </button>
        
        <div className="text-center">
          <div className="bg-purple-500 text-white text-xl font-black px-4 py-2 rounded-2xl border-2 border-white">
            🎯 Level {state.currentLevel}
          </div>
          <div className="bg-orange-500 text-white text-lg font-bold px-3 py-1 rounded-xl border-2 border-white mt-1">
            Score: {state.score}
          </div>
        </div>

        <div className="bg-yellow-400 text-yellow-900 px-3 py-2 rounded-2xl border-2 border-white shadow-lg">
          <div className="flex items-center space-x-1">
            <span className="text-xl">⭐</span>
            <span className="font-black text-lg">{state.stars}</span>
          </div>
        </div>
      </div>

      {/* Game Status */}
      <PatternDisplay
        isShowing={state.showingPattern}
        isPlayerTurn={state.playerTurn}
        patternLength={state.gamePattern.length}
      />

      {/* Game Grid */}
      <GameGrid
        gridSize={state.gridSize}
        onCellClick={handleCellClick}
        highlightedCell={showingIndex}
        disabled={!state.playerTurn}
        theme={state.currentTheme}
      />

      {/* Encouragement */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-3 border-2 border-white">
          <p className="text-white text-lg font-black">
            {state.showingPattern && "👀 WATCH CAREFULLY! 👀"}
            {state.playerTurn && "👆 YOUR TURN! TAP THE PATTERN! 👆"}
            {!state.showingPattern && !state.playerTurn && "🎯 GET READY... 🎯"}
          </p>
        </div>
      </div>
    </div>
  );
}