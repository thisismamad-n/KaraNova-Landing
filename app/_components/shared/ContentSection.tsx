"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "bordered";
  animate?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function ContentSection({
  children,
  className,
  variant = "default",
  animate = true,
  maxWidth = "lg",
}: ContentSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variantClasses = {
    default: "",
    glass: cn(
      "backdrop-blur-md bg-slate-900/30",
      "border border-slate-800/50",
      "shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    ),
    bordered: cn(
      "border border-slate-800/30",
      "shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    ),
  };

  const content = (
    <section
      ref={ref}
      className={cn(
        "relative w-full",
        "px-4 sm:px-6 lg:px-8",
        "py-12 sm:py-16 lg:py-20",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto",
          maxWidthClasses[maxWidth],
          variantClasses[variant],
          variant !== "default" && "rounded-2xl p-6 sm:p-8 lg:p-12"
        )}
      >
        {children}
      </div>
    </section>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {content}
    </motion.div>
  );
}
