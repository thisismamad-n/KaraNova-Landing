"use client";

import { motion } from "framer-motion";

interface ProductCardPositionProps {
  left: number;
  top: number;
  width?: number;
  variant?: "overlay" | "stacked";
}

export const BIQFeatureCard = ({
  left,
  top,
  width = 460,
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
      {/* Radial gradient glow */}
      <motion.div 
        className="absolute -inset-10 rounded-full bg-gradient-to-br from-indigo-600/25 via-indigo-500/20 to-violet-600/25 blur-3xl"
        animate={{ 
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.55, 0.35]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative space-y-3.5">
        {/* Metric badge with animated border */}
        <motion.div 
          className="inline-flex items-center gap-3 relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {/* Animated rotating border */}
          <motion.div
            className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-500/45 via-indigo-600/45 to-violet-500/45 blur-sm"
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-indigo-400/35">
            <div className="flex flex-col items-end">
              <span className="text-3xl font-bold bg-gradient-to-l from-indigo-300 via-indigo-200 to-violet-300 bg-clip-text text-transparent">
                92%
              </span>
              <span className="text-[10px] text-slate-400 font-medium">دقت تحلیل</span>
            </div>
            
            {/* Animated pulse rings */}
            <div className="relative">
              <motion.div 
                className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(99, 102, 241, 0.5)",
                    "0 0 0 15px rgba(99, 102, 241, 0)",
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main headline with split reveal */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold leading-tight">
            <span className="bg-gradient-to-l from-indigo-200 via-indigo-100 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.6)]">
              تحلیل هوشمند داده‌ها، تصمیم‌گیری آگاهانه
            </span>
          </h2>
        </motion.div>

        {/* Subheadline with animated metrics */}
        <motion.div
          className="space-y-2.5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-lg font-medium text-slate-200/90 leading-relaxed">
            داشبوردهای تعاملی، گزارش‌های لحظه‌ای و بینش‌های عمیق از عملکرد کسب‌وکار
          </p>
          
          {/* Animated data visualization bars */}
          <div className="flex items-end gap-1.5 pt-2">
            {[65, 85, 72, 92, 78, 88, 95].map((height, i) => (
              <motion.div
                key={i}
                className="relative flex-1 rounded-t-sm bg-gradient-to-t from-indigo-600/65 via-indigo-500/65 to-violet-500/65"
                initial={{ height: 0 }}
                whileInView={{ height: `${height * 0.4}px` }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.7 + (i * 0.08), 
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-t-sm bg-gradient-to-t from-indigo-500 via-indigo-400 to-violet-400"
                  animate={{ 
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.15,
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
