import React, { createContext, useContext, useRef, useCallback } from 'react';

interface AudioContextType {
  playSound: (soundType: 'success' | 'error' | 'tap' | 'star' | 'unlock') => void;
  setMuted: (muted: boolean) => void;
  isMuted: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(false);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const createTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (isMutedRef.current) return;
    
    const audioContext = initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [initAudioContext]);

  const playSound = useCallback((soundType: 'success' | 'error' | 'tap' | 'star' | 'unlock') => {
    switch (soundType) {
      case 'success':
        // Enhanced success sound - multiple tones for bigger celebration
        createTone(523.25, 0.2); // C5
        setTimeout(() => createTone(659.25, 0.2), 100); // E5
        setTimeout(() => createTone(783.99, 0.3), 200); // G5
        setTimeout(() => createTone(1046.50, 0.4), 400); // C6 - higher celebration
        break;
      case 'error':
        createTone(220, 0.3, 'sawtooth');
        break;
      case 'tap':
        createTone(440, 0.1);
        break;
      case 'star':
        // Enhanced star sound - more magical
        createTone(880, 0.15);
        setTimeout(() => createTone(1108.73, 0.15), 75);
        setTimeout(() => createTone(1318.51, 0.15), 150); // E6
        setTimeout(() => createTone(1567.98, 0.2), 225); // G6
        setTimeout(() => createTone(2093.00, 0.25), 300); // C7 - super high magical sound
        break;
      case 'unlock':
        createTone(523.25, 0.2);
        setTimeout(() => createTone(659.25, 0.2), 100);
        setTimeout(() => createTone(783.99, 0.2), 200);
        setTimeout(() => createTone(1046.50, 0.4), 300);
        break;
    }
  }, [createTone]);

  const setMuted = useCallback((muted: boolean) => {
    isMutedRef.current = muted;
  }, []);

  return (
    <AudioContext.Provider value={{ playSound, setMuted, isMuted: isMutedRef.current }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}