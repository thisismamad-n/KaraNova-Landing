"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface LegalSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function LegalSection({
  id,
  title,
  children,
  defaultOpen = true,
  className,
}: LegalSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className={cn(
        "border border-slate-800/30 rounded-lg overflow-hidden",
        "mb-4",
        className
      )}
    >
      {/* Section Header - Collapsible */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between",
          "px-6 py-4",
          "bg-slate-900/50 hover:bg-slate-900/70",
          "transition-colors duration-200",
          "text-right",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        )}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <ChevronDown
          className={cn(
            "w-5 h-5 text-teal-400 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
        <h2 className="text-xl font-bold text-slate-100 flex-1 text-right">
          {title}
        </h2>
      </button>

      {/* Section Content - Animated */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 py-4 text-slate-300 leading-relaxed" dir="rtl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
