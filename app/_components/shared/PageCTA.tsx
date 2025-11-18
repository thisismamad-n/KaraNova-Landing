"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PageCTAProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  variant?: "default" | "minimal" | "full-width";
  className?: string;
}

export default function PageCTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = "default",
  className,
}: PageCTAProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        "px-4 sm:px-6 lg:px-8",
        "py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Content Container */}
      <div
        className={cn(
          "relative z-10 mx-auto",
          variant === "full-width" ? "max-w-full" : "max-w-4xl",
          variant === "default" &&
            "backdrop-blur-md bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8 sm:p-12 lg:p-16"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Title */}
          <h2
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold mb-6",
              "bg-gradient-to-r from-slate-100 via-teal-200 to-cyan-200",
              "bg-clip-text text-transparent"
            )}
          >
            {title}
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Button */}
            <Link
              href={primaryButton.href}
              onClick={primaryButton.onClick}
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-3 rounded-lg",
                "bg-gradient-to-r from-teal-500 to-cyan-500",
                "text-white font-semibold text-lg",
                "hover:from-teal-600 hover:to-cyan-600",
                "transition-all duration-300",
                "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
                "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]",
                "hover:scale-105",
                "w-full sm:w-auto"
              )}
            >
              {primaryButton.text}
            </Link>

            {/* Secondary Button */}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                onClick={secondaryButton.onClick}
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-8 py-3 rounded-lg",
                  "border-2 border-teal-500/50",
                  "text-teal-300 font-semibold text-lg",
                  "hover:border-teal-400 hover:text-teal-200",
                  "hover:bg-teal-500/10",
                  "transition-all duration-300",
                  "w-full sm:w-auto"
                )}
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
