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
  x: number;
  y: number;
  width: number;
  height: number;
  cPos: CharacterPosition;
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
  const [wasInside, setWasInside] = React.useState(false);

  const isInsideZone = (charX: number, charY: number, charWidth: number, charHeight: number) => {
    const container = document.querySelector('.game-container')?.getBoundingClientRect();
    if (!container) return false;

    const charCenterX = (charX / 100) * container.width;
    const charCenterY = (charY / 100) * container.height;

    const charLeft = charCenterX - charWidth / 2;
    const charRight = charCenterX + charWidth / 2;
    const charTop = charCenterY - charHeight / 2;
    const charBottom = charCenterY + charHeight / 2;

    const zoneLeft = x;
    const zoneRight = x + width;
    const zoneTop = y;
    const zoneBottom = y + height;

    return (
      charRight >= zoneLeft &&
      charLeft <= zoneRight &&
      charBottom >= zoneTop &&
      charTop <= zoneBottom
    );
  };

  const getZoneImage = () => {
    if (isInsideZone(cPos.x, cPos.y, cPos.width, cPos.height)) {
      switch (type) {
        case 'sleep': return '/assets/images/Act_Sleep.png';
        case 'gaming': return '/assets/images/Act_Game.png';
        case 'work': return '/assets/images/Act_Work.png';
        default: return '/assets/images/default-zone-active.png';
      }
    }
    switch (type) {
      case 'sleep': return '/assets/images/Game_Bed.png';
      case 'gaming': return '/assets/images/Game_GameStation.png';
      case 'work': return '/assets/images/Game_Desk.png';
      default: return '/assets/images/default-zone.png';
    }
  };

  // Monitor if character entered or left the zone
  React.useEffect(() => {
    const inside = isInsideZone(cPos.x, cPos.y, cPos.width, cPos.height);

    if (inside && !wasInside) {
      onCharacterEnter(type);
      onDrop(); // Treat entering as a drop
      setWasInside(true);
    } else if (!inside && wasInside) {
      onCharacterLeave();
      setWasInside(false);
    }
  }, [cPos.x, cPos.y, cPos.width, cPos.height]);

  return (
    <div
      className={cn(
        'activity-zone transition-all',
        isActive && 'activity-zone active shadow-lg'
      )}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${getZoneImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
};

export default ActivityZone;
