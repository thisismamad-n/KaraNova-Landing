"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface AnimatedPathProps {
  className?: string;
  pathData?: string;
  strokeWidth?: number;
  viewBox?: string;
  svgWidth?: number;
  svgHeight?: number;
  scrollOffset?: any;
  progressRange?: [number, number];
}

export function AnimatedPath({
  className = "",
  pathData = "M 298.00 14.00 C 250 80 180 180 125.00 248.00 C 120 300 122 500 128.00 618.00 C 180 700 280 780 356.00 836.00",
  strokeWidth = 14,
  viewBox = "0 0 400 900",
  svgWidth = 400,
  svgHeight = 900,
  scrollOffset = ["start 0.6", "end 0.1"],
  progressRange = [0, 1],
}: AnimatedPathProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset,
  });

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const pathLength = useTransform(easedProgress, [0, 1], progressRange);

  return (
    <div ref={ref} className={className}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={viewBox}
        fill="none"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="tealStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--landing-primary)" />
            <stop offset="55%" stopColor="hsl(185, 85%, 70%)" />
            <stop offset="100%" stopColor="var(--landing-accent)" />
          </linearGradient>
        </defs>
        <motion.path
          d={pathData}
          stroke="url(#tealStroke)"
          strokeWidth={strokeWidth}
          style={{
            pathLength,
            strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
            filter:
              "drop-shadow(0 0 18px rgba(20, 184, 166, 0.6)) drop-shadow(0 0 42px rgba(20, 184, 166, 0.45)) drop-shadow(0 0 64px rgba(14, 165, 233, 0.35))",
            strokeOpacity: 0.78,
          }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
