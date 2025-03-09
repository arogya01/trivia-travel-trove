import React from 'react';
import { Spinner } from './spinner';
import { cn } from '@/lib/utils';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

const Loading = ({ 
  text = 'Loading...', 
  size = 'md', 
  className,
  fullScreen = false
}: LoadingProps) => {
  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center py-8';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center space-y-3">
        <Spinner size={size} />
        {text && <span className="text-gray-700 font-medium">{text}</span>}
      </div>
    </div>
  );
};

export { Loading }; 