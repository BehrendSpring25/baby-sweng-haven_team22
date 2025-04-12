
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverProps {
  level: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ level, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center animate-scale-in shadow-xl">
        <h2 className="text-4xl font-bold mb-2">Game Over</h2>
        <div className="text-8xl mb-4">😵</div>
        <p className="mb-4">Your software engineer's sanity reached zero!</p>
        <p className="mb-6">You reached level: <span className="font-bold text-xl">{level}</span></p>
        <Button 
          onClick={onRestart}
          className="bg-game-sanity hover:bg-game-sanity/80 text-black font-medium px-8 py-2"
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
