"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ProductCardPositionProps {
  left: number;
  top: number;
  width?: number;
}

export const InovaFeatureCard = ({
  left,
  top,
  width = 340,
}: ProductCardPositionProps) => {
  const [activeMetric, setActiveMetric] = useState(0);
  
  const metrics = [
    { value: "92%", label: "دقت پیش‌بینی", color: "emerald" },
    { value: "120K+", label: "سیگنال روزانه", color: "cyan" },
    { value: "360°", label: "دید کامل بازار", color: "teal" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute z-20 hidden pointer-events-auto md:block"
      style={{ left, top, width }}
      dir="rtl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950/40 via-slate-900/30 to-slate-950/40 p-[1px] shadow-[0_20px_70px_rgba(6,182,212,0.15)]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-slate-950/90 backdrop-blur-2xl">
          {/* Animated gradient orb */}
          <motion.div 
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-transparent blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative p-6 space-y-5">
            {/* Header with live indicator */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(52, 211, 153, 0.7)",
                        "0 0 0 8px rgba(52, 211, 153, 0)",
                      ]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                    LIVE
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Vision AI
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Inova Intelligence
                </p>
              </div>
              
              {/* Rotating metric display */}
              <motion.div 
                className="flex flex-col items-end gap-0.5"
                key={activeMetric}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-2xl font-bold bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  {metrics[activeMetric].value}
                </span>
                <span className="text-[9px] text-slate-500 font-medium">
                  {metrics[activeMetric].label}
                </span>
              </motion.div>
            </div>

            {/* Main content */}
            <div className="space-y-3">
              <p className="text-[13px] leading-relaxed text-slate-300">
                شناسایی فرصت‌ها و تهدیدات بازار قبل از رقبا با تحلیل هوشمند داده‌های لحظه‌ای
              </p>
              
              {/* Metric bars */}
              <div className="space-y-2">
                {[
                  { label: "تحلیل روند", value: 92, color: "from-emerald-500 to-teal-500" },
                  { label: "پیش‌بینی رفتار", value: 87, color: "from-teal-500 to-cyan-500" },
                  { label: "هشدار هوشمند", value: 95, color: "from-cyan-500 to-blue-500" }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    className="space-y-1"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="font-semibold text-slate-300">{item.value}%</span>
                    </div>
                    <div className="relative h-1 overflow-hidden rounded-full bg-slate-800/50">
                      <motion.div 
                        className={`absolute inset-y-0 right-0 bg-gradient-to-l ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer with pulse effect */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
              <span className="text-[10px] text-slate-500">
                آخرین بروزرسانی: لحظه‌ای
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-5 w-5 rounded-full border-2 border-slate-950 bg-gradient-to-br from-teal-400 to-cyan-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="text-[9px] text-slate-400">+2.4K تیم</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
