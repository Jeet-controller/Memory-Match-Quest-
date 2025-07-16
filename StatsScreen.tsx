import React from 'react';
import { ArrowLeft, Trophy, Star, Calendar, Target, Award } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface StatsScreenProps {
  onBack: () => void;
}

export default function StatsScreen({ onBack }: StatsScreenProps) {
  const { state } = useGame();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const getPlayFrequency = () => {
    const { totalGamesPlayed } = state.stats;
    if (totalGamesPlayed === 0) return 'New Player';
    if (totalGamesPlayed < 10) return 'Getting Started';
    if (totalGamesPlayed < 50) return 'Regular Player';
    if (totalGamesPlayed < 100) return 'Dedicated Player';
    return 'Memory Master';
  };

  const achievements = [
    {
      id: 'first_game',
      name: 'First Steps',
      description: 'Played your first game',
      achieved: state.stats.totalGamesPlayed > 0,
      icon: '🎮'
    },
    {
      id: 'ten_games',
      name: 'Getting Good',
      description: 'Played 10 games',
      achieved: state.stats.totalGamesPlayed >= 10,
      icon: '🔥'
    },
    {
      id: 'fifty_stars',
      name: 'Star Collector',
      description: 'Earned 50 stars',
      achieved: state.stats.totalStars >= 50,
      icon: '⭐'
    },
    {
      id: 'hundred_points',
      name: 'High Scorer',
      description: 'Scored 100 points in a game',
      achieved: state.stats.bestScore >= 100,
      icon: '🏆'
    },
    {
      id: 'space_theme',
      name: 'Space Explorer',
      description: 'Unlocked Space theme',
      achieved: state.stats.unlockedThemes.includes('space'),
      icon: '🚀'
    },
    {
      id: 'jungle_theme',
      name: 'Jungle Navigator',
      description: 'Unlocked Jungle theme',
      achieved: state.stats.unlockedThemes.includes('jungle'),
      icon: '🐒'
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white">Your Stats</h2>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
          <div className="text-2xl font-bold text-white">{state.stats.bestScore}</div>
          <div className="text-white/70 text-sm">Best Score</div>
        </div>
        
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm text-center">
          <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300 fill-current" />
          <div className="text-2xl font-bold text-white">{state.stats.totalStars}</div>
          <div className="text-white/70 text-sm">Total Stars</div>
        </div>
        
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-blue-300" />
          <div className="text-2xl font-bold text-white">{state.stats.totalGamesPlayed}</div>
          <div className="text-white/70 text-sm">Games Played</div>
        </div>
        
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-green-300" />
          <div className="text-lg font-bold text-white">{getPlayFrequency()}</div>
          <div className="text-white/70 text-sm">Player Level</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white font-semibold mb-3">Theme Progress</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-white text-sm mb-1">
                <span>Space Theme (50 stars)</span>
                <span>{Math.min(state.stats.totalStars, 50)}/50</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (state.stats.totalStars / 50) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-white text-sm mb-1">
                <span>Jungle Theme (100 stars)</span>
                <span>{Math.min(state.stats.totalStars, 100)}/100</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (state.stats.totalStars / 100) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-white text-sm mb-1">
                <span>Ocean Theme (200 stars)</span>
                <span>{Math.min(state.stats.totalStars, 200)}/200</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (state.stats.totalStars / 200) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Award className="w-5 h-5" />
          <span>Achievements</span>
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-xl flex items-center space-x-3 ${
                achievement.achieved
                  ? 'bg-green-500/20 border border-green-400/30'
                  : 'bg-white/10 border border-white/20'
              }`}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <div className="flex-1">
                <div className={`font-medium ${achievement.achieved ? 'text-white' : 'text-white/60'}`}>
                  {achievement.name}
                </div>
                <div className={`text-sm ${achievement.achieved ? 'text-white/80' : 'text-white/50'}`}>
                  {achievement.description}
                </div>
              </div>
              {achievement.achieved && (
                <div className="text-green-400 text-xl">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Play History */}
      <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-3">Play History</h3>
        <div className="space-y-2 text-white/80">
          <div className="flex justify-between">
            <span>Last Played:</span>
            <span>{formatDate(state.stats.lastPlayDate)}</span>
          </div>
          <div className="flex justify-between">
            <span>Unlocked Themes:</span>
            <span>{state.stats.unlockedThemes.length}/4</span>
          </div>
        </div>
      </div>
    </div>
  );
}