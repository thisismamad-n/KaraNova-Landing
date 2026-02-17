"use client";

import React, { useEffect, useRef, useMemo } from "react";
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

const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 1,
  borderColor = "rgba(94, 234, 212, 0.10)",
  squareSize = 40,
  hoverFillColor = "rgba(94, 234, 212, 0.06)",
  baseColor = "#030712",
  vignetteColor = "rgba(6, 0, 16, 0.78)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);
  // Cache the vignette gradient to avoid creating it every frame
  const vignetteGradientRef = useRef<CanvasGradient | null>(null);

  const getDirection = useMemo(() => {
    const directions: Record<string, { x: number; y: number }> = {
      right: { x: 1, y: 0 },
      left: { x: -1, y: 0 },
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      diagonal: { x: 1, y: 1 },
    };
    return directions[direction] || { x: 1, y: 0 };
  }, [direction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;

      // Update cached gradient on resize
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.7
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, "transparent");
      gradient.addColorStop(1, vignetteColor);
      vignetteGradientRef.current = gradient;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawGrid = () => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const offsetX = gridOffset.current.x % squareSize;
      const offsetY = gridOffset.current.y % squareSize;

      // Draw hovered square directly without loop
      if (hoveredSquareRef.current) {
        const hx = hoveredSquareRef.current.x * squareSize + offsetX;
        const hy = hoveredSquareRef.current.y * squareSize + offsetY;
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(hx, hy, squareSize, squareSize);
      }

      // Batch draw grid lines
      ctx.beginPath();

      // Vertical lines
      for (let x = -1; x < numSquaresX.current; x++) {
        const lx = x * squareSize + offsetX;
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, canvas.height);
      }

      // Horizontal lines
      for (let y = -1; y < numSquaresY.current; y++) {
        const ly = y * squareSize + offsetY;
        ctx.moveTo(0, ly);
        ctx.lineTo(canvas.width, ly);
      }

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1; // Increased to 1px to restore visibility after optimization
      ctx.stroke();

      // Draw vignette using cached gradient
      if (vignetteGradientRef.current) {
        ctx.fillStyle = vignetteGradientRef.current;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = speed * 0.5;
      gridOffset.current.x += getDirection.x * effectiveSpeed;
      gridOffset.current.y += getDirection.y * effectiveSpeed;

      // Reset offset when it exceeds square size
      if (Math.abs(gridOffset.current.x) >= squareSize) {
        gridOffset.current.x = 0;
      }
      if (Math.abs(gridOffset.current.y) >= squareSize) {
        gridOffset.current.y = 0;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const offsetX = gridOffset.current.x % squareSize;
      const offsetY = gridOffset.current.y % squareSize;

      const gridX = Math.floor((mouseX - offsetX) / squareSize);
      const gridY = Math.floor((mouseY - offsetY) / squareSize);

      hoveredSquareRef.current = { x: gridX, y: gridY };
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    baseColor,
    borderColor,
    getDirection,
    hoverFillColor,
    speed,
    squareSize,
    vignetteColor,
  ]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default Squares;
