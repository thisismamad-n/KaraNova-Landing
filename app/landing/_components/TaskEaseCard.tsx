"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardPositionProps {
  left: number;
  top: number;
  width?: number;
}

export const TaskEaseFeatureCard = ({
  left,
  top,
  width = 420,
}: ProductCardPositionProps) => {
  const [progress] = useState(72);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute z-20 hidden pointer-events-auto md:block"
      style={{ left, top, width }}
      dir="rtl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-blue-500/10 p-6 shadow-[0_25px_80px_rgba(6,182,212,0.25)] backdrop-blur-xl border border-white/5">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Floating gradient orbs */}
        <motion.div 
          className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/20 blur-3xl"
          animate={{ 
            x: isHovered ? 20 : 0,
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-gradient-to-br from-teal-400/30 to-cyan-500/20 blur-3xl"
          animate={{ 
            x: isHovered ? -20 : 0,
            y: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.6 }}
        />

        <div className="relative space-y-5">
          {/* Header section */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    TaskEase
                  </h3>
                  <p className="text-[10px] text-cyan-300 font-medium">
                    اسپرینت‌های خودکار
                  </p>
                </div>
              </div>
              
              <p className="text-[13px] leading-relaxed text-slate-200 max-w-[280px]">
                برنامه‌ریزی هوشمند اسپرینت با تحلیل ظرفیت تیم و پیش‌بینی زمان تحویل
              </p>
            </div>

            {/* Stats badge */}
            <motion.div 
              className="flex flex-col items-end gap-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-3 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-br from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                60%
              </span>
              <span className="text-[9px] text-slate-400 text-center leading-tight">
                صرفه‌جویی<br/>زمان
              </span>
            </motion.div>
          </div>

          {/* Interactive sprint card */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-4 border border-cyan-500/20"
            whileHover={{ scale: 1.02 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />

            <div className="relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">اسپرینت فعلی</span>
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-medium text-emerald-300">در حال انجام</span>
                </div>
              </div>

              {/* Progress visualization */}
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <span className="text-[11px] text-slate-400">پیشرفت تسک‌ها</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-cyan-300">7</span>
                    <span className="text-xs text-slate-500">/10</span>
                  </div>
                </div>
                
                <div className="relative h-2 overflow-hidden rounded-full bg-slate-800/80">
                  <motion.div 
                    className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="rounded-xl bg-slate-800/50 p-2 border border-slate-700/50">
                  <div className="text-[10px] text-slate-400">زمان تحویل</div>
                  <div className="text-sm font-bold text-teal-300">3.2 روز</div>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-2 border border-slate-700/50">
                  <div className="text-[10px] text-slate-400">بهره‌وری</div>
                  <div className="text-sm font-bold text-cyan-300">+24%</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { icon: "⚡", text: "برنامه‌ریزی خودکار" },
              { icon: "🎯", text: "اولویت‌بندی هوشمند" },
              { icon: "🔄", text: "همگام‌سازی لحظه‌ای" }
            ].map((item, idx) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <span className="text-xs">{item.icon}</span>
                <span className="text-[10px] font-medium text-slate-300">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
