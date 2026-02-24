"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useId } from "react";

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
  pathData = "M 353.00 4.00 L 98.00 383.00 Q 98.00 383.00 288.00 671.00 Q 288.00 671.00 858.00 903.00",
  strokeWidth = 14,
  viewBox = "0 0 900 920",
  svgWidth = 900,
  svgHeight = 920,
  scrollOffset = ["start 0.6", "end 0.1"],
  progressRange = [0.49, 1],
}: AnimatedPathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const filterId = useId();
  const glowFilterId = `glow-${filterId}`;
  
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
    <div ref={ref} className={className} style={{ width: svgWidth, height: svgHeight }}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={viewBox}
        fill="none"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <linearGradient id="tealStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--landing-primary)" />
            <stop offset="55%" stopColor="hsl(185, 85%, 70%)" />
            <stop offset="100%" stopColor="var(--landing-accent)" />
          </linearGradient>

          {/* Optimized SVG filter to replace multiple CSS drop-shadows */}
          <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
            {/* Layer 1: 18px blur (stdDeviation ~9) */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blur1" />
            <feFlood floodColor="rgba(20, 184, 166, 0.6)" result="color1" />
            <feComposite in="color1" in2="blur1" operator="in" result="shadow1" />

            {/* Layer 2: 42px blur (stdDeviation ~21) */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="21" result="blur2" />
            <feFlood floodColor="rgba(20, 184, 166, 0.45)" result="color2" />
            <feComposite in="color2" in2="blur2" operator="in" result="shadow2" />

            {/* Layer 3: 64px blur (stdDeviation ~32) */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="32" result="blur3" />
            <feFlood floodColor="rgba(14, 165, 233, 0.35)" result="color3" />
            <feComposite in="color3" in2="blur3" operator="in" result="shadow3" />

            <feMerge>
              <feMergeNode in="shadow3" />
              <feMergeNode in="shadow2" />
              <feMergeNode in="shadow1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={pathData}
          stroke="url(#tealStroke)"
          strokeWidth={strokeWidth}
          style={{
            pathLength,
            strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
            filter: `url(#${glowFilterId})`,
            strokeOpacity: 0.78,
            willChange: "stroke-dashoffset",
          }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
