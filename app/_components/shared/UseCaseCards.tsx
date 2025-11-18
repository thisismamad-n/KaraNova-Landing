"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export interface UseCase {
  title: string;
  description: string;
  benefits: string[];
  icon?: React.ReactNode;
}

export interface UseCaseCardsProps {
  useCases: UseCase[];
  title?: string;
  description?: string;
  accentColor?: string;
  className?: string;
}

export default function UseCaseCards({
  useCases,
  title,
  description,
  accentColor = "rgb(20, 184, 166)",
  className,
}: UseCaseCardsProps) {
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

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "relative group",
                "backdrop-blur-md bg-slate-900/40",
                "border border-slate-800/50",
                "rounded-2xl p-8",
                "hover:border-slate-700/70",
                "transition-all duration-300"
              )}
            >
              {/* Icon */}
              {useCase.icon && (
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
                  style={{
                    backgroundColor: `${accentColor}20`,
                  }}
                >
                  {useCase.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              {/* Benefits */}
              <div className="space-y-3">
                {useCase.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: index * 0.15 + benefitIndex * 0.1 + 0.3,
                    }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        backgroundColor: `${accentColor}30`,
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        style={{ color: accentColor }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-400 text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-2xl"
                style={{
                  background: `radial-gradient(circle at top right, ${accentColor}10, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
