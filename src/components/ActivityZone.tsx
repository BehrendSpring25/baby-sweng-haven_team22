
import React from 'react';
import { ActivityType } from '@/types';
import { cn } from '@/lib/utils';
import { CharacterPosition } from '@/types';

interface ActivityZoneProps {
  type: ActivityType;
  icon: string;
  label: string;
  isActive: boolean;
  onDrop: () => void;
  x: number; // x position of the zone
  y: number; // y position of the zone
  width: number; // width of the zone
  height: number; // height of the zone
  cPos: CharacterPosition; // character position
  onCharacterEnter: (type: ActivityType) => void;
  onCharacterLeave: () => void;
}

const ActivityZone: React.FC<ActivityZoneProps> = ({
  type,
  icon,
  label,
  isActive,
  onDrop,
  x,
  y,
  width,
  height,
  cPos,
  onCharacterEnter,
  onCharacterLeave,
}) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [wasInside, setWasInside] = React.useState(false);
  
  // Get zone-specific styling
  const getZoneColor = () => {
    switch (type) {
      case 'sleep':
        return 'bg-game-sleep/20 border-game-sleep';
      case 'gaming':
        return 'bg-game-gaming/20 border-game-gaming';
      case 'work':
        return 'bg-game-work/20 border-game-work';
      default:
        return 'bg-secondary border-secondary';
    }
  };

  const isInsideZone = (charX: number, charY: number) => {
    const zoneLeft = x;
    const zoneRight = x + width;
    const zoneTop = y;
    const zoneBottom = y + height;
    return (
      charX >= zoneLeft &&
      charX <= zoneRight &&
      charY >= zoneTop &&
      charY <= zoneBottom
    );
  };

  React.useEffect(() => {
    
    const inside = isInsideZone(cPos.x, cPos.y);
    if (inside && !wasInside) {
      console.log(`Character entered ${type} zone`);
      onCharacterEnter(type);
      setWasInside(true);
    } else if (!inside && wasInside) {
      setWasInside(false);
      console.log(`Character left ${type} zone`);
      onCharacterLeave();

    }
  }, [cPos.x, cPos.y, width, height, onCharacterEnter, type]);
  
  return (
    <div 
      className={cn(
        "activity-zone border-2 rounded-xl p-4 flex flex-col items-center justify-center h-32 md:h-40 transition-all",
        getZoneColor(),
        isHovering && "scale-105 shadow-lg",
        isActive && "activity-zone active shadow-lg"
      )}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onDragOverCapture={(e) => {
        e.preventDefault();
        setIsHovering(true);
      }}
      onDragLeaveCapture={() => setIsHovering(false)}
      onDropCapture={(e) => {
        e.preventDefault();
        setIsHovering(false);
        onDrop();
      }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="font-medium text-sm text-center">{label}</div>
    </div>
  );
};
  
export default ActivityZone;
