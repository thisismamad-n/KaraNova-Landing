"use client";

import {
  Brain,
  Clock,
  Languages,
  Users,
  BarChart3,
  ShieldCheck,
  Rocket,
  Sparkles,
} from "lucide-react";
import { SlidePathDesigner } from "@/components/ui/slide-path-designer";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface WhyChooseUsProps {
  language?: "en" | "fa";
}

// Optimization: Moved static content and array of features outside the component
// to prevent memory re-allocation and unnecessary object creation on every render.
const STATIC_TITLE = "چرا کارانووا؟";
const STATIC_SUBTITLE = "ساخته شده برای کسب‌وکارهای مدرن که به تعالی نیاز دارند";
const STATIC_FEATURES = [
  {
    title: "هوش مصنوعی پیشرفته",
    description: "۴ عامل هوش مصنوعی تخصصی که ۲۴/۷ برای بهینه‌سازی عملیات کسب‌وکار شما کار می‌کنند.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: "کاهش ۶۰٪ زمان",
    description: "زمان مدیریت پروژه را با اتوماسیون هوشمند و گردش کار به نصف کاهش دهید.",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "پشتیبانی دوزبانه",
    description: "پشتیبانی کامل RTL برای فارسی با یکپارچگی یکپارچه انگلیسی.",
    icon: <Languages className="w-6 h-6" />,
  },
  {
    title: "همکاری لحظه‌ای",
    description: "معماری چند مستاجره با سلسله مراتب و جداسازی مبتنی بر سازمان.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "هوش تجاری",
    description: "ردیابی جامع KPI و نظارت بر سلامت از طریق داشبورد BIQ.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "امنیت سازمانی",
    description: "امنیت در سطح بانکی با جداسازی کامل داده‌ها و انطباق.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "استقرار سریع",
    description: "در عرض چند دقیقه با راه‌اندازی و تنظیم شهودی شروع کنید.",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    title: "نوآوری مستمر",
    description: "به‌روزرسانی‌های منظم با ویژگی‌های هوش مصنوعی پیشرفته و بهبودها.",
    icon: <Sparkles className="w-6 h-6" />,
  },
];

export default function WhyChooseUs({ language = "en" }: WhyChooseUsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section id="why-choose-section" ref={sectionRef} className="relative w-full min-h-screen py-20 overflow-hidden" dir="rtl">
      <SlidePathDesigner slideKey="landing-why-choose" />
      {/* Ambient glow effects - same as HeroStroke */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-cyan-400/14 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[22rem] h-[22rem] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="absolute w-[28rem] h-[28rem] rounded-full border border-teal-500/15 blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-emerald-500/20 blur-2xl" />
              <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                {STATIC_TITLE}
              </h2>
            </div>
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {STATIC_SUBTITLE}
          </motion.p>
        </motion.div>

        {/* Features Grid with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl shadow-teal-500/10">
          {STATIC_FEATURES.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  const featureRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featureRef, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={featureRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="relative group/feature bg-slate-900/40 backdrop-blur-md p-8 hover:bg-slate-900/60 transition-all duration-500"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-emerald-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(20,184,166,0.1),transparent_50%)]" />
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-teal-400/50 to-transparent" />
      </div>

      {/* Icon with CSS transitions instead of Framer Motion */}
      <div className="mb-6 relative z-10 transition-transform duration-200 hover:scale-110 hover:rotate-[5deg]">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl blur-xl group-hover/feature:blur-2xl transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-4 rounded-xl border border-teal-500/20 group-hover/feature:border-teal-400/40 transition-all duration-500 backdrop-blur-sm">
            <div className="text-teal-400 group-hover/feature:text-teal-300 transition-colors duration-500 group-hover/feature:drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]">
              {icon}
            </div>
          </div>
        </div>
      </div>

      {/* Title with accent bar */}
      <div className="relative z-10 mb-3">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-0 group-hover/feature:w-12 bg-gradient-to-l from-teal-500 to-cyan-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
        <h3 className="text-xl font-bold text-slate-100 group-hover/feature:text-white transition-colors duration-300 pr-16">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-400 group-hover/feature:text-slate-300 transition-colors duration-300 relative z-10">
        {description}
      </p>

      {/* Corner accent */}
      <div className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-teal-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-teal-500/50 to-transparent" />
      </div>
    </motion.div>
  );
};
