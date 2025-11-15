"use client"

import React from "react"
import { FeatureSteps } from "./feature-section"
import { AnimatedPath } from "./animated-path"

interface FeatureWithPathProps {
  features: Array<{
    step: string
    title?: string
    content: string
    image: string
  }>
  className?: string
  title?: string
  showAnimatedPath?: boolean
}

export function FeatureWithPath({
  features,
  className,
  title,
  showAnimatedPath = true,
}: FeatureWithPathProps) {
  return (
    <div className="relative">
      {/* Animated Path - positioned absolutely behind content */}
      {showAnimatedPath && (
        <AnimatedPath
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0 opacity-20"
          pathData="M 298.00 14.00 C 250 80 180 180 125.00 248.00 C 120 300 122 500 128.00 618.00 C 180 700 280 780 356.00 836.00"
          strokeWidth={12}
          viewBox="0 0 400 900"
          svgWidth={400}
          svgHeight={900}
          scrollOffset={["start 0.7", "end 0.2"]}
          progressRange={[0, 1]}
        />
      )}

      {/* Feature Steps Content */}
      <div className="relative z-10">
        <FeatureSteps
          features={features}
          className={className}
          title={title}
        />
      </div>
    </div>
  )
}
