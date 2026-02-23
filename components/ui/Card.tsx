import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  glowColor?: 'green' | 'cyan' | 'purple';
}

export function Card({ children, className, glowing = false, glowColor = 'green' }: CardProps) {
  const glowStyles = {
    green: 'border-neon-green shadow-neon-green',
    cyan: 'border-neon-cyan shadow-neon-cyan',
    purple: 'border-neon-purple shadow-neon-purple',
  };
  
  return (
    <div
      className={cn(
        'glass rounded-lg p-6 border',
        glowing ? glowStyles[glowColor] : 'border-ghost-white/10',
        className
      )}
    >
      {children}
    </div>
  );
}