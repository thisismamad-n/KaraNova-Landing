import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'form' | 'chat' | 'card' | 'text';
}

export default function LoadingSkeleton({ className, variant = 'card' }: LoadingSkeletonProps) {
  if (variant === 'form') {
    return (
      <div className={cn("space-y-4 animate-pulse", className)}>
        <div className="h-12 bg-slate-700/30 rounded-lg" />
        <div className="h-12 bg-slate-700/30 rounded-lg" />
        <div className="h-32 bg-slate-700/30 rounded-lg" />
        <div className="h-12 bg-slate-700/30 rounded-lg w-1/3" />
      </div>
    );
  }

  if (variant === 'chat') {
    return (
      <div className={cn("space-y-3 animate-pulse", className)}>
        <div className="h-64 bg-slate-700/30 rounded-lg" />
        <div className="h-12 bg-slate-700/30 rounded-lg" />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn("space-y-2 animate-pulse", className)}>
        <div className="h-4 bg-slate-700/30 rounded w-3/4" />
        <div className="h-4 bg-slate-700/30 rounded w-full" />
        <div className="h-4 bg-slate-700/30 rounded w-5/6" />
      </div>
    );
  }

  // Default card variant
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="h-48 bg-slate-700/30 rounded-lg" />
    </div>
  );
}
