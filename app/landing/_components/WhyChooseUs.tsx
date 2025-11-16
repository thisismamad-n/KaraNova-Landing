"use client";

import { cn } from "@/lib/utils";
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

interface WhyChooseUsProps {
  language?: "en" | "fa";
}

export default function WhyChooseUs({ language = "en" }: WhyChooseUsProps) {
  const title = "چرا کارانووا؟";
  const subtitle = "ساخته شده برای کسب‌وکارهای مدرن که به تعالی نیاز دارند";
  const features = [
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

  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden" dir="rtl">
      {/* Ambient glow effects - same as HeroStroke */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-cyan-400/14 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[22rem] h-[22rem] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="absolute w-[28rem] h-[28rem] rounded-full border border-teal-500/15 blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {features.map((feature, index) => (
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
  return (
    <div
      className={cn(
        "flex flex-col lg:border-l py-10 relative group/feature border-teal-500/20",
        (index === 3 || index === 7) && "lg:border-r border-teal-500/20",
        index < 4 && "lg:border-b border-teal-500/20"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-teal-900/20 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-teal-900/20 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-teal-400 group-hover/feature:text-teal-300 transition-colors duration-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute right-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tl-full rounded-bl-full bg-teal-700/50 group-hover/feature:bg-teal-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:-translate-x-2 transition duration-200 inline-block text-slate-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-slate-400 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
