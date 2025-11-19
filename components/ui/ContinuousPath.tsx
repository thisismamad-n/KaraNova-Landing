"use client";

import { motion, useScroll, useSpring, useTransform, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ContinuousPathProps {
  sectionIds: string[];
  pathData: string;
  gradientId?: string;
  strokeWidth?: number;
  enabled?: boolean;
}

export function ContinuousPath({
  sectionIds,
  pathData,
  gradientId = "continuous-gradient",
  strokeWidth = 12,
  enabled = true,
}: ContinuousPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 3000 });
  const completionTarget = useMotionValue(1);
  const [hasRendered, setHasRendered] = useState(false);
  
  // Check if the path is in view - only render once it's been seen
  const isInView = useInView(containerRef, { amount: 0.05, once: false });
  
  useEffect(() => {
    // Use requestAnimationFrame to defer state update
    if (isInView && !hasRendered) {
      const rafId = requestAnimationFrame(() => {
        setHasRendered(true);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [isInView, hasRendered]);

  // Calculate total height
  useEffect(() => {
    if (!enabled) return;

    const updateDimensions = () => {
      const firstSection = document.getElementById(sectionIds[0]);
      const lastSection = document.getElementById(sectionIds[sectionIds.length - 1]);

      if (firstSection && lastSection) {
        const firstTop = firstSection.offsetTop;
        const lastTop = lastSection.offsetTop;
        const totalHeight = (lastTop + lastSection.offsetHeight) - firstTop;

        setDimensions({
          width: window.innerWidth,
          height: totalHeight,
        });

        const viewportHeight = window.innerHeight;
        const scrollableDistance = Math.max(totalHeight - viewportHeight, 1);
        const targetScroll = Math.max(lastTop - viewportHeight / 2, firstTop);
        const completionScroll = Math.min(Math.max(targetScroll - firstTop, 0), scrollableDistance);
        const rawCompletion = scrollableDistance <= 0 ? 1 : completionScroll / scrollableDistance;
        const minimumCompletion = 0.2;
        const maximumCompletion = 1;
        const clampedCompletion = Math.min(
          Math.max(rawCompletion, minimumCompletion),
          maximumCompletion
        );

        completionTarget.set(clampedCompletion);
      }
    };

    updateDimensions();
    
    const timeoutId = setTimeout(updateDimensions, 100);
    
    window.addEventListener("resize", updateDimensions);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [sectionIds, enabled, completionTarget]);

  // Scroll-based animation - complete the path by the time FinalCTA is visible
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fast spring response
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 420,
    damping: 55,
    restDelta: 0.0001,
  });

  // Map scroll progress to path drawing
  const normalizedProgress = useTransform(
    [easedProgress, completionTarget],
    ([rawProgress, rawThreshold]: unknown[]) => {
      const progress = typeof rawProgress === "number" ? rawProgress : 0;
      const threshold = typeof rawThreshold === "number" ? rawThreshold : 1;

      if (threshold <= 0) {
        return Math.min(Math.max(progress, 0), 1);
      }

      return Math.min(progress / threshold, 1);
    },
  );
  const pathLength = useTransform(normalizedProgress, [0, 1], [0, 1]);
  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);
  const glowOpacity = useTransform(pathLength, [0, 0.3, 1], [0, 0.7, 1]);
  // Pre-calculate outer glow opacity to avoid hook in JSX
  const outerGlowOpacity = useTransform(glowOpacity, (v) => (typeof v === 'number' ? v * 0.7 : 0));

  if (!enabled || !pathData) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        height: `${dimensions.height}px`,
      }}
    >
      {hasRendered && isInView ? (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--landing-primary)" />
              <stop offset="55%" stopColor="hsl(185, 85%, 70%)" />
              <stop offset="100%" stopColor="var(--landing-accent)" />
            </linearGradient>
          </defs>
          {/* Main path with enhanced glow */}
          <motion.path
            d={pathData}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
            pathLength={1}
            style={{
              pathLength,
              strokeDashoffset,
              filter: "drop-shadow(0 0 8px rgba(20, 184, 166, 0.8)) drop-shadow(0 0 16px rgba(20, 184, 166, 0.6))",
              strokeOpacity: 0.9,
              willChange: "auto",
            }}
          />
          {/* Inner glow layer - tight blur for definition */}
          <motion.path
            d={pathData}
            stroke="rgba(94, 234, 212, 0.6)"
            strokeWidth={strokeWidth * 1.8}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
            pathLength={1}
            style={{
              pathLength,
              strokeDashoffset,
              opacity: glowOpacity,
              filter: "blur(6px)",
              mixBlendMode: "screen",
              willChange: "auto",
            }}
          />
          {/* Outer glow layer - wider blur for atmosphere */}
          <motion.path
            d={pathData}
            stroke="rgba(20, 184, 166, 0.4)"
            strokeWidth={strokeWidth * 3}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
            pathLength={1}
            style={{
              pathLength,
              strokeDashoffset,
              opacity: outerGlowOpacity,
              filter: "blur(12px)",
              mixBlendMode: "screen",
              willChange: "auto",
            }}
          />
        </svg>
      ) : null}
    </div>
  );
}
