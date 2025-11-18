"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Clock,
  GraduationCap,
  Heart,
  Home,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { Language } from "@/lib/translations";

interface BenefitsGridProps {
  language: Language;
}

export default function BenefitsGrid({ language }: BenefitsGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      title: "Benefits & Perks",
      subtitle: "We invest in our team's success and well-being",
      benefits: [
        {
          icon: Briefcase,
          title: "Competitive Salary",
          description: "Market-leading compensation packages",
        },
        {
          icon: Clock,
          title: "Flexible Hours",
          description: "Work-life balance with flexible scheduling",
        },
        {
          icon: Home,
          title: "Remote Options",
          description: "Hybrid and remote work opportunities",
        },
        {
          icon: Heart,
          title: "Health Insurance",
          description: "Comprehensive health coverage for you and family",
        },
        {
          icon: GraduationCap,
          title: "Learning Budget",
          description: "Annual budget for courses and conferences",
        },
        {
          icon: TrendingUp,
          title: "Career Growth",
          description: "Clear career paths and promotion opportunities",
        },
        {
          icon: Users,
          title: "Team Events",
          description: "Regular team building and social activities",
        },
        {
          icon: Zap,
          title: "Latest Tech",
          description: "Work with cutting-edge tools and technologies",
        },
      ],
    },
    fa: {
      title: "مزایا و امکانات",
      subtitle: "ما در موفقیت و رفاه تیم خود سرمایه‌گذاری می‌کنیم",
      benefits: [
        {
          icon: Briefcase,
          title: "حقوق رقابتی",
          description: "بسته‌های جبران خدمات پیشرو در بازار",
        },
        {
          icon: Clock,
          title: "ساعات کاری انعطاف‌پذیر",
          description: "تعادل کار و زندگی با برنامه‌ریزی انعطاف‌پذیر",
        },
        {
          icon: Home,
          title: "گزینه‌های دورکاری",
          description: "فرصت‌های کار ترکیبی و دورکاری",
        },
        {
          icon: Heart,
          title: "بیمه درمان",
          description: "پوشش بیمه جامع برای شما و خانواده",
        },
        {
          icon: GraduationCap,
          title: "بودجه آموزشی",
          description: "بودجه سالانه برای دوره‌ها و کنفرانس‌ها",
        },
        {
          icon: TrendingUp,
          title: "رشد شغلی",
          description: "مسیرهای شغلی واضح و فرصت‌های ارتقا",
        },
        {
          icon: Users,
          title: "رویدادهای تیمی",
          description: "فعالیت‌های منظم تیم‌سازی و اجتماعی",
        },
        {
          icon: Zap,
          title: "فناوری روز",
          description: "کار با ابزارها و فناوری‌های پیشرفته",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section
      ref={ref}
      className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
              "bg-gradient-to-r from-slate-100 via-teal-200 to-cyan-200",
              "bg-clip-text text-transparent"
            )}
          >
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentContent.benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn(
                  "relative group",
                  "backdrop-blur-md bg-slate-900/40",
                  "border border-slate-800/50",
                  "rounded-xl p-6",
                  "hover:border-cyan-500/50",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
                  "hover:-translate-y-1"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg mb-3",
                    "bg-gradient-to-br from-cyan-500/20 to-teal-500/20",
                    "flex items-center justify-center",
                    "group-hover:from-cyan-500/30 group-hover:to-teal-500/30",
                    "transition-all duration-300"
                  )}
                >
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-100 mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
