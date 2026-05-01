"use client";

import { motion, useScroll, useSpring, useTransform, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { debounce } from "@/lib/utils";

interface ContinuousPathProps {
  sectionIds: string[];
  pathData: string;
  gradientId?: string;
  strokeWidth?: number;
  enabled?: boolean;
  onComplete?: (isComplete: boolean) => void;
}

export function ContinuousPath({
  sectionIds,
  pathData,
  gradientId = "continuous-path-gradient",
  strokeWidth = 12,

  enabled = true,
  onComplete,
}: ContinuousPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Reference design dimensions - the dimensions the path was designed for
  const DESIGN_WIDTH = 1920;
  const [dimensions, setDimensions] = useState({ width: DESIGN_WIDTH, height: 3000 });
  const [scaledPathData, setScaledPathData] = useState(pathData);
  const completionTarget = useMotionValue(1);
  const [hasRendered, setHasRendered] = useState(false);

  // Check if the path is in view - only render once it's been seen
  const isInView = useInView(containerRef, { amount: 0.05, once: false });

  useEffect(() => {
    // Use IntersectionObserver trigger rather than continuous raf checks
    if (isInView && !hasRendered) {
      setTimeout(() => setHasRendered(true), 0);
    }
  }, [isInView, hasRendered]);

  // Scale path coordinates based on viewport width
  useEffect(() => {
    if (!enabled || !pathData) return;

    const scalePathCoordinates = (path: string, scaleX: number): string => {
      // Match all coordinate pairs in the path
      return path.replace(/([ML])\s*([\d.]+)\s+([\d.]+)|C\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g,
        (match, cmd, x1, y1, cx1, cy1, cx2, cy2, x2, y2) => {
          if (cmd === 'M' || cmd === 'L') {
            // Move or Line command
            const scaledX = parseFloat(x1) * scaleX;
            return `${cmd} ${scaledX.toFixed(2)} ${y1}`;
          } else {
            // Cubic Bezier curve command
            const scaledCx1 = parseFloat(cx1) * scaleX;
            const scaledCx2 = parseFloat(cx2) * scaleX;
            const scaledX2 = parseFloat(x2) * scaleX;
            return `C ${scaledCx1.toFixed(2)} ${cy1} ${scaledCx2.toFixed(2)} ${cy2} ${scaledX2.toFixed(2)} ${y2}`;
          }
        }
      );
    };

    const updateDimensions = () => {
      const firstSection = document.getElementById(sectionIds[0]);
      const lastSection = document.getElementById(sectionIds[sectionIds.length - 1]);

      if (firstSection && lastSection && containerRef.current) {
        // Get the parent wrapper position
        const wrapperTop = containerRef.current.parentElement?.offsetTop || 0;

        // Calculate positions relative to the wrapper
        const firstTop = firstSection.offsetTop - wrapperTop;
        const lastTop = lastSection.offsetTop - wrapperTop;
        const totalHeight = (lastTop + lastSection.offsetHeight) - firstTop;
        const currentWidth = window.innerWidth;

        // Calculate scale factor based on current viewport width vs design width
        const scaleX = currentWidth / DESIGN_WIDTH;

        setDimensions({
          width: currentWidth,
          height: totalHeight,
        });

        // Scale the path data
        setScaledPathData(scalePathCoordinates(pathData, scaleX));

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

    const handleResize = debounce(updateDimensions, 100);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [sectionIds, enabled, completionTarget, pathData, DESIGN_WIDTH, isMobile]);

  // Scroll-based animation - complete the path by the time FinalCTA is visible
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Optimized spring response - lower stiffness for better performance
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 40,
    restDelta: 0.001,
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

  useMotionValueEvent(pathLength, "change", (latest: number) => {
    if (onComplete) {
      if (latest >= 0.99) {
        onComplete(true);
      } else {
        onComplete(false);
      }
    }
  });

  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);

  if (!enabled || !pathData || isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-0 right-0 z-0"
      style={{
        top: 0,
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
          {/* Hardware accelerated drop-shadow instead of SVG feGaussianBlur */}
          <motion.path
            d={scaledPathData}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
            pathLength={1}
            style={{
              pathLength,
              strokeDashoffset,
              strokeOpacity: 0.9,
              filter: "drop-shadow(0px 0px 8px rgba(94, 234, 212, 0.5))",
              willChange: "stroke-dashoffset",
            }}
          />
        </svg>
      ) : null}
    </div>
  );
}
