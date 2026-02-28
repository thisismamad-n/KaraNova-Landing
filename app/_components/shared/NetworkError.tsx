"use client";

import React from "react";
import { motion } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function NetworkError({
  message = "خطا در اتصال به شبکه",
  onRetry,
  className,
}: NetworkErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg",
        "backdrop-blur-md bg-orange-500/10",
        "border border-orange-500/30",
        className
      )}
    >
      <WifiOff className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-orange-400 mb-1">
          مشکل در اتصال
        </p>
        <p className="text-xs text-orange-400/80 mb-2">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={cn(
              "inline-flex items-center gap-1.5 rounded",
              "text-xs font-medium text-orange-400",
              "hover:text-orange-300",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            )}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            تلاش مجدد
          </button>
        )}
      </div>
    </motion.div>
  );
}
