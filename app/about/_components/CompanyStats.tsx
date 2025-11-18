"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Building2, Globe, TrendingUp } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

interface CompanyStatsProps {
  language: "en" | "fa";
}

// Simple counter animation hook
function useCounter(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) {
      // Reset via animation frame to avoid synchronous setState
      rafRef.current = requestAnimationFrame(() => {
        setCount(0);
      });
      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, shouldStart]);

  return count;
}

export default function CompanyStats({ language }: CompanyStatsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const content = {
    en: {
      heading: "Our Impact",
      stats: [
        {
          icon: <Users className="w-8 h-8" />,
          value: 5000,
          suffix: "+",
          label: "Active Users",
        },
        {
          icon: <Building2 className="w-8 h-8" />,
          value: 500,
          suffix: "+",
          label: "Organizations",
        },
        {
          icon: <Globe className="w-8 h-8" />,
          value: 15,
          suffix: "+",
          label: "Countries Served",
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          value: 60,
          suffix: "%",
          label: "Time Saved",
        },
      ],
    },
    fa: {
      heading: "تأثیر ما",
      stats: [
        {
          icon: <Users className="w-8 h-8" />,
          value: 5000,
          suffix: "+",
          label: "کاربر فعال",
        },
        {
          icon: <Building2 className="w-8 h-8" />,
          value: 500,
          suffix: "+",
          label: "سازمان",
        },
        {
          icon: <Globe className="w-8 h-8" />,
          value: 15,
          suffix: "+",
          label: "کشور خدمات‌دهی",
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          value: 60,
          suffix: "%",
          label: "صرفه‌جویی در زمان",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-16 sm:py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent"
        >
          {currentContent.heading}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {currentContent.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: Stat;
  index: number;
  inView: boolean;
}) {
  const count = useCounter(stat.value, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 mb-4 shadow-lg">
        <div className="text-white">{stat.icon}</div>
      </div>

      {/* Animated Number */}
      <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text mb-2">
        {count}
        {stat.suffix}
      </div>

      {/* Label */}
      <div className="text-slate-300 text-sm sm:text-base font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
}
