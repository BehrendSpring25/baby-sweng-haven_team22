
import React from 'react';
import { ActivityType } from '@/types';
import { cn } from '@/lib/utils';

interface ActivityZoneProps {
  type: ActivityType;
  icon: string;
  label: string;
  isActive: boolean;
  onDrop: () => void;
}

const ActivityZone: React.FC<ActivityZoneProps> = ({
  type,
  icon,
  label,
  isActive,
  onDrop
}) => {
  const [isHovering, setIsHovering] = React.useState(false);
  
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
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };
  
  const handleDragLeave = () => {
    setIsHovering(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    onDrop();
  };

  return (
    <div 
      className={cn(
        "activity-zone border-2 rounded-xl p-4 flex flex-col items-center justify-center h-32 md:h-40 transition-all",
        getZoneColor(),
        isHovering && "scale-105 shadow-lg",
        isActive && "activity-zone active shadow-lg"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="font-medium text-sm text-center">{label}</div>
    </div>
  );
};

export default ActivityZone;
