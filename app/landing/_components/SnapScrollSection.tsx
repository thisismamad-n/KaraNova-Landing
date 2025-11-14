"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { animate, useMotionValue } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const SnapScrollSection = () => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasLockedInitial, setHasLockedInitial] = useState(false);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // If we're already animating to a slide, ignore extra wheel events
    if (isAnimating) return;

    const delta = event.deltaY;
    // Ignore very small deltas (e.g. slight touchpad movement)
    if (Math.abs(delta) < 10) return;

    // When entering from above, first interaction should lock to the first slide,
    // not immediately jump to the second one.
    if (!hasLockedInitial && delta > 0 && activeIndex === 0) {
      const firstSlide = slideRefs.current[0];
      if (!firstSlide) return;

      event.preventDefault();

      setIsAnimating(true);
      setHasLockedInitial(true);

      firstSlide.scrollIntoView({ behavior: "smooth", block: "center" });

      window.setTimeout(() => {
        setIsAnimating(false);
      }, 700);

      return;
    }

    const direction = delta > 0 ? 1 : -1;
    const lastIndex = slideRefs.current.length - 1;

    const nextIndex = activeIndex + direction;

    // If we're at the edges, let the normal page scroll continue
    if (nextIndex < 0 || nextIndex > lastIndex) {
      return;
    }

    const target = slideRefs.current[nextIndex];
    if (!target) return;

    event.preventDefault();

    setIsAnimating(true);
    setActiveIndex(nextIndex);

    target.scrollIntoView({ behavior: "smooth", block: "center" });

    window.setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;
    const className = "grid-second-slide";

    body.classList.add(className);

    return () => {
      body.classList.remove(className);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      onWheel={handleWheel}
    >
      <div
        ref={(el) => {
          slideRefs.current[0] = el;
        }}
        className="relative z-10 snap-center snap-always min-h-screen"
      >
        <AnimatedNumber_001 />
      </div>
      <div
        ref={(el) => {
          slideRefs.current[1] = el;
        }}
        className="relative z-10 snap-center snap-always min-h-screen"
      >
        <AnimatedNumber_002 />
      </div>
      <div
        ref={(el) => {
          slideRefs.current[2] = el;
        }}
        className="relative z-10 snap-center snap-always min-h-screen"
      >
        <AnimatedNumber_003 />
      </div>
      <div
        ref={(el) => {
          slideRefs.current[3] = el;
        }}
        className="relative z-10 snap-center snap-always min-h-screen"
      >
        <AnimatedNumber_004 />
      </div>
    </section>
  );
};

const AnimatedNumber_001 = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const [count, setCount] = useState(60);

  useEffect(() => {
    if (isPaused) return;

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
  }, [isPaused]);

  // Reset timer when resetTrigger changes
  useEffect(() => {
    setCount(60);
  }, [resetTrigger]);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-4 text-slate-100">
      <div className="top-32 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center text-center text-slate-100">
        <div className="flex flex-col items-center gap-5">
          <span className="max-w-[28ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-6 py-2 text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            راه‌اندازی اولین فضای کار هوشمند شما در کمتر از 60 ثانیه
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      <div className="font-bebas-neue text-[20vw] tracking-tight">
        <NumberFlow value={count} prefix="0:" />
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
    </div>
  );
};

export const AnimatedNumber_002 = () => {
  const finalCount = 500;
  const [displaySubs, setDisplaySubs] = useState(0);

  // Animating sub count from 0 to subscriberCount prop
  const springSubCount = useSpring(0, {
    bounce: 0,
    duration: 1000,
  });

  springSubCount.on("change", (value) => {
    setDisplaySubs(Math.round(value));
  });

  const animateCount = () => {
    springSubCount.set(finalCount);
  };

  return (
    <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-4 text-slate-100">
      <div className="top-32 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center text-center text-slate-100">
        <div className="flex flex-col items-center gap-5">
          <span className="max-w-[30ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-6 py-2 text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            پایش سیگنال‌ها و رویدادها در آی نوا ،تسک ایز و بی آی کیو
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      <motion.div
        onViewportEnter={animateCount}
        onViewportLeave={() => {
          springSubCount.set(0);
        }}
        className="font-bebas-neue text-[20vw] tracking-tight"
      >
        {displaySubs}
      </motion.div>
    </div>
  );
};

export const AnimatedNumber_003 = () => {
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
    <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-4 text-slate-100">
      <div className="top-32 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center text-center text-slate-100">
        <div className="flex flex-col items-center gap-5">
          <span className="max-w-[30ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-6 py-2 text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            تحلیل میلیون‌ها داده برای سلامت کسب‌وکار شما در هر ماه
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      <div className="font-bebas-neue text-[20vw] tracking-tight">
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
    </div>
  );
};

function AnimatedNumber_004() {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(3);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      animate(count, 60, {
        duration: 1,
        ease: "easeInOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        onComplete: () => {
          console.log("complete");
        },
      });
    } else {
      setDisplayValue(3);
    }
  }, [inView, count]);

  return (
    <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-4 text-slate-100">
      <div className="top-32 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center text-center text-slate-100">
        <div className="flex flex-col items-center gap-5">
          <span className="max-w-[26ch] rounded-full border border-teal-400/30 bg-slate-900/70 px-6 py-2 text-sm font-semibold leading-relaxed text-teal-50 shadow-[0_10px_45px_rgba(13,148,136,0.35)] backdrop-blur-md">
            تا 60٪ کاهش در هزینه‌های عملیاتی کسب‌وکار شما
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-teal-300/90 via-teal-300/40 to-transparent shadow-[0_0_25px_rgba(45,212,191,0.6)]" />
        </div>
      </div>
      <div ref={ref} className="font-bebas-neue text-[20vw] tracking-tight">
        <NumberFlow value={displayValue} />
      </div>
    </div>
  );
}

export default SnapScrollSection;
