"use client";

import { motion } from "framer-motion";

interface ProductCardPositionProps {
  left: number;
  top: number;
  width?: number;
  variant?: "overlay" | "stacked";
}

export const TaskEaseFeatureCard = ({
  left,
  top,
  width = 520,
  variant = "overlay",
}: ProductCardPositionProps) => {
  return (
    <motion.div
      className={
        variant === "overlay"
          ? "absolute z-20 hidden pointer-events-none md:block"
          : "relative z-20 block md:hidden w-full pointer-events-none"
      }
      style={variant === "overlay" ? { left, top, width } : undefined}
      dir="rtl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -15% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Flowing gradient background glow */}
      <motion.div 
        className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-teal-500/20 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative space-y-3">
        {/* Main headline with animated gradient */}
        <motion.h2 
          className="text-4xl font-bold leading-tight"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-l from-cyan-200 via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            مدیریت پروژه با هوش مصنوعی
          </span>
        </motion.h2>

        {/* Subheadline with flowing underline */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-xl font-medium text-slate-200/90 leading-relaxed">
            اسپرینت‌های خودکار، تخصیص هوشمند منابع و پیش‌بینی دقیق زمان تحویل
          </p>
          
          {/* Animated flowing line */}
          <motion.div 
            className="absolute -bottom-1 right-0 h-0.5 bg-gradient-to-l from-cyan-400 via-blue-400 to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: "75%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-cyan-300 to-transparent"
              animate={{ 
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
