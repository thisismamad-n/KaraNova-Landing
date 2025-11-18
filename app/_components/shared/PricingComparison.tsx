"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export interface PricingComparisonProps {
  tiers: PricingTier[];
  title?: string;
  description?: string;
  accentColor?: string;
  className?: string;
}

export default function PricingComparison({
  tiers,
  title,
  description,
  accentColor = "rgb(20, 184, 166)",
  className,
}: PricingComparisonProps) {
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

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
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
                "backdrop-blur-md",
                tier.highlighted
                  ? "bg-slate-900/60 border-2"
                  : "bg-slate-900/30 border",
                tier.highlighted ? "border-slate-700" : "border-slate-800/50",
                "rounded-2xl p-8",
                "hover:border-slate-700/70",
                "transition-all duration-300",
                tier.highlighted && "lg:scale-105 lg:shadow-2xl"
              )}
              style={
                tier.highlighted
                  ? {
                      boxShadow: `0 0 40px 0 ${accentColor}20`,
                    }
                  : undefined
              }
            >
              {/* Highlighted badge */}
              {tier.highlighted && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}, ${accentColor}dd)`,
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-2xl font-bold text-slate-100 mb-2">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-slate-400 mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-100">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-slate-400">/ {tier.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        backgroundColor: `${accentColor}30`,
                      }}
                    >
                      <Check
                        className="w-3 h-3"
                        style={{ color: accentColor }}
                      />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={tier.onCtaClick}
                className={cn(
                  "w-full py-3 rounded-lg font-semibold",
                  "transition-all duration-300",
                  tier.highlighted
                    ? "text-white hover:scale-105"
                    : "text-slate-300 border-2 hover:text-white"
                )}
                style={
                  tier.highlighted
                    ? {
                        background: `linear-gradient(to right, ${accentColor}, ${accentColor}dd)`,
                        boxShadow: `0 0 20px ${accentColor}40`,
                      }
                    : {
                        borderColor: `${accentColor}50`,
                      }
                }
              >
                {tier.ctaText}
              </button>

              {/* Hover glow effect */}
              {!tier.highlighted && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${accentColor}10, transparent 70%)`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
