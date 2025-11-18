"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Rocket, Users, Award } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface CompanyTimelineProps {
  language: "en" | "fa";
}

export default function CompanyTimeline({ language }: CompanyTimelineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      heading: "Our Journey",
      milestones: [
        {
          year: "2020",
          title: "Foundation",
          description:
            "Karanova was founded with a vision to transform business management in Iran through AI technology.",
          icon: <Rocket className="w-6 h-6" />,
        },
        {
          year: "2021",
          title: "First Product Launch",
          description:
            "Launched TaskEase, our AI-integrated project management solution, serving 100+ early adopters.",
          icon: <Calendar className="w-6 h-6" />,
        },
        {
          year: "2022",
          title: "Team Expansion",
          description:
            "Grew to a team of 50+ talented professionals across engineering, design, and business.",
          icon: <Users className="w-6 h-6" />,
        },
        {
          year: "2023",
          title: "Platform Evolution",
          description:
            "Introduced Inova and BIQ modules, completing our comprehensive business management platform.",
          icon: <Award className="w-6 h-6" />,
        },
      ],
    },
    fa: {
      heading: "سفر ما",
      milestones: [
        {
          year: "۱۳۹۹",
          title: "تأسیس",
          description:
            "کارانوا با چشم‌اندازی برای تحول مدیریت کسب‌وکار در ایران از طریق فناوری هوش مصنوعی تأسیس شد.",
          icon: <Rocket className="w-6 h-6" />,
        },
        {
          year: "۱۴۰۰",
          title: "راه‌اندازی اولین محصول",
          description:
            "تسک‌ایز، راهکار مدیریت پروژه مبتنی بر هوش مصنوعی ما، با بیش از ۱۰۰ کاربر اولیه راه‌اندازی شد.",
          icon: <Calendar className="w-6 h-6" />,
        },
        {
          year: "۱۴۰۱",
          title: "گسترش تیم",
          description:
            "تیم ما به بیش از ۵۰ متخصص با استعداد در زمینه‌های مهندسی، طراحی و کسب‌وکار رسید.",
          icon: <Users className="w-6 h-6" />,
        },
        {
          year: "۱۴۰۲",
          title: "تکامل پلتفرم",
          description:
            "ماژول‌های اینووا و بی‌آی‌کیو را معرفی کردیم و پلتفرم جامع مدیریت کسب‌وکار خود را تکمیل کردیم.",
          icon: <Award className="w-6 h-6" />,
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

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500/50 via-cyan-500/50 to-transparent hidden sm:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {currentContent.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: language === "fa" ? 50 : -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex items-start gap-6 sm:gap-8"
              >
                {/* Icon Circle */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]">
                  {milestone.icon}
                </div>

                {/* Content Card */}
                <div className="flex-1 backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-teal-400">
                      {milestone.year}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
