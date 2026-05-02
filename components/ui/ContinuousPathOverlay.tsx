"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useId } from "react";
import { debounce } from "@/lib/utils";

interface ContinuousPathOverlayProps {
  startSectionId: string;
  endSectionId: string;
  pathData: string;
  gradientId?: string;
}

const scalePathCoordinates = (path: string, scaleX: number): string => {
  // Match all coordinate pairs in the path
  return path.replace(
    /([ML])\s*([\d.]+)\s+([\d.]+)|C\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g,
    (match, cmd, x1, y1, cx1, cy1, cx2, cy2, x2, y2) => {
      if (cmd === "M" || cmd === "L") {
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

export function ContinuousPathOverlay({
  startSectionId,
  endSectionId,
  pathData,
  gradientId = "continuous-path-gradient",
}: ContinuousPathOverlayProps) {
  // Reference design width - the width the path was designed for
  const DESIGN_WIDTH = 1920;
  const [viewBox, setViewBox] = useState(`0 0 ${DESIGN_WIDTH} 3000`);
  const [scaledPathData, setScaledPathData] = useState(pathData);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the entire path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const pathLength = useTransform(easedProgress, [0, 1], [0, 1]);
  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);
  const filterId = useId();
  const glowFilterId = `continuous-glow-${filterId}`;

  useEffect(() => {
    const updateViewBox = () => {
      const startEl = document.getElementById(startSectionId);
      const endEl = document.getElementById(endSectionId);

      if (startEl && endEl) {
        const startTop = startEl.offsetTop;
        const endBottom = endEl.offsetTop + endEl.offsetHeight;
        const totalHeight = endBottom - startTop;
        const currentWidth = window.innerWidth;
        
        // Calculate scale factor based on current viewport width vs design width
        const scaleX = currentWidth / DESIGN_WIDTH;

        setViewBox(`0 0 ${currentWidth} ${totalHeight}`);
        
        // Scale the path data
        setScaledPathData(scalePathCoordinates(pathData, scaleX));
      }
    };

    updateViewBox();
    const handleResize = debounce(updateViewBox, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [startSectionId, endSectionId, pathData, DESIGN_WIDTH]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{ height: "100vh" }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--landing-primary)" />
            <stop offset="50%" stopColor="hsl(185, 85%, 70%)" />
            <stop offset="100%" stopColor="var(--landing-accent)" />
          </linearGradient>
          <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="21" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="32" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={scaledPathData}
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            pathLength,
            strokeDashoffset,
            filter: `url(#${glowFilterId})`,
            strokeOpacity: 0.82,
          }}
        />
      </svg>
    </div>
  );
}
