"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Palette, BarChart3, Lightbulb } from "lucide-react";

interface TeamHighlightsProps {
  language: "en" | "fa";
}

export default function TeamHighlights({ language }: TeamHighlightsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      heading: "Our Team",
      subtitle:
        "A diverse group of passionate professionals dedicated to building the future of business management",
      departments: [
        {
          icon: <Code className="w-8 h-8" />,
          title: "Engineering",
          description:
            "World-class developers building scalable, secure, and intelligent systems with cutting-edge AI technology.",
          count: "25+",
          gradient: "from-teal-500 to-cyan-500",
        },
        {
          icon: <Palette className="w-8 h-8" />,
          title: "Design",
          description:
            "Creative minds crafting beautiful, intuitive experiences that delight users and drive engagement.",
          count: "10+",
          gradient: "from-cyan-500 to-blue-500",
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Business",
          description:
            "Strategic thinkers driving growth, partnerships, and customer success across markets.",
          count: "12+",
          gradient: "from-blue-500 to-purple-500",
        },
        {
          icon: <Lightbulb className="w-8 h-8" />,
          title: "Innovation",
          description:
            "Researchers and visionaries exploring new frontiers in AI and business intelligence.",
          count: "8+",
          gradient: "from-purple-500 to-pink-500",
        },
      ],
    },
    fa: {
      heading: "تیم ما",
      subtitle:
        "گروهی متنوع از متخصصان پرشور که به ساخت آینده مدیریت کسب‌وکار اختصاص دارند",
      departments: [
        {
          icon: <Code className="w-8 h-8" />,
          title: "مهندسی",
          description:
            "توسعه‌دهندگان درجه یک جهانی که سیستم‌های مقیاس‌پذیر، امن و هوشمند با فناوری هوش مصنوعی پیشرفته می‌سازند.",
          count: "۲۵+",
          gradient: "from-teal-500 to-cyan-500",
        },
        {
          icon: <Palette className="w-8 h-8" />,
          title: "طراحی",
          description:
            "ذهن‌های خلاق که تجربیات زیبا و شهودی می‌سازند که کاربران را خوشحال و درگیر می‌کنند.",
          count: "۱۰+",
          gradient: "from-cyan-500 to-blue-500",
        },
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "کسب‌وکار",
          description:
            "متفکران استراتژیک که رشد، مشارکت‌ها و موفقیت مشتری را در بازارها هدایت می‌کنند.",
          count: "۱۲+",
          gradient: "from-blue-500 to-purple-500",
        },
        {
          icon: <Lightbulb className="w-8 h-8" />,
          title: "نوآوری",
          description:
            "محققان و صاحب‌نظرانی که مرزهای جدید در هوش مصنوعی و هوش تجاری را کاوش می‌کنند.",
          count: "۸+",
          gradient: "from-purple-500 to-pink-500",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-16 sm:py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">
            {currentContent.heading}
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {currentContent.departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.2)]"
            >
              {/* Header with Icon and Count */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${dept.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{dept.icon}</div>
                </div>
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text">
                  {dept.count}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-100 mb-3">
                {dept.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed">
                {dept.description}
              </p>

              {/* Decorative Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${dept.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
