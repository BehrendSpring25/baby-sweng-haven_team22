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
  width?: number;
  height?: number;
  stats: { sleepiness: number; stress: number; sanity: number }; // Add stats prop
}

const Character: React.FC<CharacterProps> = ({
  activity,
  position,
  onPositionChange,
  className,
  width = 50,
  height = 50,
  stats,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const characterRef = useRef<HTMLDivElement>(null);

  const getCharacterStyle = () => {
    switch (activity) {
      case 'sleep': return "animate-sleep";
      case 'gaming': return "animate-pulse-gentle";
      case 'work': return "animate-work";
      default: return "animate-float";
    }
  };

  const getCharacterEmoji = () => {
    if (activity === 'idle') {
      const { sleepiness, stress, sanity } = stats;
      if (sanity === 100 && sleepiness == 0 && stress === 0) {
        return (
          <img
            src="/assets/images/Char_Happy.png" // Insane character image
            alt="Happy Character"
            className="w-full h-full object-contain"
          />
        );
      } else if (sanity < 30) {
        return (
          <img
            src="/assets/images/Char_NoSanity.png" // Insane character image
            alt="Insane Character"
            className="w-full h-full object-contain"
          />
        );
      } else if (stress > 70) {
        return (
          <img
            src="/assets/images/Char_Stressed.png" // Stressed character image
            alt="Stressed Character"
            className="w-full h-full object-contain"
          />
        );
      } else if (sleepiness > 70) {
        return (
          <img
            src="/assets/images/Char_Sleepy.png" // Tired character image
            alt="Tired Character"
            className="w-full h-full object-contain"
          />
        );
      } else {
        return (
          <img
            src="/assets/images/Char_Normal.png" // Normal character image
            alt="Idle Character"
            className="w-full h-full object-contain"
          />
        );
      }
    }

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

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    const rect = characterRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', 'character');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    const containerRect = e.currentTarget.closest('.game-container')?.getBoundingClientRect();
    if (containerRect) {
      const newX = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
      const newY = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;

      const boundedX = Math.max(5, Math.min(95, newX));
      const boundedY = Math.max(5, Math.min(95, newY));

      onPositionChange({ x: boundedX, y: boundedY });
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    handleDrag(e); // Final update on drop
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !characterRef.current) return;

    const touch = e.touches[0];
    const containerRect = characterRef.current.closest('.game-container')?.getBoundingClientRect();

    if (containerRect) {
      const newX = ((touch.clientX - containerRect.left) / containerRect.width) * 100;
      const newY = ((touch.clientY - containerRect.top) / containerRect.height) * 100;

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
        isDragging && "cursor-grabbing scale-110 z-50",
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('type', 'character');
        handleDragStart(e);
      
        // Hide default drag preview
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMXB4IiBoZWlnaHQ9IjFweCIgdmlld0JveD0iMCAwIDEgMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnL3N2ZyI+PC9zdmc+'; // transparent pixel
        e.dataTransfer.setDragImage(img, 0, 0);
      }}
      
      onDrag={handleDrag} // 👈 Real-time updates while dragging
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
