"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Users, Lightbulb, Target, Heart } from "lucide-react";
import type { Language } from "@/lib/translations";

interface CultureShowcaseProps {
  language: Language;
}

export default function CultureShowcase({ language }: CultureShowcaseProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      title: "Our Culture",
      subtitle: "What makes Karanova a great place to work",
      values: [
        {
          icon: Users,
          title: "Collaborative",
          description: "We believe in the power of teamwork and open communication",
        },
        {
          icon: Lightbulb,
          title: "Innovative",
          description: "We encourage creative thinking and embrace new ideas",
        },
        {
          icon: Target,
          title: "Goal-Oriented",
          description: "We set ambitious goals and work together to achieve them",
        },
        {
          icon: Heart,
          title: "People-First",
          description: "We prioritize the well-being and growth of our team members",
        },
      ],
    },
    fa: {
      title: "فرهنگ ما",
      subtitle: "چه چیزی کارانوا را به محل کار عالی تبدیل می‌کند",
      values: [
        {
          icon: Users,
          title: "مشارکتی",
          description: "ما به قدرت کار تیمی و ارتباطات باز اعتقاد داریم",
        },
        {
          icon: Lightbulb,
          title: "نوآورانه",
          description: "ما تفکر خلاق را تشویق می‌کنیم و ایده‌های جدید را می‌پذیریم",
        },
        {
          icon: Target,
          title: "هدف‌محور",
          description: "ما اهداف بلندپروازانه تعیین می‌کنیم و برای دستیابی به آنها با هم کار می‌کنیم",
        },
        {
          icon: Heart,
          title: "انسان‌محور",
          description: "ما رفاه و رشد اعضای تیم خود را در اولویت قرار می‌دهیم",
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
      <div className="max-w-7xl mx-auto">
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

        {/* Culture Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {currentContent.values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative group",
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50",
                  "rounded-2xl p-6",
                  "hover:border-teal-500/50",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg mb-4",
                    "bg-gradient-to-br from-teal-500/20 to-cyan-500/20",
                    "flex items-center justify-center",
                    "group-hover:from-teal-500/30 group-hover:to-cyan-500/30",
                    "transition-all duration-300"
                  )}
                >
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
