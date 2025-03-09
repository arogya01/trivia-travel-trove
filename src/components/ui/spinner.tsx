import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
  trackColor?: string;
}

const Spinner = ({ 
  size = 'md', 
  className, 
  color = 'border-travel-blue',
  trackColor = 'border-gray-200'
}: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-solid', 
        sizeClasses[size],
        className
      )}
      style={{ 
        borderColor: 'transparent',
        borderLeftColor: 'var(--color-travel-blue, #3B82F6)',
        borderBottomColor: 'var(--color-travel-blue, #3B82F6)',
        borderWidth: '3px',
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.1)'
      }}
    />
  );
};

export { Spinner }; 