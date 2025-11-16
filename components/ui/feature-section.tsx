"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [])

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
    >

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
