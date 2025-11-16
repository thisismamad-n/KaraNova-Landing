"use client";

import { CanvasAnimation } from "./AdvisorAnimations";
import { SlidePathDesigner } from "@/components/ui/slide-path-designer";

const FourAdvisorsSection = () => {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden text-white py-24 px-4"
      style={{ 
        zIndex: 20,
        background: 'linear-gradient(to bottom, #010203 0%, #020617 50%, #010203 100%)'
      }}
    >
      <SlidePathDesigner slideKey="landing-four-advisors" />
      {/* Ambient glow effects - matching HeroStroke exactly */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-[-18%] w-[30rem] h-[30rem] bg-cyan-400/14 rounded-full blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[22rem] h-[22rem] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="absolute w-[28rem] h-[28rem] rounded-full border border-teal-500/15 blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" dir="rtl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-teal-400/30 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-teal-200">چهار مشاور هوشمند، یک پلتفرم یکپارچه</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-balance">
            <span className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_18px_48px_rgba(8,47,73,0.55)]">
              مشاوران هوشمند
            </span>
            <br />
            <span className="text-white drop-shadow-[0_14px_36px_rgba(20,184,166,0.55)]">
              کارانوا
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed text-slate-100/85 text-balance">
            چهار هوش مصنوعی تخصصی که در کنار شما تصمیم می‌گیرند، تحلیل می‌کنند و کسب‌وکارتان را به جلو می‌برند
          </p>
        </div>

        {/* Four Advisor Animations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <CanvasAnimation title="Vision AI" animationId="sonar-sweep" />
            <div className="text-center" dir="rtl">
              <h3 className="text-xl font-bold text-teal-100 mb-2">دستیار چشم انداز</h3>
              <p className="text-sm text-slate-300/80 max-w-[320px]">
                تحلیل بازار، رقبا و فرصت‌های رشد با دید ۳۶۰ درجه
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <CanvasAnimation title="Creative AI" animationId="interconnecting-waves" />
            <div className="text-center" dir="rtl">
              <h3 className="text-xl font-bold text-teal-100 mb-2">دستیار خلاق</h3>
              <p className="text-sm text-slate-300/80 max-w-[320px]">
                تولید محتوا، طراحی و ایده‌پردازی خلاقانه
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <CanvasAnimation title="Supply AI" animationId="helix-scanner" />
            <div className="text-center" dir="rtl">
              <h3 className="text-xl font-bold text-teal-100 mb-2">دستیار رسان</h3>
              <p className="text-sm text-slate-300/80 max-w-[320px]">
                بهینه‌سازی زنجیره تامین و پیش‌بینی تقاضا
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <CanvasAnimation title="Govern AI" animationId="crystalline-cube-refraction" />
            <div className="text-center" dir="rtl">
              <h3 className="text-xl font-bold text-teal-100 mb-2">دستیار آیین</h3>
              <p className="text-sm text-slate-300/80 max-w-[320px]">
                مدیریت حاکمیت، ریسک و انطباق با استانداردها
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA or Stats */}
        <div className="mt-16 text-center" dir="rtl">
          <div className="inline-flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
              <p className="text-2xl font-bold text-white">۴ مشاور</p>
              <p className="text-sm text-white/70">همیشه در دسترس</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-teal-400/15 via-transparent to-transparent px-6 py-4 backdrop-blur-xl">
              <p className="text-2xl font-bold text-white">۲۴/۷</p>
              <p className="text-sm text-white/70">پشتیبانی هوشمند</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
              <p className="text-2xl font-bold text-white">یک پلتفرم</p>
              <p className="text-sm text-white/70">یکپارچه و هماهنگ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourAdvisorsSection;
