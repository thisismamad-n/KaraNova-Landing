'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Globe, 
  Building2, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Store,
  Laptop,
  Mail,
  Lock,
  User,
  Github
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  OnboardingData, 
  ActivityType, 
  BusinessSize, 
  BusinessStyle, 
  BusinessAge 
} from '../types';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types & Initial Data ---
const INITIAL_DATA: OnboardingData = {
  activityType: null,
  businessSize: null,
  businessStyle: null,
  businessAge: null,
  additionalInfo: '',
};

// --- Component ---
export default function OnboardingFlow() {
  const [step, setStep] = useState(0); // 0-4 = Questions, 5 = Auth
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Progress calculation (only for question steps 0-4)
  const progress = step <= 4 ? ((step + 1) / 5) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto" dir="rtl">
      
      {/* Progress Bar (shown only during questions) */}
      <AnimatePresence>
        {step <= 4 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 relative"
          >
            <div className="h-2 w-full border border-transparent bg-slate-900/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-l from-[hsl(177,100%,35%)] via-[hsl(190,95%,42%)] to-[hsl(177,100%,35%)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="absolute top-4 left-0 text-white/60 text-sm font-medium">
              مرحله {step + 1} از ۵
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <div className="relative group">
        {/* Large circular gradient glow at center - gradient defines the edges */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-[hsl(177,100%,35%)]/30 via-[hsl(177,100%,35%)]/15 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        {/* Card with invisible border that clips the gradient */}
        <div className="relative border border-transparent rounded-[2rem] p-8 md:p-12 overflow-hidden">

          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepWrapper key="step1">
                <Step1Activity data={data} updateData={updateData} onNext={nextStep} />
              </StepWrapper>
            )}
            {step === 1 && (
              <StepWrapper key="step2">
                <Step2Size data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
              </StepWrapper>
            )}
            {step === 2 && (
              <StepWrapper key="step3">
                <Step3Style data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
              </StepWrapper>
            )}
            {step === 3 && (
              <StepWrapper key="step4">
                <Step4Age data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
              </StepWrapper>
            )}
            {step === 4 && (
              <StepWrapper key="step5">
                <Step5Info data={data} updateData={updateData} onBack={prevStep} onNext={nextStep} />
              </StepWrapper>
            )}
            {step === 5 && (
              <StepWrapper key="step6">
                <StepAuth onComplete={nextStep} />
              </StepWrapper>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

// --- Animation Wrapper ---
function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// --- Step Components ---

// Step 0: Auth (Sign In / Sign Up)
function StepAuth({ onComplete }: { onComplete: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col gap-8 items-center max-w-md mx-auto w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[hsl(177,100%,35%)] to-[hsl(190,95%,42%)]">
          {isLogin ? 'خوش آمدید' : 'ساخت حساب کاربری'}
        </h2>
        <p className="text-white/60">
          {isLogin ? 'برای ادامه وارد حساب خود شوید' : 'برای شروع، حساب کاربری خود را بسازید'}
        </p>
      </div>

      {/* Toggle */}
      <div className="flex p-1 rounded-xl w-full border border-transparent bg-slate-900/10">
        <button 
          onClick={() => setIsLogin(true)}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-all relative overflow-hidden border border-transparent",
            isLogin ? "text-[hsl(177,100%,45%)]" : "text-white/40 hover:text-white/60"
          )}
        >
          {isLogin && (
            <div className="absolute inset-0 bg-gradient-radial from-[hsl(177,100%,35%)]/20 via-[hsl(177,100%,35%)]/10 to-transparent" />
          )}
          <span className="relative">ورود</span>
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-all relative overflow-hidden border border-transparent",
            !isLogin ? "text-[hsl(190,95%,52%)]" : "text-white/40 hover:text-white/60"
          )}
        >
          {!isLogin && (
            <div className="absolute inset-0 bg-gradient-radial from-[hsl(190,95%,42%)]/20 via-[hsl(190,95%,42%)]/10 to-transparent" />
          )}
          <span className="relative">ثبت‌نام</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4 w-full">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs text-white/40 mr-1">نام و نام خانوادگی</label>
            <div className="relative group">
              <User className="absolute right-3 top-3 w-5 h-5 text-white/30 group-focus-within:text-[hsl(190,95%,42%)] transition-colors z-10" />
              <input 
                type="text" 
                className="relative w-full border border-transparent rounded-xl px-10 py-3 text-white bg-slate-900/10 focus:outline-none transition-all placeholder:text-white/20"
                placeholder="مثال: علی محمدی"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <label className="text-xs text-white/40 mr-1">ایمیل</label>
          <div className="relative group">
            <Mail className="absolute right-3 top-3 w-5 h-5 text-white/30 group-focus-within:text-[hsl(177,100%,35%)] transition-colors z-10" />
            <input 
              type="email" 
              className="relative w-full border border-transparent rounded-xl px-10 py-3 text-white bg-slate-900/10 focus:outline-none transition-all placeholder:text-white/20"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/40 mr-1">رمز عبور</label>
          <div className="relative group">
            <Lock className="absolute right-3 top-3 w-5 h-5 text-white/30 group-focus-within:text-[hsl(190,95%,42%)] transition-colors z-10" />
            <input 
              type="password" 
              className="relative w-full border border-transparent rounded-xl px-10 py-3 text-white bg-slate-900/10 focus:outline-none transition-all placeholder:text-white/20"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[hsl(177,100%,35%)] to-[hsl(190,95%,42%)] text-white font-bold text-lg hover:shadow-[0_0_20px_hsl(177,100%,35%,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10"
      >
        {isLogin ? 'ورود به حساب' : 'شروع کنید'}
      </button>

      <div className="relative w-full text-center py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700/10"></div>
        </div>
        <span className="relative bg-slate-950 px-4 text-xs text-white/30">یا ادامه دهید با</span>
      </div>

      <div className="flex gap-3 w-full">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-transparent bg-slate-900/10 hover:bg-slate-900/20 transition-all text-white/70 hover:text-white">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
          </svg>
          <span className="text-sm">Google</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-transparent bg-slate-900/10 hover:bg-slate-900/20 transition-all text-white/70 hover:text-white">
          <Github className="w-5 h-5" />
          <span className="text-sm">Github</span>
        </button>
      </div>
    </div>
  );
}

// Step 1: Activity Type
function Step1Activity({ data, updateData, onNext }: any) {
  const options = [
    { id: ActivityType.SERVICES, label: 'خدمات', icon: Briefcase, desc: 'ارائه خدمات حرفه‌ای به مشتریان' },
    { id: ActivityType.PRODUCTION, label: 'تولید', icon: Building2, desc: 'ساخت و تولید محصولات فیزیکی' },
    { id: ActivityType.CONTENT, label: 'تولید محتوا', icon: Globe, desc: 'بلاگری، یوتیوب، آموزش آنلاین' },
    { id: ActivityType.OTHER, label: 'سایر', icon: Info, desc: 'فعالیت‌های دیگر' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center md:text-right">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          نوع فعالیت شما چیست؟
        </h2>
        <p className="text-lg text-white/60">لطفاً نزدیک‌ترین گزینه به کسب‌وکار خود را انتخاب کنید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={data.activityType === opt.id}
            onClick={() => {
              updateData({ activityType: opt.id });
              setTimeout(onNext, 300);
            }}
            icon={opt.icon}
            title={opt.label}
            desc={opt.desc}
          />
        ))}
      </div>
    </div>
  );
}

// Step 2: Business Size
function Step2Size({ data, updateData, onNext, onBack }: any) {
  const options = [
    { id: BusinessSize.SOLO, label: 'تک نفره', icon: Users, desc: 'فریلنسر یا کارآفرین مستقل' },
    { id: BusinessSize.SMALL, label: 'کوچک', icon: Users, desc: '۲ تا ۱۰ نفر پرسنل' },
    { id: BusinessSize.MEDIUM, label: 'متوسط', icon: Building2, desc: '۱۱ تا ۵۰ نفر پرسنل' },
    { id: BusinessSize.LARGE, label: 'بزرگ', icon: Building2, desc: 'بیش از ۵۰ نفر پرسنل' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center md:text-right">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          تیم شما چند نفره است؟
        </h2>
        <p className="text-lg text-white/60">اندازه سازمان خود را مشخص کنید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={data.businessSize === opt.id}
            onClick={() => {
              updateData({ businessSize: opt.id });
              setTimeout(onNext, 300);
            }}
            icon={opt.icon}
            title={opt.label}
            desc={opt.desc}
          />
        ))}
      </div>
      
      <NavigationButtons onBack={onBack} showNext={false} />
    </div>
  );
}

// Step 3: Business Style
function Step3Style({ data, updateData, onNext, onBack }: any) {
  const options = [
    { id: BusinessStyle.ONLINE, label: 'آنلاین', icon: Laptop, desc: 'فروشگاه اینترنتی، وب‌سایت، اپلیکیشن' },
    { id: BusinessStyle.OFFLINE, label: 'حضوری', icon: Store, desc: 'فروشگاه فیزیکی، دفتر کار' },
    { id: BusinessStyle.HYBRID, label: 'ترکیبی', icon: Globe, desc: 'فعالیت همزمان آنلاین و آفلاین' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center md:text-right">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          شیوه فعالیت کسب‌وکارتان؟
        </h2>
        <p className="text-lg text-white/60">نحوه تعامل شما با مشتریان چگونه است؟</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={data.businessStyle === opt.id}
            onClick={() => {
              updateData({ businessStyle: opt.id });
              setTimeout(onNext, 300);
            }}
            icon={opt.icon}
            title={opt.label}
            desc={opt.desc}
            horizontal
          />
        ))}
      </div>

      <NavigationButtons onBack={onBack} showNext={false} />
    </div>
  );
}

// Step 4: Business Age
function Step4Age({ data, updateData, onNext, onBack }: any) {
  const options = [
    { id: BusinessAge.NEW, label: 'تازه‌تاسیس', desc: 'کمتر از ۱ سال' },
    { id: BusinessAge.YOUNG, label: 'نوپا', desc: '۱ تا ۳ سال' },
    { id: BusinessAge.ESTABLISHED, label: 'جاافتاده', desc: '۳ تا ۱۰ سال' },
    { id: BusinessAge.VETERAN, label: 'قدیمی', desc: 'بیش از ۱۰ سال' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center md:text-right">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          سابقه فعالیت شما؟
        </h2>
        <p className="text-lg text-white/60">مدت زمانی که در این حوزه فعال هستید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={data.businessAge === opt.id}
            onClick={() => {
              updateData({ businessAge: opt.id });
              setTimeout(onNext, 300);
            }}
            title={opt.label}
            desc={opt.desc}
            icon={CheckCircle2} 
          />
        ))}
      </div>

      <NavigationButtons onBack={onBack} showNext={false} />
    </div>
  );
}

// Step 5: Additional Info
function Step5Info({ data, updateData, onBack, onNext }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call then proceed to Auth
    setTimeout(() => {
      setIsSubmitting(false);
      if (onNext) onNext();
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center md:text-right">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          توضیحات تکمیلی
        </h2>
        <p className="text-lg text-white/60">آیا نکته دیگری هست که باید بدانیم؟ (اختیاری)</p>
      </div>

      <div className="relative group">
        <textarea
          value={data.additionalInfo}
          onChange={(e) => updateData({ additionalInfo: e.target.value })}
          placeholder="توضیحات خود را اینجا بنویسید..."
          className="relative w-full h-40 border border-transparent rounded-2xl p-6 text-lg text-white bg-slate-900/10 placeholder:text-white/30 focus:outline-none transition-all resize-none selection:bg-[hsl(190,95%,42%)]/30"
        />
      </div>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="text-lg">بازگشت</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[hsl(177,100%,35%)] to-[hsl(190,95%,42%)] text-white font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_hsl(177,100%,35%,0.4)]"
        >
          <span>{isSubmitting ? 'در حال ثبت...' : 'ادامه به احراز هویت'}</span>
          {!isSubmitting && <CheckCircle2 className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function OptionCard({ selected, onClick, icon: Icon, title, desc, horizontal }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group flex flex-col items-start text-right p-6 rounded-2xl border border-transparent transition-all duration-300 w-full overflow-hidden",
        "hover:shadow-[0_0_40px_-10px_hsl(177,100%,35%,0.15)]",
        horizontal ? "flex-row items-center gap-6" : "gap-4",
        selected 
          ? "shadow-[0_0_30px_-5px_hsl(177,100%,35%,0.2)]" 
          : ""
      )}
    >
      {/* Gradient background for selected state */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-radial from-[hsl(177,100%,35%)]/20 via-[hsl(177,100%,35%)]/10 to-transparent rounded-2xl" />
      )}
      
      <div className={cn(
        "relative p-3 rounded-xl transition-all duration-300",
        selected ? "bg-[hsl(177,100%,35%)] text-white rotate-3 scale-110" : "bg-white/5 text-white group-hover:bg-white/10"
      )}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="relative flex flex-col gap-1">
        <span className={cn("text-xl font-semibold transition-colors", selected ? "text-white" : "text-white/90")}>
          {title}
        </span>
        {desc && <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{desc}</span>}
      </div>
      
      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-4 left-4 text-[hsl(177,100%,45%)] z-10">
          <CheckCircle2 className="w-6 h-6 drop-shadow-[0_0_10px_hsl(177,100%,35%,0.5)]" />
        </div>
      )}
    </button>
  );
}

function NavigationButtons({ onBack, onNext, showNext = true }: { onBack: () => void, onNext?: () => void, showNext?: boolean }) {
  return (
    <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-700/10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-transparent text-white/40 hover:text-white hover:bg-slate-900/10 transition-all"
      >
        <ChevronRight className="w-5 h-5" /> {/* RTL: Right is Back */}
        <span>بازگشت</span>
      </button>

      {showNext && onNext && (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-transparent bg-slate-900/10 hover:bg-slate-900/20 text-white font-medium transition-all"
        >
          <span>بعدی</span>
          <ChevronLeft className="w-5 h-5" /> {/* RTL: Left is Next */}
        </button>
      )}
    </div>
  );
}
