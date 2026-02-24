"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

export interface FeatureShowcaseProps {
  features: Feature[];
  title?: string;
  description?: string;
  layout?: "grid" | "list";
  accentColor?: string;
  className?: string;
}

export default function FeatureShowcase({
  features,
  title,
  description,
  layout = "grid",
  accentColor = "rgb(20, 184, 166)",
  className,
}: FeatureShowcaseProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full",
        "px-4 sm:px-6 lg:px-8",
        "py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColor}dd)`,
                  }}
                >
                  {title}
                </span>
              </h2>
            )}
            {description && (
              <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Features */}
        <ul
          className={cn(
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              : "space-y-6"
          )}
          role="list"
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "relative group",
                "backdrop-blur-md bg-slate-900/30",
                "border border-slate-800/50",
                "rounded-2xl p-6 lg:p-8",
                "hover:border-slate-700/70",
                "transition-all duration-300",
                "hover:shadow-lg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-teal-500"
              )}
              style={{
                boxShadow: `0 0 0 0 ${accentColor}00`,
              }}
              whileHover={{
                boxShadow: `0 0 30px 0 ${accentColor}20`,
              }}
              tabIndex={0}
            >
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{
                  backgroundColor: `${feature.color || accentColor}20`,
                }}
              >
                <feature.icon
                  className="w-6 h-6"
                  style={{ color: feature.color || accentColor }}
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-100 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color || accentColor}15, transparent 70%)`,
                }}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
