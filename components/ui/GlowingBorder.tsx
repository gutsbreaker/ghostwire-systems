import React from 'react';

interface GlowingBorderProps {
  children: React.ReactNode;
  color?: 'green' | 'cyan' | 'purple';
  className?: string;
}

export function GlowingBorder({ children, color = 'green', className = '' }: GlowingBorderProps) {
  const colors = {
    green: 'before:bg-neon-green',
    cyan: 'before:bg-cyber-cyan',
    purple: 'before:bg-electric-purple',
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-neon-green via-cyber-cyan to-electric-purple rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow`}></div>
      <div className="relative bg-deep-black rounded-lg">
        {children}
      </div>
    </div>
  );
}