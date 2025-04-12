
import React from 'react';
import { cn } from '@/lib/utils';

interface StatBarProps {
  label: string;
  value: number;
  icon: string;
  color: string;
  className?: string;
}

const StatBar: React.FC<StatBarProps> = ({ 
  label, 
  value, 
  icon, 
  color,
  className 
}) => {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm">
          <span>{icon}</span>
          <span>{label}</span>
        </div>
        <span className="text-xs font-medium">{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full stat-bar rounded-full transition-all"
          style={{ 
            width: `${value}%`, 
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
};

export default StatBar;
