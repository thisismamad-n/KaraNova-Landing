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
          className="absolute left-[-36%] top-0 pointer-events-none z-0 opacity-100"
          pathData="M 353.00 4.00 L 98.00 383.00 Q 98.00 383.00 288.00 671.00 Q 288.00 671.00 858.00 903.00"
          strokeWidth={14}
          viewBox="0 0 900 920"
          svgWidth={900}
          svgHeight={920}
          scrollOffset={["start 0.6", "end 0.1"]}
          progressRange={[0.49, 1]}
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
