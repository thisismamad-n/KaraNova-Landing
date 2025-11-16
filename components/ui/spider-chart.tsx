"use client"

import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Metric = { label: string; value: number }

interface SpiderChartProps {
  metrics?: Metric[]
  max?: number
  levels?: number
  className?: string
}

export function SpiderChart({
  metrics = [
    { label: "رشد", value: 80 },
    { label: "بازده", value: 65 },
    { label: "چابکی", value: 75 },
    { label: "تعامل", value: 60 },
    { label: "پایداری", value: 85 },
    { label: "نوآوری", value: 90 },
  ],
  max = 100,
  levels = 5,
  className,
}: SpiderChartProps) {
  const size = 520
  const center = size / 2
  const radius = size * 0.38

  const angles = useMemo(() => {
    const n = metrics.length
    return metrics.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2)
  }, [metrics])

  const scalePoint = (value: number, angle: number) => {
    const r = (Math.max(0, Math.min(value, max)) / max) * radius
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)]
  }

  const ringPolygons = useMemo(() => {
    const n = metrics.length
    const arr: string[] = []
    for (let l = 1; l <= levels; l++) {
      const frac = l / levels
      const pts: string[] = []
      for (let i = 0; i < n; i++) {
        const x = center + radius * frac * Math.cos(angles[i])
        const y = center + radius * frac * Math.sin(angles[i])
        pts.push(`${x},${y}`)
      }
      arr.push(pts.join(" "))
    }
    return arr
  }, [angles, levels, metrics.length])

  const dataPath = useMemo(() => {
    const pts = metrics.map((m, i) => scalePoint(m.value, angles[i]))
    return `M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")} Z`
  }, [metrics, angles])

  const labelPoints = useMemo(() => {
    const offset = 20
    return metrics.map((m, i) => {
      const x = center + (radius + 32) * Math.cos(angles[i])
      const y = center + (radius + 26) * Math.sin(angles[i])
      const anchor: "start" | "middle" | "end" = Math.cos(angles[i]) > 0.35
        ? "start"
        : Math.cos(angles[i]) < -0.35
        ? "end"
        : "middle"
      return { label: m.label, x: x + (anchor === "start" ? offset : anchor === "end" ? -offset : 0), y, anchor }
    })
  }, [metrics, angles])

  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "w-full h-full relative rounded-2xl overflow-hidden",
        "bg-white/6 backdrop-blur-2xl border border-white/20",
        "ring-1 ring-teal-300/10",
        "transition-all duration-300",
        hovered ? "bg-white/8 ring-teal-300/20 shadow-[0_12px_60px_rgba(20,184,166,0.25)]" : "shadow-[0_8px_40px_rgba(15,23,42,0.2)]",
        className,
      )}
    >
      <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)] blur-2xl" />

      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="glowFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.25)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0.05)" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {ringPolygons.map((pts, i) => (
          <motion.polygon
            key={i}
            points={pts}
            fill={i === ringPolygons.length - 1 ? "url(#glowFill)" : "none"}
            stroke="rgba(226,232,240,0.25)"
            strokeWidth={1}
            initial={{ opacity: 0, scale: 0.98, transformOrigin: `${center}px ${center}px` }}
            animate={{ opacity: 1, scale: hovered ? 1.01 : 1 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          />
        ))}

        {angles.map((ang, i) => {
          const [x, y] = [center + radius * Math.cos(ang), center + radius * Math.sin(ang)]
          return (
            <motion.line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(226,232,240,0.25)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.05 }}
            />
          )
        })}

        <motion.path
          d={dataPath}
          fill="url(#glowFill)"
          stroke="url(#lineGrad)"
          strokeWidth={hovered ? 4 : 3}
          filter="url(#softGlow)"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: hovered ? 1.025 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />

        {metrics.map((m, i) => {
          const [x, y] = scalePoint(m.value, angles[i])
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r={hovered ? 5.5 : 4}
              fill="#34d399"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: hovered ? 1.15 : 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 260, damping: 18 }}
            />
          )
        })}

        {labelPoints.map((p, i) => (
          <motion.text
            key={`lbl-${i}`}
            x={p.x}
            y={p.y}
            textAnchor={p.anchor}
            className="fill-slate-200 text-[13px] md:text-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.4 + i * 0.04 }}
          >
            {p.label}
          </motion.text>
        ))}
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-teal-400/10 to-cyan-400/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(45,212,191,0.08),transparent_60%)]" />
      </div>
    </motion.div>
  )
}
