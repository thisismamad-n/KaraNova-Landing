// app/_components/Squares.tsx
import { useEffect, useRef, useMemo } from "react";
import styles from "./Squares.module.css";
import { jsxDEV } from "react/jsx-dev-runtime";
"use client";
var Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "rgba(94, 234, 212, 0.10)",
  squareSize = 40,
  hoverFillColor = "rgba(94, 234, 212, 0.06)",
  baseColor = "#030712",
  vignetteColor = "rgba(6, 0, 16, 0.78)"
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);
  const vignetteGradientRef = useRef(null);
  const getDirection = useMemo(() => {
    const directions = {
      right: { x: 1, y: 0 },
      left: { x: -1, y: 0 },
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      diagonal: { x: 1, y: 1 }
    };
    return directions[direction] || { x: 1, y: 0 };
  }, [direction]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    let isVisible = true;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
      const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7);
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
      if (hoveredSquareRef.current) {
        const hx = hoveredSquareRef.current.x * squareSize + offsetX;
        const hy = hoveredSquareRef.current.y * squareSize + offsetY;
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(hx, hy, squareSize, squareSize);
      }
      ctx.beginPath();
      for (let x = -1;x < numSquaresX.current; x++) {
        const lx = x * squareSize + offsetX;
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, canvas.height);
      }
      for (let y = -1;y < numSquaresY.current; y++) {
        const ly = y * squareSize + offsetY;
        ctx.moveTo(0, ly);
        ctx.lineTo(canvas.width, ly);
      }
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      if (vignetteGradientRef.current) {
        ctx.fillStyle = vignetteGradientRef.current;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    const updateAnimation = () => {
      if (!isVisible)
        return;
      const effectiveSpeed = speed * 0.5;
      gridOffset.current.x += getDirection.x * effectiveSpeed;
      gridOffset.current.y += getDirection.y * effectiveSpeed;
      if (Math.abs(gridOffset.current.x) >= squareSize) {
        gridOffset.current.x = 0;
      }
      if (Math.abs(gridOffset.current.y) >= squareSize) {
        gridOffset.current.y = 0;
      }
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };
    const handleMouseMove = (event) => {
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !requestRef.current) {
          requestRef.current = requestAnimationFrame(updateAnimation);
        } else if (!isVisible && requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      });
    }, { threshold: 0 });
    observer.observe(canvas);
    requestRef.current = requestAnimationFrame(updateAnimation);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
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
    vignetteColor
  ]);
  return /* @__PURE__ */ jsxDEV("canvas", {
    ref: canvasRef,
    className: styles.canvas
  }, undefined, false, undefined, this);
};
var Squares_default = Squares;
export {
  Squares_default as default
};
