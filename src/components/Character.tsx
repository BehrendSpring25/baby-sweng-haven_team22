import React, { useRef, useState } from 'react';
import { ActivityType, CharacterPosition } from '@/types';
import { cn } from '@/lib/utils';

interface CharacterProps {
  activity: ActivityType;
  position: CharacterPosition;
  onPositionChange: (position: CharacterPosition) => void;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Character: React.FC<CharacterProps> = ({
  activity,
  position,
  onPositionChange,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);
  
  // Get character animation based on activity
  const getCharacterStyle = () => {
    switch (activity) {
      case 'sleep':
        return "animate-sleep";
      case 'gaming':
        return "animate-pulse-gentle";
      case 'work':
        return "animate-work";
      default:
        return "animate-float";
    }
  };
  
  // Get character emoji based on activity
  const getCharacterEmoji = () => {
    switch (activity) {
      case 'sleep':
        return "😴";
      case 'gaming':
        return "🎮";
      case 'work':
        return "👨‍💻";
      default:
        return "🧑‍💻";
    }
  };
  
  // Handle drag events
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    // Required for Firefox
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', 'character');
    }
  };
  
  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    
    // Only update position if we're not in a drop zone
    const containerRect = e.currentTarget.closest('.game-container')?.getBoundingClientRect();
    if (containerRect) {
      const newX = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const newY = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      
      // Keep character within bounds
      const boundedX = Math.max(5, Math.min(95, newX));
      const boundedY = Math.max(5, Math.min(95, newY));
      
      onPositionChange({ x: boundedX, y: boundedY });
    }
  };
  
  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !characterRef.current) return;
    
    const touch = e.touches[0];
    const containerRect = characterRef.current.closest('.game-container')?.getBoundingClientRect();
    
    if (containerRect) {
      const newX = ((touch.clientX - containerRect.left) / containerRect.width) * 100;
      const newY = ((touch.clientY - containerRect.top) / containerRect.height) * 100;
      
      // Keep character within bounds
      const boundedX = Math.max(5, Math.min(95, newX));
      const boundedY = Math.max(5, Math.min(95, newY));
      
      onPositionChange({ x: boundedX, y: boundedY });
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  return (
    <div
      ref={characterRef}
      className={cn(
        "absolute draggable-character text-5xl md:text-6xl transition-all cursor-grab",
        getCharacterStyle(),
        isDragging && "cursor-grabbing scale-110 z-50"
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('type', 'character'); // Mark as character
        handleDragStart(e);
      }}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {getCharacterEmoji()}
    </div>
  );
};

export default Character;
