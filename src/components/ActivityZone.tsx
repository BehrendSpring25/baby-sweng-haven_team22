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
      console.log(`Character left ${type} zone`);
      onCharacterLeave();
      setWasInside(false);
    }
  }, [cPos.x, cPos.y, width, height, onCharacterEnter, type]);
  
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
      onDropCapture={(e) => {
        e.preventDefault();
        setIsHovering(false);
        onDrop();
      }}
    >
    </div>
  );
};
  
export default ActivityZone;
