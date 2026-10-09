import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

type DwellButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  activeColor?: string;
  children?: React.ReactNode;
  className?: string;
};

export function DwellButton({ 
  onClick, 
  children, 
  className, 
  activeColor = 'bg-blue-500',
  ...props 
}: DwellButtonProps) {
  const { dwellClickEnabled, dwellTime } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (dwellClickEnabled && isHovered) {
      timeoutRef.current = setTimeout(() => {
        onClick();
        setIsHovered(false); // Reset after triggering
      }, dwellTime);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered, dwellClickEnabled, dwellTime, onClick]);

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-3xl shadow-lg transition-transform active:scale-95",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
        {children}
      </div>
      
      {/* Dwell Progress Indicator */}
      {dwellClickEnabled && (
        <div
          className={cn("absolute bottom-0 left-0 h-3 opacity-50", activeColor)}
          style={{
            width: isHovered ? '100%' : '0%',
            transition: isHovered ? `width ${dwellTime}ms linear` : 'none',
          }}
        />
      )}
    </button>
  );
}
