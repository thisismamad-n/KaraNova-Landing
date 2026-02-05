"use client";

import { motion } from "framer-motion";

interface ProductCardPositionProps {
  left: number;
  top: number;
  width?: number;
  variant?: "overlay" | "stacked";
}

export const InovaFeatureCard = ({
  left,
  top,
  width = 420,
  variant = "overlay",
}: ProductCardPositionProps) => {
  const isMobile = variant === "stacked";

  return (
    <motion.div
      className={
        variant === "overlay"
          ? "absolute z-20 hidden pointer-events-none md:block"
          : "relative z-20 block md:hidden w-full pointer-events-none"
      }
      style={variant === "overlay" ? { left, top, width } : undefined}
      dir="rtl"
      initial={isMobile ? undefined : { opacity: 0, y: 30 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -15% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Pulsing AI glow effect */}
      <motion.div
        className="absolute -inset-8 rounded-full bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-cyan-500/15 blur-3xl opacity-40"
        animate={isMobile ? undefined : {
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative space-y-4">
        {/* Live AI indicator */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={isMobile ? undefined : { opacity: 0, x: -20 }}
          whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <motion.div
            className="relative h-3 w-3 rounded-full bg-emerald-400"
            animate={isMobile ? undefined : {
              boxShadow: [
                "0 0 0 0 rgba(52, 211, 153, 0.7)",
                "0 0 0 12px rgba(52, 211, 153, 0)",
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-300"
              animate={isMobile ? undefined : {
                scale: [1, 0.8, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-300/90 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]">
            AI LIVE
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          className="text-4xl font-bold leading-tight"
          initial={isMobile ? undefined : { opacity: 0, x: -20 }}
          whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="bg-gradient-to-l from-emerald-200 via-teal-200 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
            چهار مشاور هوشمند، یک اکوسیستم
          </span>
        </motion.h2>

        {/* Subheadline with staggered reveal */}
        <motion.div
          className="space-y-2"
          initial={isMobile ? undefined : { opacity: 0, x: -20 }}
          whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-lg font-medium text-slate-200/90 leading-relaxed">
            تحلیل بازار، مدیریت ریسک، بهینه‌سازی زنجیره تامین و تولید محتوای خلاقانه
          </p>

          {/* Animated dots indicator */}
          <div className="flex items-center gap-2 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                initial={isMobile ? { width: i === 0 ? 32 : i === 1 ? 24 : i === 2 ? 16 : 12 } : { width: 0 }}
                whileInView={isMobile ? undefined : { width: i === 0 ? 32 : i === 1 ? 24 : i === 2 ? 16 : 12 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.7 + (i * 0.1),
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  className="h-full w-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-300"
                  animate={isMobile ? undefined : {
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
