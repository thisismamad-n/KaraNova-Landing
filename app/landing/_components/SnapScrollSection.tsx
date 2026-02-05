"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useSpring, animate, useMotionValue } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { SlidePathDesigner } from "@/components/ui/slide-path-designer";
import { useMediaQuery } from "@/hooks/use-media-query";

const SnapScrollSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const hasLockedInitialRef = useRef(false);
  const animationTimeoutRef = useRef<number | null>(null);

  const scrollToSlide = useCallback((nextIndex: number) => {
    const target = slideRefs.current[nextIndex];
    if (!target) return;

    isAnimatingRef.current = true;
    activeIndexRef.current = nextIndex;

    const rect = target.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    window.scrollTo({ top: Math.round(absoluteTop), behavior: "smooth" });

    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 650);
  }, []);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      const deltaY = event.deltaY;
      if (Math.abs(deltaY) < 12) return;

      const totalSlides = slideRefs.current.length;
      if (!totalSlides) return;

      const isScrollingDown = deltaY > 0;
      const firstSlide = slideRefs.current[0];
      const isAtFirstSlide = activeIndexRef.current === 0;
      const isAtLastSlide = activeIndexRef.current === totalSlides - 1;

      if (
        isScrollingDown &&
        isAtFirstSlide &&
        !hasLockedInitialRef.current &&
        firstSlide
      ) {
        const rect = firstSlide.getBoundingClientRect();
        const isAlignedToTop = Math.abs(rect.top) < 8;

        if (!isAlignedToTop) {
          event.preventDefault();
          scrollToSlide(0);
          hasLockedInitialRef.current = true;
          return;
        }

        hasLockedInitialRef.current = true;
      }

      if (isScrollingDown && isAtLastSlide) {
        event.preventDefault();
        if (isAnimatingRef.current) return;
        const currentSection = containerRef.current as HTMLElement | null;
        const nextSection = currentSection?.nextElementSibling as HTMLElement | null;
        if (nextSection) {
          isAnimatingRef.current = true;
          const top = Math.round(window.scrollY + nextSection.getBoundingClientRect().top);
          window.scrollTo({ top, behavior: "smooth" });
          if (animationTimeoutRef.current) {
            window.clearTimeout(animationTimeoutRef.current);
          }
          animationTimeoutRef.current = window.setTimeout(() => {
            isAnimatingRef.current = false;
          }, 650);
        }
        return;
      }

      if (!isScrollingDown && isAtFirstSlide) {
        const rect = firstSlide?.getBoundingClientRect();
        const aligned = rect ? Math.abs(rect.top) < 8 : true;
        if (aligned) {
          event.preventDefault();
          if (isAnimatingRef.current) return;
          const currentSection = containerRef.current as HTMLElement | null;
          const prevSection = currentSection?.previousElementSibling as HTMLElement | null;
          if (prevSection) {
            isAnimatingRef.current = true;
            const top = Math.round(window.scrollY + prevSection.getBoundingClientRect().top);
            window.scrollTo({ top, behavior: "smooth" });
            if (animationTimeoutRef.current) {
              window.clearTimeout(animationTimeoutRef.current);
            }
            animationTimeoutRef.current = window.setTimeout(() => {
              isAnimatingRef.current = false;
            }, 650);
          }
          return;
        }
      }

      const direction = deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        totalSlides - 1,
        Math.max(0, activeIndexRef.current + direction)
      );

      if (nextIndex === activeIndexRef.current) {
        return;
      }

      event.preventDefault();

      if (isAnimatingRef.current) {
        return;
      }

      scrollToSlide(nextIndex);
    };

    if (!isMobile) {
      element.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (!isMobile) {
        element.removeEventListener("wheel", handleWheel);
      }
    };
  }, [scrollToSlide, isMobile]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          hasLockedInitialRef.current = false;
          activeIndexRef.current = 0;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;
    const className = "grid-second-slide";

    body.classList.add(className);

    return () => {
      body.classList.remove(className);
    };
  }, []);

  useEffect(() => {
    const setVh = () => {
      if (typeof window === "undefined") return;
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate w-full overflow-hidden text-white"
      style={{ zIndex: 20 }}
    >
      <div
        ref={(el) => {
          slideRefs.current[0] = el;
        }}
        className="relative z-10"
        style={{ height: isMobile ? "auto" : "calc(var(--vh, 1vh) * 100)", minHeight: isMobile ? "min(100vh, 800px)" : "auto" }}
      >
        <AnimatedNumber_001 isMobile={isMobile} />
        <SlidePathDesigner slideKey="landing-snap-001" />
      </div>
      <div
        ref={(el) => {
          slideRefs.current[1] = el;
        }}
        className="relative z-10"
        style={{ height: isMobile ? "auto" : "calc(var(--vh, 1vh) * 100)", minHeight: isMobile ? "min(100vh, 800px)" : "auto" }}
      >
        <AnimatedNumber_002 isMobile={isMobile} />
        <SlidePathDesigner slideKey="landing-snap-002" />
      </div>
      <div
        ref={(el) => {
          slideRefs.current[2] = el;
        }}
        className="relative z-10"
        style={{ height: isMobile ? "auto" : "calc(var(--vh, 1vh) * 100)", minHeight: isMobile ? "min(100vh, 800px)" : "auto" }}
      >
        <AnimatedNumber_003 isMobile={isMobile} />
        <SlidePathDesigner slideKey="landing-snap-003" />
      </div>
      <div
        ref={(el) => {
          slideRefs.current[3] = el;
        }}
        className="relative z-10"
        style={{ height: isMobile ? "auto" : "calc(var(--vh, 1vh) * 100)", minHeight: isMobile ? "min(100vh, 800px)" : "auto" }}
      >
        <AnimatedNumber_004 isMobile={isMobile} />
        <SlidePathDesigner slideKey="landing-snap-004" />
      </div>
    </section>
  );
};

const AnimatedNumber_001 = ({ isMobile }: { isMobile?: boolean }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const [count, setCount] = useState(60);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.35 });

  // Reset count when not in view or when resetTrigger changes
  useEffect(() => {
    if (!inView || resetTrigger > 0) {
      const timeoutId = setTimeout(() => setCount(60), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, resetTrigger]);

  useEffect(() => {
    if (isPaused || !inView) return;

    const id = setInterval(() => {
      setCount((c) => {
        if (c === 0) {
          return 60;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isPaused, inView]);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div ref={ref} className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-slate-100 py-24 sm:py-0">
      <SlideHalo accent="teal" />
      {/* Badge - positioned relative on mobile, absolute on desktop */}
      <div className={`${isMobile ? "relative mb-4 mt-8" : "absolute left-1/2 -translate-x-1/2 top-32"} grid content-start justify-items-center text-center text-slate-100`}>
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          <span className="max-w-[28ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            راه‌اندازی در کمتر از 60 ثانیه
          </span>
          <div className="h-10 sm:h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      {/* Large Number - smaller on mobile */}
      <div className="relative font-bebas-neue text-[28vw] sm:text-[20vw] tracking-tight">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[32vw] w-[32vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/15 blur-[130px]" />
          <div className="absolute left-1/2 top-1/2 h-[26vw] w-[26vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-35" />
        </div>
        <span className="inline-flex items-center">
          <NumberFlow value={count} />
        </span>
      </div>
      <div className="flex w-fit items-center gap-3">
        <motion.button
          aria-label="Pause timer"
          onClick={() => setIsPaused((p) => !p)}
          whileTap={{ scale: 0.9 }}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_18px_45px_rgba(8,15,40,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200/70 hover:bg-white/20 hover:shadow-[0_25px_55px_rgba(15,118,110,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/80"
        >
          <AnimatePresence initial={false} mode="wait">
            {isPaused ? (
              <motion.svg
                key="play"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                transition={{ duration: 0.1 }}
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current text-white drop-shadow-[0_4px_16px_rgba(13,148,136,0.55)]"
              >
                <path d="M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="pause"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                transition={{ duration: 0.1 }}
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current text-white drop-shadow-[0_4px_16px_rgba(13,148,136,0.55)]"
              >
                <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
        <button
          aria-label="Reset timer"
          onClick={handleReset}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-teal-200 shadow-[0_15px_45px_rgba(2,6,23,0.65)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200/60 hover:bg-slate-900/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-100/60"
        >
          <Plus className="h-4 w-4 rotate-45 transition-colors" />
        </button>
      </div>
      <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 text-right text-white/80 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">تاخیر کمتر از ۹۰۰ میلی‌ثانیه</p>
          <p className="mt-1 text-sm text-white/70">پاسخ‌دهی سامانه در سنگین‌ترین سناریوهای کاری</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-teal-400/15 via-transparent to-transparent px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">پایش ۲۴/۷</p>
          <p className="mt-1 text-sm text-white/70">مهندسی اعتبار با خودکارسازی گردش‌کارهای حیاتی</p>
        </div>
      </div>
    </div>
  );
};

export const AnimatedNumber_002 = ({ isMobile }: { isMobile?: boolean }) => {
  const finalCount = 500;
  const [displaySubs, setDisplaySubs] = useState(0);

  // Animating sub count from 0 to subscriberCount prop
  const springSubCount = useSpring(0, {
    bounce: 0,
    duration: 1000,
  });

  useEffect(() => {
    const unsubscribe = springSubCount.on("change", (value) => {
      setDisplaySubs(Math.round(value));
    });

    return () => {
      unsubscribe();
    };
  }, [springSubCount]);

  const animateCount = () => {
    springSubCount.set(finalCount);
  };

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-slate-100 py-24 sm:py-0">
      <SlideHalo accent="cyan" />
      {/* Badge - positioned relative on mobile, absolute on desktop */}
      <div className={`${isMobile ? "relative mb-4 mt-8" : "absolute left-1/2 -translate-x-1/2 top-32"} grid content-start justify-items-center text-center text-slate-100`}>
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          <span className="max-w-[30ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            پایش سیگنال‌ها و رویدادها در آی نوا ،تسک ایز و بی آی کیو
          </span>
          <div className="h-10 sm:h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      {/* Large Number - smaller on mobile */}
      <motion.div
        onViewportEnter={animateCount}
        onViewportLeave={() => {
          springSubCount.set(0);
        }}
        className="relative font-bebas-neue text-[28vw] sm:text-[20vw] tracking-tight"
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[30vw] w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/14 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-[24vw] w-[24vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-30" />
        </div>
        {displaySubs}
      </motion.div>
      <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 text-right text-white/80 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">۵۰۰ مسیر سیگنال سالم</p>
          <p className="mt-1 text-sm text-white/70">همگام‌سازی خودکار با هاب‌های داده داخلی و ابری</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/15 via-transparent to-transparent px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">پوشش ۳ سکوی کلیدی</p>
          <p className="mt-1 text-sm text-white/70">آی نوا، تسک ایز و بی‌آی‌کیو در یک داشبورد یکپارچه</p>
        </div>
      </div>
    </div>
  );
};

export const AnimatedNumber_003 = ({ isMobile }: { isMobile?: boolean }) => {
  const [displayNumber, setDisplayNumber] = useState(1000000);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasAnimated = useRef(false);

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const animateNumber = () => {
    if (hasAnimated.current || isAnimating) return;

    setIsAnimating(true);
    hasAnimated.current = true;

    const steps = 12;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep <= steps) {
        const min = 1000000 + currentStep * (1000000 / steps);
        const max = 2200000;
        const randomNum = Math.floor(min + Math.random() * (max - min));
        setDisplayNumber(randomNum);
      } else {
        setDisplayNumber(2146000);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 80);
  };
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-slate-100 py-24 sm:py-0">
      <SlideHalo accent="emerald" />
      {/* Badge - positioned relative on mobile, absolute on desktop */}
      <div className={`${isMobile ? "relative mb-4 mt-8" : "absolute left-1/2 -translate-x-1/2 top-32"} grid content-start justify-items-center text-center text-slate-100`}>
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          <span className="max-w-[30ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            تحلیل میلیون‌ها داده برای سلامت کسب‌وکار شما در هر ماه
          </span>
          <div className="h-10 sm:h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      {/* Large Number - smaller on mobile */}
      <div className="relative font-bebas-neue text-[22vw] sm:text-[20vw] tracking-tight">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[34vw] w-[34vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/14 blur-[150px]" />
          <div className="absolute left-1/2 top-1/2 h-[25vw] w-[25vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-28" />
        </div>
        <motion.div
          onViewportEnter={animateNumber}
          onViewportLeave={() => {
            setDisplayNumber(1000000);
            hasAnimated.current = false;
            setIsAnimating(false);
          }}
        >
          {formatNumber(displayNumber)}
        </motion.div>
      </div>
      <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 text-right text-white/80 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">۲.۱ میلیون پردازش تأیید شده</p>
          <p className="mt-1 text-sm text-white/70">پایپ‌لاین داده توزیع‌شده با خطای کمتر از ۰.۱٪</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/15 via-transparent to-transparent px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">۸ لایه اعتبارسنجی</p>
          <p className="mt-1 text-sm text-white/70">چک‌پوینت‌های هوشمند برای حفظ سلامت شاخص‌ها</p>
        </div>
      </div>
    </div>
  );
};

export function AnimatedNumber_004({ isMobile }: { isMobile?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(3);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, 60, {
        duration: 1,
        ease: "easeInOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        onComplete: () => {
          console.log("complete");
        },
      });
      return () => controls.stop();
    } else {
      const timeoutId = setTimeout(() => setDisplayValue(3), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, count]);

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-slate-100 py-24 sm:py-0">
      <SlideHalo accent="amber" />
      {/* Badge - positioned relative on mobile, absolute on desktop */}
      <div className={`${isMobile ? "relative mb-4 mt-8" : "absolute left-1/2 -translate-x-1/2 top-32"} grid content-start justify-items-center text-center text-slate-100`}>
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          <span className="max-w-[26ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            تا 60٪ کاهش در هزینه‌های عملیاتی کسب‌وکار شما
          </span>
          <div className="h-10 sm:h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      {/* Large Number - smaller on mobile */}
      <div ref={ref} className="relative font-bebas-neue text-[28vw] sm:text-[20vw] tracking-tight">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[30vw] w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/14 blur-[125px]" />
          <div className="absolute left-1/2 top-1/2 h-[22vw] w-[22vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-26" />
        </div>
        <NumberFlow value={displayValue} />
      </div>
      <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 text-right text-white/80 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">بازگشت سرمایه در ۴ ماه</p>
          <p className="mt-1 text-sm text-white/70">چیدمان هوشمند منابع و حذف هزینه‌های زائد</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/15 via-transparent to-transparent px-5 py-4 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">پایداری ۹۹٫۳٪</p>
          <p className="mt-1 text-sm text-white/70">زیرساخت مقاوم با ۳ لایه افزونگی و هشدار سریع</p>
        </div>
      </div>
    </div>
  );
}

export default SnapScrollSection;

type SlideHaloProps = {
  accent: "teal" | "cyan" | "emerald" | "amber";
};

const HALO_GRADIENTS: Record<SlideHaloProps["accent"], string> = {
  teal: "from-teal-200/25 via-teal-500/5 to-transparent",
  cyan: "from-sky-200/25 via-sky-500/5 to-transparent",
  emerald: "from-emerald-200/25 via-emerald-500/5 to-transparent",
  amber: "from-amber-100/25 via-amber-500/5 to-transparent",
};

const RING_COLORS: Record<SlideHaloProps["accent"], string> = {
  teal: "border-teal-200/20",
  cyan: "border-sky-200/25",
  emerald: "border-emerald-200/18",
  amber: "border-amber-100/25",
};

const DOT_COLORS: Record<SlideHaloProps["accent"], string> = {
  teal: "bg-teal-300/18",
  cyan: "bg-sky-300/18",
  emerald: "bg-emerald-300/16",
  amber: "bg-amber-200/18",
};

function SlideHalo({ accent }: SlideHaloProps) {
  const gradient = HALO_GRADIENTS[accent];
  const ring = RING_COLORS[accent];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className={`absolute left-1/2 top-1/3 h-[45vh] w-[65vw] -translate-x-1/2 rounded-[50%] bg-gradient-to-r ${gradient} blur-[100px] opacity-60`}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-[48vh] w-[48vh] -translate-x-1/2 -translate-y-1/2 rounded-full ${ring} opacity-30`}
      />
    </div>
  );
}
