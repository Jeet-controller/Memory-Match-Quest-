import React, { useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, Palette, Zap } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useAudio } from '../contexts/AudioContext';
import { THEMES } from '../data/themes';

interface SettingsScreenProps {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { state, dispatch } = useGame();
  const { setMuted, isMuted } = useAudio();
  const [soundEnabled, setSoundEnabled] = useState(!isMuted);

  const handleSoundToggle = () => {
    const newMuted = !soundEnabled;
    setSoundEnabled(!newMuted);
    setMuted(newMuted);
  };

  const handleThemeChange = (themeId: string) => {
    if (state.stats.unlockedThemes.includes(themeId)) {
      dispatch({ type: 'SET_THEME', payload: themeId });
    }
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'normal' | 'hard' | 'auto') => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  };

  return (
    <div className="space-y-6 p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>

      {/* Sound Settings */}
      <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <span>Sound Effects</span>
        </h3>
        
        <button
          onClick={handleSoundToggle}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            soundEnabled
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          }`}
        >
          {soundEnabled ? 'Sound On' : 'Sound Off'}
        </button>
      </div>

      {/* Difficulty Settings */}
      <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>Difficulty</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {['easy', 'normal', 'hard', 'auto'].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => handleDifficultyChange(difficulty as any)}
              className={`py-2 px-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                state.difficulty === difficulty
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>Themes</span>
        </h3>
        
        <div className="space-y-3">
          {Object.values(THEMES).map((theme) => {
            const isUnlocked = state.stats.unlockedThemes.includes(theme.id);
            const isSelected = state.currentTheme === theme.id;
            
            return (
              <div
                key={theme.id}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-yellow-300 bg-white/30'
                    : isUnlocked
                    ? 'border-white/30 bg-white/10 hover:bg-white/20 cursor-pointer'
                    : 'border-gray-500 bg-gray-500/20'
                }`}
                onClick={() => isUnlocked && handleThemeChange(theme.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{theme.name}</div>
                    <div className="text-white/70 text-sm">
                      {isUnlocked ? 'Available' : `Unlock at ${theme.unlockRequirement} stars`}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {theme.shapes.slice(0, 3).map((shape, index) => (
                      <span key={index} className="text-lg">{shape}</span>
                    ))}
                  </div>
                </div>
                
                {!isUnlocked && (
                  <div className="mt-2 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(100, (state.stats.totalStars / theme.unlockRequirement) * 100)}%` 
                      }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Progress */}
      <div className="bg-red-500/20 rounded-2xl p-4 backdrop-blur-sm border border-red-400/30">
        <h3 className="text-lg font-semibold text-white mb-2">Reset Progress</h3>
        <p className="text-white/70 text-sm mb-3">
          This will delete all your progress, scores, and unlocked themes.
        </p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
              localStorage.removeItem('memoryMatchQuest_stats');
              window.location.reload();
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}