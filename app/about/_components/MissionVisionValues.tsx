"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Eye, Heart } from "lucide-react";

interface MissionVisionValuesProps {
  language: "en" | "fa";
}

export default function MissionVisionValues({
  language,
}: MissionVisionValuesProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      heading: "What Drives Us",
      cards: [
        {
          icon: <Target className="w-8 h-8" />,
          title: "Our Mission",
          description:
            "To empower businesses across Iran and beyond with intelligent, AI-driven management tools that simplify complexity and accelerate growth.",
          gradient: "from-teal-500 to-cyan-500",
        },
        {
          icon: <Eye className="w-8 h-8" />,
          title: "Our Vision",
          description:
            "To become the leading AI-powered business management platform in the Middle East, transforming how organizations operate and make decisions.",
          gradient: "from-cyan-500 to-blue-500",
        },
        {
          icon: <Heart className="w-8 h-8" />,
          title: "Our Values",
          description:
            "Innovation, integrity, customer success, and continuous learning. We believe in building technology that serves people and creates lasting value.",
          gradient: "from-blue-500 to-purple-500",
        },
      ],
    },
    fa: {
      heading: "آنچه ما را به پیش می‌برد",
      cards: [
        {
          icon: <Target className="w-8 h-8" />,
          title: "ماموریت ما",
          description:
            "توانمندسازی کسب‌وکارها در سراسر ایران و فراتر از آن با ابزارهای مدیریتی هوشمند مبتنی بر هوش مصنوعی که پیچیدگی را ساده و رشد را تسریع می‌کنند.",
          gradient: "from-teal-500 to-cyan-500",
        },
        {
          icon: <Eye className="w-8 h-8" />,
          title: "چشم‌انداز ما",
          description:
            "تبدیل شدن به پلتفرم پیشرو مدیریت کسب‌وکار مبتنی بر هوش مصنوعی در خاورمیانه و تحول در نحوه عملکرد و تصمیم‌گیری سازمان‌ها.",
          gradient: "from-cyan-500 to-blue-500",
        },
        {
          icon: <Heart className="w-8 h-8" />,
          title: "ارزش‌های ما",
          description:
            "نوآوری، صداقت، موفقیت مشتری و یادگیری مستمر. ما به ساخت فناوری‌ای اعتقاد داریم که در خدمت مردم باشد و ارزش پایدار ایجاد کند.",
          gradient: "from-blue-500 to-purple-500",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {currentContent.cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.2)] hover:-translate-y-1"
            >
              {/* Icon with Gradient Background */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{card.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed">
                {card.description}
              </p>

              {/* Decorative Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
