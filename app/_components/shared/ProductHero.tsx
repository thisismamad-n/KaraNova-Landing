"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProductHeroProps {
  title: string;
  subtitle: string;
  description: string;
  demoImage?: string;
  demoAlt?: string;
  gradientFrom: string;
  gradientTo: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

export default function ProductHero({
  title,
  subtitle,
  description,
  demoImage,
  demoAlt = "Product demo",
  gradientFrom,
  gradientTo,
  ctaText,
  ctaHref,
  onCtaClick,
  className,
}: ProductHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[70vh] flex items-center overflow-hidden",
        "px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32",
        className
      )}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle, ${gradientFrom} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtitle badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-slate-900/30 border border-slate-700/50 mb-6"
            >
              <div
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: gradientFrom }}
              />
              <span className="text-sm font-semibold text-slate-300">
                {subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight py-2"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                  filter: `drop-shadow(0 0 30px ${gradientFrom}40)`,
                  WebkitBoxDecorationBreak: 'clone',
                  boxDecorationBreak: 'clone',
                }}
              >
                {title}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTA Button */}
            {ctaText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  onClick={onCtaClick}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "px-8 py-4 rounded-lg",
                    "text-white font-semibold text-lg",
                    "transition-all duration-300",
                    "hover:scale-105"
                  )}
                  style={{
                    background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                    boxShadow: `0 0 20px ${gradientFrom}40`,
                  }}
                >
                  {ctaText}
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Demo/Screenshot */}
          {demoImage && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-slate-900/30 border border-slate-700/50 p-4">
                <Image
                  src={demoImage}
                  alt={demoAlt}
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-20 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
