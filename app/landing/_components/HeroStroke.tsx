"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { InovaFeatureCard } from './InovaCard';
import { TaskEaseFeatureCard } from './TaskEaseCard';
import { BIQFeatureCard } from './BIQCard';
import { SlidePathDesigner } from "@/components/ui/slide-path-designer";

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.1"],
  });
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const SHOW_COORDINATE_HELPER = false;
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!SHOW_COORDINATE_HELPER || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  const handleMouseLeave = () => {
    if (!SHOW_COORDINATE_HELPER) return;
    setCursorPosition(null);
  };

  return (
    <section
      ref={ref}
      className="mx-auto flex w-screen flex-col items-center overflow-hidden px-4 pt-20 relative h-auto md:h-[2804px]"
      style={{
        color: 'var(--landing-dark-text)'
      }}
      onMouseMove={SHOW_COORDINATE_HELPER ? handleMouseMove : undefined}
      onMouseLeave={SHOW_COORDINATE_HELPER ? handleMouseLeave : undefined}
    >
      <SlidePathDesigner slideKey="landing-hero" />
      {SHOW_COORDINATE_HELPER && cursorPosition && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div
            className="absolute left-0 right-0 h-px bg-cyan-400/35"
            style={{ top: `${cursorPosition.y}px` }}
          />
          <div
            className="absolute top-0 bottom-0 w-px bg-cyan-400/35"
            style={{ left: `${cursorPosition.x}px` }}
          />
          <div
            className="absolute translate-x-3 -translate-y-1/2"
            style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
          >
            <span className="rounded-md bg-slate-900/85 px-2 py-1 text-xs font-medium text-teal-100 shadow-lg backdrop-blur-md">
              {Math.round(cursorPosition.x)}px, {Math.round(cursorPosition.y)}px
            </span>
          </div>
        </div>
      )}
      {isInView && (
        <>
          {/* Simplified ambient glow effects */}
          <div className="hidden md:block absolute top-0 left-1/4 w-72 h-72 bg-teal-500/6 rounded-full blur-[100px] z-0" />
          <div className="hidden md:block absolute top-1/3 right-[-18%] w-[30rem] h-[30rem] bg-cyan-400/10 rounded-full blur-[100px] z-0" />

          {/* Feature cards with higher z-index */}
          <div className="hidden md:block absolute inset-0 z-20">
            <InovaFeatureCard left={420} top={980} width={380} />
            <TaskEaseFeatureCard left={700} top={2100} width={460} />
            <BIQFeatureCard left={720} top={1480} width={520} />
          </div>
        </>
      )}


      <div dir="rtl" className="relative z-40 flex w-full max-w-7xl flex-col items-center justify-center gap-8 text-center pt-[13vh] md:-translate-x-12 lg:-translate-x-20">
        <div className="relative">
          {/* Container for title to handle responsive layout */}
          <div className="relative w-full max-w-4xl mx-auto mb-6">
            <h1 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] text-balance drop-shadow-[0_18px_48px_rgba(8,47,73,0.55)]" dir="rtl">
              {/* Main Title - Centered */}
              <span className="block w-full text-center">
                <span className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
                  گره گشایی کسب و کار
                </span>
              </span>

              {/* Secondary Title - Positioned to the left on desktop, responsive */}
              <span className="w-full flex justify-center md:justify-end md:pr-[55%]">
                <span className="text-white drop-shadow-[0_14px_36px_rgba(20,184,166,0.55)]">
                  با کارانوا
                </span>
              </span>
            </h1>
          </div>

          <p className="relative z-10 mt-6 max-w-2xl mx-auto text-xl md:text-2xl font-normal leading-relaxed text-slate-100/85 text-balance md:text-left" dir="rtl">
            راهکاری هوشمند برای یکپارچه‌سازی عملیات، بهینه‌سازی تصمیم‌ها و خلق مزیت رقابتی پایدار
          </p>

          {isInView && (
            <>
              <LinePath
                className="hidden md:block absolute left-[65%] top-0 z-0 -translate-x-1/2 opacity-14 md:scale-90 lg:scale-95 pointer-events-none"
                scrollYProgress={easedProgress}
              />
              <StaticLinePath
                className="block md:hidden absolute left-1/2 top-0 z-0 -translate-x-1/2 opacity-20 w-full max-w-[520px] pointer-events-none"
              />
            </>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="relative flex justify-center mt-10 md:justify-start md:-translate-x-0 lg:-translate-x-0 w-full max-w-2xl">
          <a
            href="https://app.karanovaa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-medium text-white/92 bg-white/8 backdrop-blur-[6px] shadow-[0_18px_32px_rgba(13,148,136,0.25)] transition-all duration-300 ease-out hover:bg-white/14 hover:shadow-[0_24px_60px_rgba(15,23,42,0.45)] hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/45 cursor-pointer"
            aria-label="مشاهده دمو محصول کارانوا"
          >
            مشاهده دمو
          </a>
        </div>
      </div>

      <div className="relative z-30 mt-12 w-full max-w-md space-y-8 md:hidden">
        <InovaFeatureCard left={0} top={0} variant="stacked" />
        <BIQFeatureCard left={0} top={0} variant="stacked" />
        <TaskEaseFeatureCard left={0} top={0} variant="stacked" />
      </div>

      {isInView && (
        <>
          {/* Bottom gradient blur fade - matches SnapScrollSection's teal-tinted dark background */}

        </>
      )}
    </section>
  );
};

export default Skiper19;

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.49, 1]);

  // Reference design width - the width the path was designed for
  const DESIGN_WIDTH = 1278;
  const DESIGN_HEIGHT = 2319;

  return (
    <svg
      width={DESIGN_WIDTH}
      height={DESIGN_HEIGHT}
      viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`}
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="tealStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--landing-primary)" />
          <stop offset="55%" stopColor="hsl(185, 85%, 70%)" />
          <stop offset="100%" stopColor="var(--landing-accent)" />
        </linearGradient>
        {/* Optimized SVG glow filter - replaces expensive CSS drop-shadow */}
        <filter id="heroPathGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Main path with SVG filter glow - much more performant */}
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="url(#tealStroke)"
        strokeWidth="14"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroPathGlow)"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
          strokeOpacity: 0.85,
          willChange: "auto",
        }}
        strokeLinecap="round"
      />
    </svg>
  );
};

const StaticLinePath = ({ className }: { className: string }) => {
  const DESIGN_WIDTH = 1278;
  const DESIGN_HEIGHT = 2319;
  const pathLength = 0.49;
  const dashOffset = 1 - pathLength;

  return (
    <svg
      width={DESIGN_WIDTH}
      height={DESIGN_HEIGHT}
      viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`}
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="tealStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--landing-primary)" />
          <stop offset="55%" stopColor="hsl(185, 85%, 70%)" />
          <stop offset="100%" stopColor="var(--landing-accent)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="url(#tealStroke)"
        strokeWidth="14"
        vectorEffect="non-scaling-stroke"
        style={{
          pathLength,
          strokeDashoffset: dashOffset,
          filter: 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.8)) drop-shadow(0 0 16px rgba(20, 184, 166, 0.6))',
          strokeOpacity: 0.85,
          willChange: 'auto',
        }}
        strokeLinecap="round"
      />
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="rgba(94, 234, 212, 0.2)"
        strokeWidth="24"
        vectorEffect="non-scaling-stroke"
        style={{
          pathLength,
          strokeDashoffset: dashOffset,
          filter: 'blur(10px)',
          mixBlendMode: 'screen',
          willChange: 'auto',
        }}
        strokeLinecap="round"
      />
    </svg>
  );
};
