import React from 'react';
import { THEMES } from '../data/themes';

interface GameGridProps {
  gridSize: number;
  onCellClick: (index: number) => void;
  highlightedCell: number;
  disabled: boolean;
  theme: string;
}

export default function GameGrid({ 
  gridSize, 
  onCellClick, 
  highlightedCell, 
  disabled, 
  theme 
}: GameGridProps) {
  const currentTheme = THEMES[theme] || THEMES.classic;
  const totalCells = gridSize * gridSize;

  return (
    <div 
      className="grid gap-3 mx-auto max-w-sm"
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        aspectRatio: '1'
      }}
    >
      {Array.from({ length: totalCells }, (_, index) => {
        const colorIndex = index % currentTheme.colors.length;
        const isHighlighted = highlightedCell === index;
        
        return (
          <button
            key={index}
            onClick={() => !disabled && onCellClick(index)}
            disabled={disabled}
            className={`
              aspect-square rounded-3xl border-6 border-white font-bold text-4xl
              transform transition-all duration-200 shadow-lg
              ${currentTheme.colors[colorIndex]}
              ${isHighlighted 
                ? 'scale-125 shadow-2xl border-yellow-400 animate-pulse ring-8 ring-yellow-300' 
                : 'hover:scale-110 active:scale-95'
              }
              ${disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:shadow-2xl'}
            `}
            style={{
              boxShadow: isHighlighted 
                ? '0 0 40px rgba(255, 255, 0, 0.8), 0 0 80px rgba(255, 255, 0, 0.4)' 
                : undefined
            }}
          >
            <span className="drop-shadow-2xl filter brightness-110">
              {currentTheme.shapes[colorIndex]}
            </span>
          </button>
        );
      })}
    </div>
  );
}