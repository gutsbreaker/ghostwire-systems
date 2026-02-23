import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neon-green' | 'neon-cyan' | 'neon-purple' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'neon-green', 
  size = 'md',
  className,
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = "font-rajdhani font-semibold rounded transition-all duration-300 hover:scale-105 active:scale-95";
  
  const variants = {
    'neon-green': 'border-2 border-neon-green shadow-neon-green text-neon-green hover:bg-neon-green hover:text-deep-black',
    'neon-cyan': 'border-2 border-neon-cyan shadow-neon-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-deep-black',
    'neon-purple': 'border-2 border-neon-purple shadow-neon-purple text-electric-purple hover:bg-electric-purple hover:text-deep-black',
    'glass': 'glass border-ghost-white/20 text-ghost-white hover:border-neon-green',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}