import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'form' | 'chat' | 'card' | 'text' | 'list' | 'table' | 'hero' | 'blog' | 'job';
  count?: number;
}

export default function LoadingSkeleton({ className, variant = 'card', count = 1 }: LoadingSkeletonProps) {
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

  if (variant === 'list') {
    return (
      <div className={cn("space-y-3 animate-pulse", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-700/30 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700/30 rounded w-3/4" />
              <div className="h-3 bg-slate-700/30 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={cn("space-y-2 animate-pulse", className)}>
        <div className="h-12 bg-slate-700/30 rounded-lg" />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-16 bg-slate-700/30 rounded-lg" />
        ))}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={cn("animate-pulse space-y-6", className)}>
        <div className="h-8 bg-slate-700/30 rounded w-1/4 mx-auto" />
        <div className="h-16 bg-slate-700/30 rounded w-3/4 mx-auto" />
        <div className="h-6 bg-slate-700/30 rounded w-1/2 mx-auto" />
        <div className="h-12 bg-slate-700/30 rounded-lg w-48 mx-auto" />
      </div>
    );
  }

  if (variant === 'blog') {
    return (
      <div className={cn("space-y-4 animate-pulse", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="backdrop-blur-md bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
            <div className="h-48 bg-slate-700/30 rounded-lg mb-4" />
            <div className="h-6 bg-slate-700/30 rounded w-3/4 mb-3" />
            <div className="h-4 bg-slate-700/30 rounded w-full mb-2" />
            <div className="h-4 bg-slate-700/30 rounded w-5/6 mb-4" />
            <div className="flex gap-2">
              <div className="h-6 bg-slate-700/30 rounded-full w-16" />
              <div className="h-6 bg-slate-700/30 rounded-full w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'job') {
    return (
      <div className={cn("space-y-4 animate-pulse", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="backdrop-blur-md bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-slate-700/30 rounded w-2/3 mb-2" />
                <div className="h-4 bg-slate-700/30 rounded w-1/2" />
              </div>
              <div className="h-8 bg-slate-700/30 rounded-lg w-24" />
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-slate-700/30 rounded-full w-20" />
              <div className="h-6 bg-slate-700/30 rounded-full w-24" />
              <div className="h-6 bg-slate-700/30 rounded-full w-16" />
            </div>
            <div className="h-4 bg-slate-700/30 rounded w-full mb-2" />
            <div className="h-4 bg-slate-700/30 rounded w-4/5" />
          </div>
        ))}
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
