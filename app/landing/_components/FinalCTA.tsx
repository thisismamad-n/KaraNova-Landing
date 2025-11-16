"use client";

import { ArrowRight } from "lucide-react";
import LaserFlow from "@/components/ui/LaserFlow";
import Squares from "@/app/_components/Squares";

export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col pb-0 min-h-[120vh] md:min-h-screen" dir="rtl">
      {/* Animated background grid - same as Testimonials */}
      <div className="absolute inset-0 -z-20">
        <Squares
          speed={0.3}
          direction="diagonal"
          squareSize={44}
          borderColor="rgba(94, 234, 212, 0.08)"
          hoverFillColor="rgba(20, 184, 166, 0.08)"
          baseColor="#020617"
          vignetteColor="rgba(2, 6, 23, 0.88)"
        />
      </div>

      {/* Ambient glow effects - same as Testimonials */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500/8 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-cyan-400/14 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[22rem] h-[22rem] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="absolute w-[28rem] h-[28rem] rounded-full border border-teal-500/15 blur-[60px]" />
      </div>

      {/* LaserFlow Background - matching HeroStroke gradient colors - Responsive positioning */}
      <div className="absolute inset-0 z-0 md:bottom-[35%] lg:bottom-[40%]">
        <LaserFlow
          color="#5EEAD4"
          wispDensity={1.3}
          flowSpeed={0.35}
          fogIntensity={0.45}
          verticalSizing={2}
          horizontalSizing={1.04}
          wispSpeed={14}
          wispIntensity={7.2}
          flowStrength={0.53}
          decay={1.1}
          falloffStart={1.2}
          fogFallSpeed={0.6}
          fogScale={0.3}
        />
      </div>

      {/* Content - Positioned at top away from laser glow */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16 sm:pt-24 md:pt-32 pb-8 md:pb-12 flex-shrink-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(94,234,212,0.3)]">
            آماده تحول در کسب‌وکار خود هستید؟
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100/90 mb-8 sm:mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4">
          به هزاران کسب‌وکاری که از کارانوا استفاده می‌کنند بپیوندید
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[var(--landing-primary)] to-[var(--landing-secondary)] rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,165,0.5)] hover:scale-105 flex items-center justify-center gap-2 flex-row-reverse shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            شروع آزمایش رایگان
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rotate-180" />
          </button>

          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400/50 rounded-full text-cyan-300 font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            درخواست دمو
          </button>
        </div>
      </div>

      {/* Footer Box at Bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-0 mt-auto flex-shrink-0">
        <div className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-black/40 backdrop-blur-xl overflow-hidden">
          {/* Dotted Pattern Background */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(94, 234, 212, 0.3) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
          
          {/* Top Glow Effect - simulating laser spread - Responsive */}
          <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 md:h-32 bg-gradient-to-b from-teal-400/20 via-cyan-500/10 to-transparent" />
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-16 sm:h-20 md:h-24"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(94, 234, 212, 0.3) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
          
          {/* Footer Content */}
          <div className="relative px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Company Info */}
              <div className="text-center sm:text-right">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">کارانوا</h3>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-3 sm:mb-4">
                  پلتفرم هوشمند مدیریت کسب‌وکار با قدرت هوش مصنوعی
                </p>
                <div className="flex gap-3 justify-center sm:justify-start">
                  <a href="#" className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300 hover:bg-teal-500/20 hover:border-teal-400/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300 hover:bg-teal-500/20 hover:border-teal-400/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300 hover:bg-teal-500/20 hover:border-teal-400/50 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>

              {/* محصولات */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">محصولات</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">Inova - هوش تجاری</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">TaskEase - مدیریت پروژه</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">BIQ - داشبورد تحلیلی</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">عوامل هوش مصنوعی</a></li>
                </ul>
              </div>

              {/* شرکت */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">شرکت</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">درباره ما</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">تیم ما</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">فرصت‌های شغلی</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">تماس با ما</a></li>
                </ul>
              </div>

              {/* منابع */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">منابع</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">مستندات</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">راهنمای API</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">وبلاگ</a></li>
                  <li><a href="#" className="text-sm text-slate-300/80 hover:text-teal-300 transition-colors">پشتیبانی</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-teal-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400">
                © ۲۰۲۵ کارانوا. تمامی حقوق محفوظ است.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">حریم خصوصی</a>
                <a href="#" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">شرایط استفاده</a>
                <a href="#" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">قوانین</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
