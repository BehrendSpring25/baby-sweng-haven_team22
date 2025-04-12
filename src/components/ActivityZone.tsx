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
  
  const getZoneImage = () => {
    if (isInsideZone(cPos.x, cPos.y)) {
      // Change the image when the character is active in the zone
      switch (type) {
        case 'sleep':
          return '/assets/images/Act_Sleep.png';
        case 'gaming':
          return '/assets/images/Act_Game.png';
        case 'work':
          return '/assets/images/Act_Work.png';
        default:
          return '/assets/images/default-zone-active.png';
      }
    }
    // Default image for the zone
    switch (type) {
      case 'sleep':
        return '/assets/images/Game_Bed.png';
      case 'gaming':
        return '/assets/images/Game_GameStation.png';
      case 'work':
        return '/assets/images/Game_Desk.png';
      default:
        return '/assets/images/default-zone.png';
    }
  };

  const isInsideZone = (charX: number, charY: number) => {
    const container = document.querySelector('.game-container')?.getBoundingClientRect();
    if (!container) return false;

    const containerBoost = 50;

    // Convert character's percentage position to absolute pixels
    const charXInPixels = (charX / 100) * container.width;
    const charYInPixels = (charY / 100) * container.height;

    const zoneLeft = x;
    const zoneRight = x + width;
    const zoneTop = y;
    const zoneBottom = y + height;
    console.log(`Character Position: (${charXInPixels}, ${charYInPixels})`);
    console.log(`Zone Bounds: (${zoneLeft}, ${zoneTop}) to (${zoneRight}, ${zoneBottom})`);
    return (
      charXInPixels >= zoneLeft &&
      charXInPixels <= zoneRight &&
      charYInPixels >= zoneTop &&
      charYInPixels <= zoneBottom
    );
  };

  const handleDrop = (e: React.DragEvent) => {
    // Prevent decorations from triggering activity zone interactions
    if (e.dataTransfer.getData('type') !== 'character') return;

    setIsHovering(false);
    if (isInsideZone(cPos.x, cPos.y)) {
      onDrop(); // Trigger the parent-provided onDrop handler
    }
    
  };

  React.useEffect(() => {
    const inside = isInsideZone(cPos.x, cPos.y);
  
    if (inside && !wasInside) {
      onCharacterEnter(type); // Notify parent that character entered the zone
      setWasInside(true);
    } else if (!inside && wasInside) {
      onCharacterLeave(); // Notify parent that character left the zone
      setWasInside(false);
    }
  }, [cPos.x, cPos.y, width, height, onCharacterEnter, onCharacterLeave, type, isActive]); // Add `isActive` to dependencies
  
  return (
    <div 
      className={cn(
        "activity-zone transition-all",
        isHovering && "scale-105 shadow-lg",
        isActive && "activity-zone active shadow-lg"
      )}
      style={{
        position: 'absolute',
        left: `${x}px`, // Increase size by adjusting position
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${getZoneImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onDragOverCapture={(e) => {
        e.preventDefault();
        setIsHovering(true);
      }}
      onDragLeaveCapture={() => setIsHovering(false)}
      onDropCapture={handleDrop}
    >
    </div>
  );
};
  
export default ActivityZone;
