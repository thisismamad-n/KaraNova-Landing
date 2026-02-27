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
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    };
    const updateAnimation = () => {
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
    borderColor,
    getDirection,
    hoverFillColor,
    speed,
    squareSize
  ]);
  return /* @__PURE__ */ jsxDEV("div", {
    className: styles.container,
    children: [
      /* @__PURE__ */ jsxDEV("div", {
        className: styles.baseLayer,
        style: { backgroundColor: baseColor }
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV("canvas", {
        ref: canvasRef,
        className: styles.canvas
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV("div", {
        className: styles.vignetteLayer,
        style: {
          background: `radial-gradient(circle at center, transparent 0%, transparent 50%, ${vignetteColor} 100%)`
        }
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
};
var Squares_default = Squares;
export {
  Squares_default as default
};
