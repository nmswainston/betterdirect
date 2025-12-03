import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export default function LoadingSpinner({
  message = 'Loading...',
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
      <div className="text-center">
        <div className="relative inline-block">
          <div
            className={`inline-block animate-spin rounded-full border-2 border-primary-200 dark:border-primary-900/50 ${sizeClasses[size]}`}
          />
          <div
            className={`absolute top-0 left-0 animate-spin rounded-full border-t-2 border-r-2 border-primary-600 dark:border-primary-400 ${sizeClasses[size]}`}
            style={{ animationDuration: '0.75s' }}
          />
        </div>
        {message && (
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
}

