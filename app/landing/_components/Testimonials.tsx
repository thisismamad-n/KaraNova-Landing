"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { SlidePathDesigner } from "@/components/ui/slide-path-designer";

interface StatItem {
  percentage: string;
  logo: string;
  label: string;
  isIncrease: boolean;
}

export default function TestimonialsSection() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const stats: StatItem[] = [
    {
      percentage: "٪۶۰",
      label: "کاهش زمان مدیریت پروژه",
      isIncrease: false,
      logo: "/customer/netflix.png",
    },
    {
      percentage: "٪۸۵",
      label: "افزایش بهره‌وری تیم",
      isIncrease: true,
      logo: "/customer/vercel.png",
    },
    {
      percentage: "۴×",
      label: "سرعت تصمیم‌گیری",
      isIncrease: true,
      logo: "/customer/amazon.png",
    },
    {
      percentage: "۲۴/۷",
      label: "پشتیبانی هوش مصنوعی",
      isIncrease: true,
      logo: "/customer/alibaba.png",
    },
  ];

  return (
    <section id="testimonials-section" className="relative w-full min-h-screen pt-20 pb-0 overflow-hidden" dir="rtl">
      {/* Slide Path Designer */}
      <SlidePathDesigner slideKey="landing-testimonials" />

      {/* Static CSS Grid background - replaces animated canvas */}
      <div className="absolute inset-0 -z-20" style={{
        backgroundColor: '#020617',
        backgroundImage: `
          linear-gradient(to right, rgba(94, 234, 212, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(94, 234, 212, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }} />
      {/* Radial vignette overlay */}
      <div className="absolute inset-0 -z-19" style={{
        background: 'radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(2, 6, 23, 0.88) 100%)'
      }} />

      {/* Simple gradient fade-out at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-20">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(2, 6, 23, 0.5) 60%, rgba(2, 6, 23, 0.9) 100%)'
          }}
        />
      </div>

      {/* Ambient glow effects - same as WhyChooseUs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-cyan-400/14 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[22rem] h-[22rem] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="absolute w-[28rem] h-[28rem] rounded-full border border-teal-500/15 blur-[60px]" />
      </div>

      <div className="relative z-10 w-full grid place-content-center pt-16 pb-0 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-teal-500/10 backdrop-blur-sm border border-teal-400/30 text-teal-200 px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
              داستان‌های موفقیت
            </div>
          </div>

          <div className="text-center max-w-screen-xl mx-auto relative text-slate-100 z-50">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-slate-100 leading-tight">
              کسب‌وکارهای پیشرو <br className="sm:hidden" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="inline-block mx-2 align-middle relative z-50"
                      onMouseEnter={() => setHoveredImage("ops")}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <div
                        className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:w-24 rounded-full border-2 border-teal-400/40"
                        aria-expanded={hoveredImage === "ops"}
                        data-hovered={hoveredImage === "ops"}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://pro-section.ui-layouts.com/people/aam1.png`}
                          alt="مدیرعامل شرکت فناوری"
                          className="object-cover w-full h-full"
                          style={{ objectPosition: "center" }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-xs bg-slate-900/98 backdrop-blur-xl text-slate-100 p-4 rounded-lg shadow-2xl border border-teal-500/30 z-[9999]"
                    sideOffset={8}
                  >
                    <p className="mb-2 text-sm leading-relaxed">
                      «کارانووا به ما کمک کرد تا زمان مدیریت پروژه‌ها را ۶۰٪ کاهش دهیم. حالا تیم ما روی نوآوری تمرکز می‌کند، نه کارهای تکراری.»
                    </p>
                    <p className="font-medium text-sm text-teal-300">سارا احمدی، مدیرعامل تک‌استارت</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              با کارانووا
            </h1>

            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-slate-100 leading-tight">
              تحول دیجیتال را
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="inline-block mx-2 align-middle z-50"
                      onMouseEnter={() => setHoveredImage("finance")}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <div
                        className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 hover:w-20 rounded-full border-2 border-teal-400/40"
                        aria-expanded={hoveredImage === "finance"}
                        data-hovered={hoveredImage === "finance"}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://pro-section.ui-layouts.com/people/aam3.jpg`}
                          alt="مدیر عملیات"
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-xs bg-slate-900/98 backdrop-blur-xl text-slate-100 p-4 rounded-lg shadow-2xl border border-teal-500/30 z-[9999]"
                    sideOffset={8}
                  >
                    <p className="mb-2 text-sm leading-relaxed">
                      «عوامل هوش مصنوعی کارانووا مثل یک تیم تحلیلگر ۲۴ ساعته عمل می‌کنند. تصمیم‌گیری‌های ما حالا مبتنی بر داده و سریع است.»
                    </p>
                    <p className="font-medium text-sm text-teal-300">امیر رضایی، مدیر عملیات پارس‌تک</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              تجربه می‌کنند
            </h1>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-teal-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent leading-tight">
              و رشد پایدار می‌سازند
            </h1>
          </div>
          <div className="sm:flex grid grid-cols-2 gap-8 bg-slate-900/40 backdrop-blur-md mt-8 w-full mx-auto px-8 py-6 border rounded-md border-teal-500/20">
            {stats.map((stat, index) => (
              <div
                key={stat?.label}
                className="flex-1 flex gap-4 pl-10 relative"
              >
                {index !== 0 && (
                  <div className="w-0.5 h-9 border border-dashed border-teal-500/30 absolute left-0" />
                )}
                <div className="w-full h-full group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://pro-section.ui-layouts.com/${stat?.logo}`}
                    alt={stat.label}
                    className="w-[85%] h-10 object-contain grayscale opacity-60 mx-auto translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute left-0 top-8 opacity-0 flex flex-col items-center justify-center w-full group-hover:-top-3.5 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="flex items-center justify-center gap-2 relative">
                      {stat.isIncrease ? (
                        <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-teal-400" />
                      )}
                      <span className="md:text-4xl text-2xl font-semibold text-slate-100">
                        {stat.percentage}
                      </span>
                    </div>
                    <p className="text-slate-300 md:text-sm text-xs text-center capitalize">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
