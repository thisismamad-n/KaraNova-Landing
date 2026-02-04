"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import styles from "./Squares.module.css";

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  baseColor?: string;
  vignetteColor?: string;
}

/**
 * PERFORMANCE OPTIMIZED VERSION
 * Instead of continuous canvas animation (60fps), this uses:
 * 1. CSS Grid for static grid pattern
 * 2. CSS animation for subtle movement (GPU accelerated)
 * 3. IntersectionObserver to pause when off-screen
 * 4. Reduced motion support
 */
const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 1,
  borderColor = "rgba(94, 234, 212, 0.10)",
  squareSize = 40,
  hoverFillColor = "rgba(94, 234, 212, 0.06)",
  baseColor = "#030712",
  vignetteColor = "rgba(6, 0, 16, 0.78)",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver to only show when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "50px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Calculate animation direction
  const animationName = useMemo(() => {
    if (prefersReducedMotion) return "none";
    switch (direction) {
      case "right": return styles.moveRight;
      case "left": return styles.moveLeft;
      case "up": return styles.moveUp;
      case "down": return styles.moveDown;
      case "diagonal": return styles.moveDiagonal;
      default: return styles.moveRight;
    }
  }, [direction, prefersReducedMotion]);

  // Calculate animation duration based on speed (slower speed = longer duration)
  const animationDuration = useMemo(() => {
    const baseDuration = 60; // seconds for one full cycle
    return `${baseDuration / Math.max(speed, 0.1)}s`;
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        "--square-size": `${squareSize}px`,
        "--border-color": borderColor,
        "--hover-fill-color": hoverFillColor,
        "--base-color": baseColor,
        "--vignette-color": vignetteColor,
      } as React.CSSProperties}
    >
      {/* Base background color */}
      <div className={styles.baseLayer} />

      {/* Grid pattern - only animate when visible */}
      <div
        className={styles.gridLayer}
        style={{
          animationName: isVisible ? animationName : "none",
          animationDuration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      />

      {/* Vignette overlay */}
      <div className={styles.vignetteLayer} />
    </div>
  );
};

export default Squares;
