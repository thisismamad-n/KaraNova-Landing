'use client';

import React, { useRef, useEffect } from 'react';

// --- TYPE DEFINITIONS & CONSTANTS ---
type AnimationSetupFunction = (ctx: CanvasRenderingContext2D, inViewRef: React.MutableRefObject<boolean>) => () => void;

const CANVAS_WIDTH = 280;
const CANVAS_HEIGHT = 280;
const GLOBAL_SPEED = 0.5;

const MONOCHROME_FILL = (opacity: number) => 
  `rgba(45, 212, 191, ${Math.max(0, Math.min(1, opacity))})`;
const MONOCHROME_STROKE = (opacity: number) => 
  `rgba(45, 212, 191, ${Math.max(0, Math.min(1, opacity))})`;

const easeInOutCubic = (t: number) => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// --- CORNER DECORATION SUB-COMPONENT ---
const Corner = ({ 
  position, 
  rotation, 
  delay 
}: { 
  position: string; 
  rotation: string; 
  delay: string;
}) => (
  <div
    className={`absolute z-10 h-4 w-4 text-teal-300/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${position}`}
    style={{ transform: rotation, transitionDelay: delay }}
  >
    <svg viewBox="0 0 512 512" className="h-full w-full">
      <path
        fill="currentColor"
        d="M448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
      />
    </svg>
  </div>
);

// --- MAIN REUSABLE COMPONENT ---
interface CanvasAnimationProps {
  title: string;
  animationId: keyof typeof animationMap;
}

export const CanvasAnimation: React.FC<CanvasAnimationProps> = ({ 
  title, 
  animationId 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupFunction = animationMap[animationId];
    if (!setupFunction) return;

    const cleanup = setupFunction(ctx, inViewRef);
    return cleanup;
  }, [animationId]);

  return (
    <div ref={wrapperRef} className="group relative flex h-[320px] w-[320px] flex-col items-center overflow-visible border border-teal-500/10 p-3 transition-all duration-300 rounded-xl">
      <Corner position="top-[-8px] left-[-8px]" rotation="rotate(0deg)" delay="0s" />
      <Corner position="top-[-8px] right-[-8px]" rotation="rotate(90deg)" delay="0.1s" />
      <Corner position="bottom-[-8px] left-[-8px]" rotation="rotate(-90deg)" delay="0.2s" />
      <Corner position="bottom-[-8px] right-[-8px]" rotation="rotate(180deg)" delay="0.3s" />
      
      <div className="mb-[12px] text-center text-sm uppercase tracking-[0.5px] text-teal-100/90 font-medium">
        {title}
      </div>
      
      <div className="relative flex h-[280px] w-[280px] items-center justify-center">
        <canvas 
          ref={canvasRef} 
          width={CANVAS_WIDTH} 
          height={CANVAS_HEIGHT} 
          className="w-full h-full" 
        />
      </div>
    </div>
  );
};

// --- ANIMATION LOGIC IMPLEMENTATIONS ---

const setupSonarSweep: AnimationSetupFunction = (ctx, inViewRef) => {
  let frameId: number;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const fadeTime = 2500;
  const rings: { r: number; angle: number; lastSeen: number }[] = [];

  for (let r = 20; r <= 80; r += 15) {
    for (let i = 0; i < r / 2; i++) {
      rings.push({ 
        r, 
        angle: (i / (r / 2)) * Math.PI * 2, 
        lastSeen: -fadeTime 
      });
    }
  }

  const animate = (timestamp: number) => {
    if (!inViewRef.current) {
      frameId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const scanAngle = (timestamp * 0.001 * (Math.PI / 2) * GLOBAL_SPEED) % (Math.PI * 2);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + 85 * Math.cos(scanAngle),
      centerY + 85 * Math.sin(scanAngle)
    );
    ctx.strokeStyle = MONOCHROME_STROKE(0.5);
    ctx.lineWidth = 1;
    ctx.stroke();

    rings.forEach((dot) => {
      let angleDiff = Math.abs(dot.angle - scanAngle);
      if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
      if (angleDiff < 0.05) dot.lastSeen = timestamp;

      const timeSinceSeen = timestamp - dot.lastSeen;
      if (timeSinceSeen < fadeTime) {
        const opacity = 1 - easeInOutCubic(timeSinceSeen / fadeTime);
        const size = 1 + opacity * 1.5;
        const x = centerX + dot.r * Math.cos(dot.angle);
        const y = centerY + dot.r * Math.sin(dot.angle);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = MONOCHROME_FILL(opacity);
        ctx.fill();
      }
    });

    frameId = requestAnimationFrame(animate);
  };

  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

const setupInterconnectingWaves: AnimationSetupFunction = (ctx, inViewRef) => {
  let frameId: number;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;

  const dotRings = [
    { radius: 20, count: 12 },
    { radius: 45, count: 24 },
    { radius: 70, count: 36 },
  ];

  const animate = (timestamp: number) => {
    if (!lastTime) lastTime = timestamp;

    if (!inViewRef.current) {
      lastTime = timestamp;
      frameId = requestAnimationFrame(animate);
      return;
    }

    time += (timestamp - lastTime) * 0.001 * GLOBAL_SPEED;
    lastTime = timestamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    dotRings.forEach((ring, ringIndex) => {
      if (ringIndex >= dotRings.length - 1) return;
      const nextRing = dotRings[ringIndex + 1];

      for (let i = 0; i < ring.count; i++) {
        const angle1 = (i / ring.count) * Math.PI * 2;
        const rPulse1 = Math.sin(time * 2 - ringIndex * 0.4) * 3;
        const x1 = centerX + Math.cos(angle1) * (ring.radius + rPulse1);
        const y1 = centerY + Math.sin(angle1) * (ring.radius + rPulse1);

        const nextRingRatio = nextRing.count / ring.count;
        for (let j = 0; j < nextRingRatio; j++) {
          const angle2 = ((i * nextRingRatio + j) / nextRing.count) * Math.PI * 2;
          const rPulse2 = Math.sin(time * 2 - (ringIndex + 1) * 0.4) * 3;
          const x2 = centerX + Math.cos(angle2) * (nextRing.radius + rPulse2);
          const y2 = centerY + Math.sin(angle2) * (nextRing.radius + rPulse2);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = 0.75;
          ctx.strokeStyle = MONOCHROME_STROKE(
            0.1 + ((Math.sin(time * 3 - ringIndex * 0.5 + i * 0.3) + 1) / 2) * 0.4
          );
          ctx.stroke();
        }
      }
    });

    dotRings.forEach((ring, ringIndex) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2;
        const rPulse = Math.sin(time * 2 - ringIndex * 0.4) * 3;
        const x = centerX + Math.cos(angle) * (ring.radius + rPulse);
        const y = centerY + Math.sin(angle) * (ring.radius + rPulse);

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = MONOCHROME_FILL(
          0.4 + Math.sin(time * 2 - ringIndex * 0.4 + i * 0.2) * 0.6
        );
        ctx.fill();
      }
    });

    frameId = requestAnimationFrame(animate);
  };

  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

const setupHelixScanner: AnimationSetupFunction = (ctx, inViewRef) => {
  let frameId: number;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const numDots = 100;
  const radius = 35;
  const height = 120;

  const dots = Array.from({ length: numDots }, (_, i) => ({
    angle: i * 0.3,
    y: (i / numDots) * height - height / 2,
  }));

  const animate = (timestamp: number) => {
    if (!lastTime) lastTime = timestamp;

    if (!inViewRef.current) {
      lastTime = timestamp;
      frameId = requestAnimationFrame(animate);
      return;
    }

    time += (timestamp - lastTime) * 0.001 * GLOBAL_SPEED;
    lastTime = timestamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const loopDuration = 8;
    const seamlessProgress = Math.sin((time / loopDuration) * Math.PI * 2);
    const scanY = seamlessProgress * (height / 2);
    const scanWidth = 25;
    const trailLength = height * 0.3;

    dots.forEach((dot) => {
      const x = radius * Math.cos(dot.angle + time);
      const z = radius * Math.sin(dot.angle + time);
      const pX = centerX + x;
      const pY = centerY + dot.y;
      const scale = (z + radius) / (radius * 2);

      const distToScan = Math.abs(dot.y - scanY);
      const leadingEdgeInfluence =
        distToScan < scanWidth
          ? Math.cos((distToScan / scanWidth) * (Math.PI / 2))
          : 0;

      let trailInfluence = 0;
      const distBehindScan = dot.y - scanY;
      const isMovingUp = Math.cos((time / loopDuration) * Math.PI * 2) > 0;

      if (
        (isMovingUp &&
          distBehindScan < 0 &&
          Math.abs(distBehindScan) < trailLength) ||
        (!isMovingUp &&
          distBehindScan > 0 &&
          Math.abs(distBehindScan) < trailLength)
      ) {
        trailInfluence =
          Math.pow(1 - Math.abs(distBehindScan) / trailLength, 2) * 0.4;
      }

      const totalInfluence = Math.max(leadingEdgeInfluence, trailInfluence);

      ctx.beginPath();
      ctx.arc(
        pX,
        pY,
        Math.max(0, scale * 1.8 + totalInfluence * 2.8),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = MONOCHROME_FILL(
        Math.max(0, scale * 0.4 + totalInfluence * 0.6)
      );
      ctx.fill();
    });

    frameId = requestAnimationFrame(animate);
  };

  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

const setupCrystallineCubeRefraction: AnimationSetupFunction = (ctx, inViewRef) => {
  let frameId: number;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const fov = 250;
  const gridSize = 7;
  const spacing = 15;

  const cubeHalfSize = ((gridSize - 1) * spacing) / 2;
  const maxDist = Math.hypot(cubeHalfSize, cubeHalfSize, cubeHalfSize);

  const points: { x: number; y: number; z: number }[] = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        points.push({
          x: x * spacing - cubeHalfSize,
          y: y * spacing - cubeHalfSize,
          z: z * spacing - cubeHalfSize,
        });
      }
    }
  }

  const animate = (timestamp: number) => {
    if (!lastTime) lastTime = timestamp;

    if (!inViewRef.current) {
      lastTime = timestamp;
      frameId = requestAnimationFrame(animate);
      return;
    }

    time += (timestamp - lastTime) * 0.0003 * GLOBAL_SPEED;
    lastTime = timestamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const rotX = time * 2;
    const rotY = time * 3;
    const waveRadius = (timestamp * 0.04 * GLOBAL_SPEED) % (maxDist * 1.5);
    const waveWidth = 40;
    const displacementMagnitude = 10;

    const pointsToDraw: {
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
    }[] = [];

    points.forEach((p_orig) => {
      let { x, y, z } = p_orig;

      const distFromCenter = Math.hypot(x, y, z);
      let waveInfluence = 0;

      if (
        distFromCenter > 0 &&
        Math.abs(distFromCenter - waveRadius) < waveWidth / 2
      ) {
        const displacementAmount =
          easeInOutCubic(
            Math.cos(
              (Math.abs(distFromCenter - waveRadius) / (waveWidth / 2)) *
                (Math.PI / 2)
            )
          ) * displacementMagnitude;
        const ratio = (distFromCenter + displacementAmount) / distFromCenter;
        x *= ratio;
        y *= ratio;
        z *= ratio;
        waveInfluence = displacementAmount / displacementMagnitude;
      }

      let tX = x * Math.cos(rotY) - z * Math.sin(rotY);
      let tZ = x * Math.sin(rotY) + z * Math.cos(rotY);
      x = tX;
      z = tZ;

      let tY = y * Math.cos(rotX) - z * Math.sin(rotX);
      tZ = y * Math.sin(rotX) + z * Math.cos(rotX);
      y = tY;
      z = tZ;

      const scale = fov / (fov + z);
      const size = (1.5 + waveInfluence * 2.5) * scale;

      if (size > 0.1) {
        pointsToDraw.push({
          x: centerX + x * scale,
          y: centerY + y * scale,
          z,
          size,
          opacity: Math.max(0.1, scale * 0.7 + waveInfluence * 0.4),
        });
      }
    });

    pointsToDraw.sort((a, b) => a.z - b.z).forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = MONOCHROME_FILL(p.opacity);
      ctx.fill();
    });

    frameId = requestAnimationFrame(animate);
  };

  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

// --- ANIMATION MAP ---
const animationMap = {
  'sonar-sweep': setupSonarSweep,
  'interconnecting-waves': setupInterconnectingWaves,
  'helix-scanner': setupHelixScanner,
  'crystalline-cube-refraction': setupCrystallineCubeRefraction,
};
