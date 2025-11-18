"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  variant?: "spinner" | "dots" | "pulse";
}

export default function LoadingIndicator({
  size = "md",
  text,
  className,
  variant = "spinner",
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-teal-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {text && <span className="text-sm text-slate-400">{text}</span>}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <motion.div
          className={cn(
            "rounded-full bg-gradient-to-r from-teal-500 to-cyan-500",
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        {text && <span className="text-sm text-slate-400">{text}</span>}
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Loader2 className={cn("text-teal-400", sizeClasses[size])} />
      </motion.div>
      {text && <span className="text-sm text-slate-400">{text}</span>}
    </div>
  );
}

// Full page loading overlay
export function LoadingOverlay({ text = "در حال بارگذاری..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="text-center">
        <LoadingIndicator size="lg" variant="pulse" />
        <p className="mt-4 text-slate-300">{text}</p>
      </div>
    </div>
  );
}

// Inline loading state for content sections
export function InlineLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <LoadingIndicator size="md" text={text} variant="spinner" />
    </div>
  );
}

// Button loading state
export function ButtonLoading({ text = "در حال پردازش..." }: { text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Loader2 className="w-5 h-5" />
      </motion.div>
      {text}
    </div>
  );
}
