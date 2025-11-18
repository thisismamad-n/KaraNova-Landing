"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundVariant?: "default" | "gradient" | "animated";
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  backgroundVariant = "default",
  showCTA = false,
  ctaText,
  ctaHref,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[40vh] flex items-center justify-center overflow-hidden",
        "px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      {/* Background Effects */}
      {backgroundVariant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent" />
      )}
      
      {backgroundVariant === "animated" && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent animate-pulse" />
        </div>
      )}

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6 text-sm text-slate-400"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && <span className="text-slate-600">/</span>}
                <Link
                  href={crumb.href}
                  className="hover:text-teal-400 transition-colors"
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6",
            "bg-gradient-to-r from-slate-100 via-teal-200 to-cyan-200",
            "bg-clip-text text-transparent",
            "drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]"
          )}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button */}
        {showCTA && ctaText && ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href={ctaHref}
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-3 rounded-lg",
                "bg-gradient-to-r from-teal-500 to-cyan-500",
                "text-white font-semibold",
                "hover:from-teal-600 hover:to-cyan-600",
                "transition-all duration-300",
                "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
                "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]",
                "hover:scale-105"
              )}
            >
              {ctaText}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
