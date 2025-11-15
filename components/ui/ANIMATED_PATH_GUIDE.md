# Animated Path Guide

## Overview
The animated path component creates a smooth, scroll-triggered line animation similar to the one in `HeroStroke.tsx`. The line draws itself as you scroll down the page.

## Quick Start

### 1. Basic Usage

```tsx
import { AnimatedPath } from "@/components/ui/animated-path"

<AnimatedPath
  pathData="M 298.00 14.00 C 250 80 180 180 125.00 248.00 C 120 300 122 500 128.00 618.00 C 180 700 280 780 356.00 836.00"
  className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0 opacity-15"
/>
```

### 2. Creating Your Own Path

#### Using the Path Drawing Tool:

1. Navigate to your feature section page
2. Press `Ctrl+Shift+P` to activate the path drawing tool
3. Click points on the screen to create your path
4. Press `Ctrl+Z` to undo the last point
5. Click "Copy SVG Path" button to copy the generated path
6. Press `Escape` to close the tool

#### Converting Points to Smooth Curves:

Your path from the tool: `M 298.00 14.00 L 125.00 248.00 Q 125.00 248.00 128.00 618.00 Q 128.00 618.00 356.00 836.00`

To make it smooth with Cubic Bezier curves (C command):

```
M 298.00 14.00 C 250 80 180 180 125.00 248.00 C 120 300 122 500 128.00 618.00 C 180 700 280 780 356.00 836.00
```

**SVG Path Commands:**
- `M x y` - Move to point (starting point)
- `L x y` - Line to point (straight line)
- `Q cx cy x y` - Quadratic curve (one control point)
- `C cx1 cy1 cx2 cy2 x y` - Cubic curve (two control points, smoother)

### 3. Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pathData` | string | - | SVG path data (d attribute) |
| `className` | string | "" | Additional CSS classes |
| `strokeWidth` | number | 14 | Width of the line |
| `viewBox` | string | "0 0 400 900" | SVG viewBox |
| `svgWidth` | number | 400 | SVG width |
| `svgHeight` | number | 900 | SVG height |
| `scrollOffset` | array | ["start 0.6", "end 0.1"] | When animation starts/ends |
| `progressRange` | [number, number] | [0, 1] | Animation progress range |

### 4. Positioning Tips

```tsx
// Behind content, centered
className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0 opacity-15"

// Right side
className="absolute right-0 top-0 pointer-events-none z-0 opacity-20"

// Full width, scaled down
className="absolute inset-0 pointer-events-none z-0 opacity-10 scale-75"
```

### 5. Styling Options

```tsx
// Adjust opacity
opacity-10  // Very subtle
opacity-15  // Subtle
opacity-20  // Visible

// Adjust scale
scale-50    // Half size
scale-75    // 75% size
scale-90    // 90% size

// Adjust stroke width
strokeWidth={8}   // Thin
strokeWidth={12}  // Medium
strokeWidth={16}  // Thick
```

### 6. Example with Feature Section

```tsx
import { FeatureSteps } from "@/components/ui/feature-section"
import { AnimatedPath } from "@/components/ui/animated-path"

export function MyFeature() {
  return (
    <div className="relative">
      {/* Animated Path */}
      <AnimatedPath
        className="absolute left-1/2 top-20 -translate-x-1/2 pointer-events-none z-0 opacity-15"
        pathData="M 298.00 14.00 C 250 80 180 180 125.00 248.00 C 120 300 122 500 128.00 618.00 C 180 700 280 780 356.00 836.00"
        strokeWidth={12}
        viewBox="0 0 400 900"
        svgWidth={400}
        svgHeight={900}
      />

      {/* Content */}
      <div className="relative z-10">
        <FeatureSteps features={myFeatures} />
      </div>
    </div>
  )
}
```

## Tips for Creating Smooth Paths

1. **Use Cubic Bezier (C)** for smooth curves instead of straight lines (L)
2. **Control points** should be between your actual points to create natural curves
3. **Test different values** - adjust control points until the curve looks right
4. **Keep it simple** - fewer points often look better than many points

## Keyboard Shortcuts (Path Tool)

- `Ctrl+Shift+P` - Toggle path drawing tool
- `Ctrl+Z` - Undo last point
- `Escape` - Close tool
- Click - Add point

## Color Customization

The path uses CSS variables from your theme:
- `--landing-primary` - Start color (teal)
- `--landing-accent` - End color (cyan)

To change colors, modify the gradient in `animated-path.tsx` or override in your CSS.
