"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Point {
  x: number
  y: number
}

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
  renderCustomVisual?: (feature: Feature, index: number) => React.ReactNode
}

export function FeatureSteps({
  features,
  className,
  title = "سفر کارانوا در سه گام",
  imageHeight = "h-[400px]",
  renderCustomVisual,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [completedUntil, setCompletedUntil] = useState(-1)
  const [isLocked, setIsLocked] = useState(false)
  const wheelTimeoutRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasEnteredRef = useRef(false)

  // Path drawing tool state
  const [pathToolEnabled, setPathToolEnabled] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const [cursorPosition, setCursorPosition] = useState<Point | null>(null)

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [])

  // Keyboard shortcut to toggle path tool (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setPathToolEnabled(prev => !prev)
        if (pathToolEnabled) {
          setPoints([])
        }
      }
      // Escape to close tool
      if (e.key === 'Escape' && pathToolEnabled) {
        setPathToolEnabled(false)
        setPoints([])
      }
      // Ctrl+Z to undo last point
      if (e.ctrlKey && e.key === 'z' && pathToolEnabled && points.length > 0) {
        e.preventDefault()
        setPoints(prev => prev.slice(0, -1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pathToolEnabled, points.length])

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pathToolEnabled || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setPoints(prev => [...prev, { x, y }])
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pathToolEnabled || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const generateSVGPath = () => {
    if (points.length === 0) return ""
    
    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      
      if (i === 1) {
        // First segment - straight line or curve
        const prevPrev = prev
        const next = points[i + 1] ?? curr
        const t = 1
        const c1x = prev.x + ((curr.x - prevPrev.x) / 6) * t
        const c1y = prev.y + ((curr.y - prevPrev.y) / 6) * t
        const c2x = curr.x - ((next.x - prev.x) / 6) * t
        const c2y = curr.y - ((next.y - prev.y) / 6) * t
        path += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`
      } else {
        // Smooth curve using quadratic bezier
        const prevPrev = points[i - 2]
        const next = points[i + 1] ?? curr
        const t = 1
        const c1x = prev.x + ((curr.x - prevPrev.x) / 6) * t
        const c1y = prev.y + ((curr.y - prevPrev.y) / 6) * t
        const c2x = curr.x - ((next.x - prev.x) / 6) * t
        const c2y = curr.y - ((next.y - prev.y) / 6) * t
        path += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`
      }
    }
    
    return path
  }

  const copySVGPath = () => {
    const path = generateSVGPath()
    navigator.clipboard.writeText(path)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEnteredRef.current) {
            hasEnteredRef.current = true
            setIsLocked(true)
            setCompletedUntil(0)
            setCurrentFeature(0)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isLocked) return

    const deltaY = event.deltaY

    // Allow scrolling up
    if (deltaY < 0) return

    // Ignore small scroll movements
    if (Math.abs(deltaY) < 24) return

    // Prevent multiple rapid scrolls
    if (wheelTimeoutRef.current !== null) {
      event.preventDefault()
      return
    }

    // Progress through steps
    if (completedUntil < features.length - 1) {
      event.preventDefault()
      const next = completedUntil + 1
      setCompletedUntil(next)
      setCurrentFeature(next)

      wheelTimeoutRef.current = window.setTimeout(() => {
        wheelTimeoutRef.current = null
        // Unlock after last step
        if (next === features.length - 1) {
          setIsLocked(false)
        }
      }, 600)
    } else {
      // All steps completed, allow normal scroll
      setIsLocked(false)
    }
  }

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className={cn("py-16 md:py-20 lg:py-24 px-8 md:px-12 relative", className)}
      onWheel={handleWheel}
      onClick={pathToolEnabled ? handleContainerClick : undefined}
      onMouseMove={pathToolEnabled ? handleMouseMove : undefined}
      style={{ cursor: pathToolEnabled ? 'crosshair' : 'default' }}
    >
      {/* Path Drawing Tool Overlay */}
      {pathToolEnabled && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {/* Instructions */}
          <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-md rounded-lg p-4 shadow-xl border border-teal-500/30 pointer-events-auto">
            <h3 className="text-teal-300 font-bold mb-2 text-sm">Path Drawing Tool</h3>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Click to add points</li>
              <li>• Ctrl+Z to undo</li>
              <li>• Escape to close</li>
              <li>• Ctrl+Shift+P to toggle</li>
            </ul>
            {points.length > 0 && (
              <button
                onClick={copySVGPath}
                className="mt-3 w-full px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded text-xs font-medium transition-colors"
              >
                Copy SVG Path ({points.length} points)
              </button>
            )}
          </div>

          {/* SVG Canvas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Draw the path */}
            {points.length > 0 && (
              <path
                d={generateSVGPath()}
                stroke="rgba(20, 184, 166, 0.8)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="drop-shadow(0 0 8px rgba(20, 184, 166, 0.6))"
              />
            )}

            {/* Draw preview line from last point to cursor */}
            {points.length > 0 && cursorPosition && (
              <line
                x1={points[points.length - 1].x}
                y1={points[points.length - 1].y}
                x2={cursorPosition.x}
                y2={cursorPosition.y}
                stroke="rgba(20, 184, 166, 0.4)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}

            {/* Draw points */}
            {points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="rgba(20, 184, 166, 0.9)"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={point.x + 12}
                  y={point.y - 8}
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  className="drop-shadow-lg"
                >
                  {index + 1}
                </text>
              </g>
            ))}

            {/* Cursor crosshair */}
            {cursorPosition && (
              <>
                <line
                  x1={cursorPosition.x - 10}
                  y1={cursorPosition.y}
                  x2={cursorPosition.x + 10}
                  y2={cursorPosition.y}
                  stroke="rgba(20, 184, 166, 0.5)"
                  strokeWidth="1"
                />
                <line
                  x1={cursorPosition.x}
                  y1={cursorPosition.y - 10}
                  x2={cursorPosition.x}
                  y2={cursorPosition.y + 10}
                  stroke="rgba(20, 184, 166, 0.5)"
                  strokeWidth="1"
                />
              </>
            )}
          </svg>

          {/* Coordinates display */}
          {cursorPosition && (
            <div
              className="absolute bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-teal-200 font-mono pointer-events-none"
              style={{
                left: cursorPosition.x + 15,
                top: cursorPosition.y - 25
              }}
            >
              {Math.round(cursorPosition.x)}, {Math.round(cursorPosition.y)}
            </div>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index <= completedUntil
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground",
                  )}
                >
                  {index <= completedUntil ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative overflow-hidden rounded-lg",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {(() => {
                        const custom = renderCustomVisual?.(feature, index)
                        if (custom) {
                          return (
                            <div className="w-full h-full">{custom}</div>
                          )
                        }
                        return (
                          <>
                            <Image
                              src={feature.image}
                              alt={feature.step}
                              className="w-full h-full object-cover transition-transform transform"
                              width={1000}
                              height={500}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
                          </>
                        )
                      })()}
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
