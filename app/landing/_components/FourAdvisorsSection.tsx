"use client";

import { CanvasAnimation } from "./AdvisorAnimations";
import { SlidePathDesigner } from "@/components/ui/slide-path-designer";
import { ArrowLeft } from "lucide-react";

const FourAdvisorsSection = () => {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden text-white py-24 px-4"
      style={{
        zIndex: 20,
      }}
    >
      <SlidePathDesigner slideKey="landing-four-advisors" />

      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[40rem] h-[40rem] rounded-full bg-teal-500/5 blur-[120px] opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20" dir="rtl">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-lg shadow-teal-900/20 hover:border-teal-500/30 transition-colors duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            <span className="text-sm font-medium text-teal-100/90 tracking-wide">چهار مشاور هوشمند، یک پلتفرم یکپارچه</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
            <span className="bg-gradient-to-r from-white via-teal-100 to-slate-300 bg-clip-text text-transparent drop-shadow-lg">
              مشاوران هوشمند
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(45,212,191,0.3)]">
              کارانوا
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300/90 leading-relaxed font-light">
            چهار هوش مصنوعی تخصصی که در کنار شما تصمیم می‌گیرند، تحلیل می‌کنند و کسب‌وکارتان را به جلو می‌برند
          </p>
        </div>

        {/* Four Advisor Animations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <AdvisorCard
            href="/products/inova"
            title="دستیار چشم انداز"
            englishTitle="Vision AI"
            description="تحلیل بازار، رقبا و فرصت‌های رشد با دید ۳۶۰ درجه"
            animationId="sonar-sweep"
          />

          <AdvisorCard
            href="/products/inova"
            title="دستیار خلاق"
            englishTitle="Creative AI"
            description="تولید محتوا، طراحی و ایده‌پردازی خلاقانه"
            animationId="interconnecting-waves"
          />

          <AdvisorCard
            href="/products/inova"
            title="دستیار رسان"
            englishTitle="Supply AI"
            description="بهینه‌سازی زنجیره تامین و پیش‌بینی تقاضا"
            animationId="helix-scanner"
          />

          <AdvisorCard
            href="/products/inova"
            title="دستیار آیین"
            englishTitle="Govern AI"
            description="مدیریت حاکمیت، ریسک و انطباق با استانداردها"
            animationId="crystalline-cube-refraction"
          />
        </div>

        {/* Bottom Stats */}
        <div className="mt-24" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StatCard value="۴ مشاور" label="همیشه در دسترس" />
            <StatCard value="۲۴/۷" label="پشتیبانی هوشمند" highlight />
            <StatCard value="یک پلتفرم" label="یکپارچه و هماهنگ" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-components for cleaner code

const AdvisorCard = ({
  href,
  title,
  englishTitle,
  description,
  animationId
}: {
  href: string;
  title: string;
  englishTitle: string;
  description: string;
  animationId: any;
}) => (
  <a
    href={href}
    className="group relative flex flex-col items-center p-8 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-sm transition-all duration-500 hover:border-teal-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_50px_-12px_rgba(20,184,166,0.2)] overflow-hidden"
  >
    {/* Hover Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10 flex flex-col items-center w-full">
      <div className="transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2">
        <CanvasAnimation title={englishTitle} animationId={animationId} />
      </div>

      <div className="mt-8 text-center space-y-3 w-full" dir="rtl">
        <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base text-slate-400 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed max-w-xs mx-auto font-light">
          {description}
        </p>

        <div className="pt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex justify-center">
          <span className="inline-flex items-center gap-2 text-teal-400 text-sm font-medium border-b border-teal-400/30 pb-0.5 hover:text-teal-300 hover:border-teal-300">
            مشاهده جزئیات
            <ArrowLeft className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  </a>
);

const StatCard = ({ value, label, highlight = false }: { value: string, label: string, highlight?: boolean }) => (
  <div className={`
    relative overflow-hidden rounded-2xl border px-8 py-6 backdrop-blur-xl transition-all duration-300 hover:transform hover:scale-105
    ${highlight
      ? 'border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-transparent shadow-[0_0_30px_-5px_rgba(20,184,166,0.15)]'
      : 'border-white/10 bg-white/5 hover:bg-white/10'
    }
  `}>
    <div className="flex flex-col items-center text-center gap-1">
      <p className={`text-2xl font-bold ${highlight ? 'text-teal-200' : 'text-white'}`}>
        {value}
      </p>
      <p className="text-sm text-slate-400">
        {label}
      </p>
    </div>
  </div>
);

export default FourAdvisorsSection;
