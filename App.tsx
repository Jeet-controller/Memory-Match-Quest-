import React, { useState, useEffect } from 'react';
import { GameProvider } from './contexts/GameContext';
import { AudioProvider } from './contexts/AudioContext';
import GameScreen from './components/GameScreen';
import MenuScreen from './components/MenuScreen';
import SettingsScreen from './components/SettingsScreen';
import StatsScreen from './components/StatsScreen';
import './styles/animations.css';

type Screen = 'menu' | 'game' | 'settings' | 'stats';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

  useEffect(() => {
    // Update page title
    document.title = 'Memory Match Quest';
    
    // Add viewport meta for mobile optimization
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
    }
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'game':
        return <GameScreen onBack={() => setCurrentScreen('menu')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('menu')} />;
      case 'stats':
        return <StatsScreen onBack={() => setCurrentScreen('menu')} />;
      default:
        return <MenuScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <AudioProvider>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 overflow-hidden relative">
          {/* Fun background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 text-6xl animate-bounce">⭐</div>
            <div className="absolute top-20 right-20 text-5xl animate-pulse">🌈</div>
            <div className="absolute bottom-20 left-20 text-4xl animate-spin">🎈</div>
            <div className="absolute bottom-10 right-10 text-5xl animate-bounce">🎉</div>
          </div>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
              {renderScreen()}
            </div>
          </div>
        </div>
      </GameProvider>
    </AudioProvider>
  );
}

export default App;