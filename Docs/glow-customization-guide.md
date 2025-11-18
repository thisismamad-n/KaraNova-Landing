# Path Glow Customization Guide

## Overview
This guide explains how to customize the glow effects on animated paths while maintaining optimal performance.

## Performance-Optimized Glow Architecture

The glow system uses a **3-layer approach** for maximum visual impact with minimal performance cost:

### Layer 1: Main Path (Sharp Definition)
- **Purpose**: Provides the crisp, defined edge of the path
- **Technique**: Double drop-shadow for depth
- **Performance**: Low cost (CSS filter, GPU-accelerated)

### Layer 2: Inner Glow (Medium Blur)
- **Purpose**: Creates immediate luminosity around the path
- **Technique**: Blurred duplicate path with screen blend mode
- **Performance**: Medium cost (requires additional render)

### Layer 3: Outer Glow (Wide Blur)
- **Purpose**: Creates atmospheric halo effect
- **Technique**: Wider blur with reduced opacity
- **Performance**: Medium cost (largest blur radius)

## Customization Parameters

### ContinuousPath Component (`components/ui/ContinuousPath.tsx`)

#### Main Path Settings
```typescript
// Location: Line ~130
filter: "drop-shadow(0 0 8px rgba(20, 184, 166, 0.8)) drop-shadow(0 0 16px rgba(20, 184, 166, 0.6))"
strokeOpacity: 0.9
```

**Tweakable Values:**
- `8px` - First glow radius (tight glow)
  - **Increase** for more immediate glow (try 10-12px)
  - **Decrease** for sharper edge (try 4-6px)
- `0.8` - First glow opacity
  - **Increase** for brighter glow (max 1.0)
  - **Decrease** for subtler effect (try 0.6-0.7)
- `16px` - Second glow radius (medium spread)
  - **Increase** for wider glow (try 20-24px)
  - **Decrease** for tighter effect (try 12-14px)
- `0.6` - Second glow opacity
  - **Increase** for more visible halo (try 0.7-0.8)
  - **Decrease** for subtler atmosphere (try 0.4-0.5)
- `strokeOpacity: 0.9` - Main path visibility
  - **Increase** for more solid path (try 0.95-1.0)
  - **Decrease** for more ethereal look (try 0.7-0.85)

#### Inner Glow Layer
```typescript
// Location: Line ~142
stroke="rgba(94, 234, 212, 0.6)"
strokeWidth={strokeWidth * 1.8}
filter: "blur(6px)"
```

**Tweakable Values:**
- `0.6` - Glow color opacity
  - **Increase** for brighter glow (try 0.7-0.8)
  - **Decrease** for subtler effect (try 0.4-0.5)
- `1.8` - Width multiplier
  - **Increase** for wider glow (try 2.0-2.5)
  - **Decrease** for tighter glow (try 1.5-1.7)
- `6px` - Blur radius
  - **Increase** for softer glow (try 8-10px)
  - **Decrease** for sharper glow (try 4-5px)

#### Outer Glow Layer
```typescript
// Location: Line ~156
stroke="rgba(20, 184, 166, 0.4)"
strokeWidth={strokeWidth * 3}
filter: "blur(12px)"
opacity: useTransform(glowOpacity, (v) => (typeof v === 'number' ? v * 0.7 : 0))
```

**Tweakable Values:**
- `0.4` - Atmospheric glow opacity
  - **Increase** for more visible halo (try 0.5-0.6)
  - **Decrease** for subtler atmosphere (try 0.2-0.3)
- `3` - Width multiplier
  - **Increase** for wider atmosphere (try 3.5-4.0)
  - **Decrease** for tighter effect (try 2.5-2.8)
- `12px` - Blur radius
  - **Increase** for softer, wider glow (try 14-18px)
  - **Decrease** for more defined glow (try 8-10px)
- `0.7` - Opacity multiplier
  - **Increase** for more visible (try 0.8-0.9)
  - **Decrease** for subtler (try 0.5-0.6)

### HeroStroke Component (`app/landing/_components/HeroStroke.tsx`)

#### Main Path Settings
```typescript
// Location: Line ~115
filter: 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.8)) drop-shadow(0 0 16px rgba(20, 184, 166, 0.6))'
strokeOpacity: 0.85
```

**Same tweaking principles as ContinuousPath above**

#### Glow Layer
```typescript
// Location: Line ~124
stroke="rgba(94, 234, 212, 0.5)"
strokeWidth="24"
filter: 'blur(10px)'
```

**Tweakable Values:**
- `0.5` - Glow opacity
  - **Increase** for brighter (try 0.6-0.7)
  - **Decrease** for subtler (try 0.3-0.4)
- `24` - Stroke width (fixed, not multiplied)
  - **Increase** for wider glow (try 28-32)
  - **Decrease** for tighter glow (try 18-22)
- `10px` - Blur radius
  - **Increase** for softer glow (try 12-15px)
  - **Decrease** for sharper glow (try 6-8px)

## Performance Guidelines

### ✅ Safe to Increase (Low Performance Impact)
- Opacity values (0.0 - 1.0)
- Stroke width multipliers (1.0 - 4.0)
- Drop-shadow radius up to 20px

### ⚠️ Moderate Impact (Use Carefully)
- Blur radius 10-15px
- Adding a 3rd drop-shadow
- Stroke width multipliers above 4.0

### ❌ High Performance Cost (Avoid)
- Blur radius above 18px
- More than 3 path layers
- More than 2 drop-shadows per path
- Blur radius above 20px on mobile

## Color Customization

### Changing Glow Color

The glow uses teal/cyan colors. To change:

1. **Main path gradient** (defined in SVG defs):
```typescript
<stop offset="0%" stopColor="var(--landing-primary)" />
<stop offset="55%" stopColor="hsl(185, 85%, 70%)" />
<stop offset="100%" stopColor="var(--landing-accent)" />
```

2. **Drop-shadow color**:
```typescript
rgba(20, 184, 166, 0.8)  // Teal
// Change to:
rgba(R, G, B, opacity)
```

3. **Glow layer colors**:
```typescript
rgba(94, 234, 212, 0.6)  // Light teal
rgba(20, 184, 166, 0.4)  // Medium teal
```

### Popular Color Schemes

**Blue/Purple:**
```typescript
// Drop-shadow
rgba(59, 130, 246, 0.8)  // Blue
// Glow layers
rgba(147, 197, 253, 0.6)  // Light blue
rgba(59, 130, 246, 0.4)   // Medium blue
```

**Pink/Magenta:**
```typescript
// Drop-shadow
rgba(236, 72, 153, 0.8)  // Pink
// Glow layers
rgba(251, 207, 232, 0.6)  // Light pink
rgba(236, 72, 153, 0.4)   // Medium pink
```

**Green/Emerald:**
```typescript
// Drop-shadow
rgba(16, 185, 129, 0.8)  // Emerald
// Glow layers
rgba(110, 231, 183, 0.6)  // Light emerald
rgba(16, 185, 129, 0.4)   // Medium emerald
```

## Quick Presets

### Subtle Glow (Best Performance)
```typescript
// Main path
filter: "drop-shadow(0 0 6px rgba(20, 184, 166, 0.6))"
strokeOpacity: 0.85

// Inner glow
strokeWidth * 1.5
blur(4px)
opacity: 0.4

// Outer glow
strokeWidth * 2.5
blur(8px)
opacity: 0.3
```

### Balanced Glow (Current - Recommended)
```typescript
// Main path
filter: "drop-shadow(0 0 8px rgba(20, 184, 166, 0.8)) drop-shadow(0 0 16px rgba(20, 184, 166, 0.6))"
strokeOpacity: 0.9

// Inner glow
strokeWidth * 1.8
blur(6px)
opacity: 0.6

// Outer glow
strokeWidth * 3
blur(12px)
opacity: 0.4
```

### Intense Glow (Higher GPU Cost)
```typescript
// Main path
filter: "drop-shadow(0 0 10px rgba(20, 184, 166, 0.9)) drop-shadow(0 0 20px rgba(20, 184, 166, 0.7))"
strokeOpacity: 0.95

// Inner glow
strokeWidth * 2.2
blur(8px)
opacity: 0.7

// Outer glow
strokeWidth * 3.5
blur(15px)
opacity: 0.5
```

### Neon Glow (Maximum Impact)
```typescript
// Main path
filter: "drop-shadow(0 0 12px rgba(20, 184, 166, 1.0)) drop-shadow(0 0 24px rgba(20, 184, 166, 0.8))"
strokeOpacity: 1.0

// Inner glow
strokeWidth * 2.5
blur(10px)
opacity: 0.8

// Outer glow
strokeWidth * 4
blur(18px)
opacity: 0.6
```

## Testing Your Changes

1. **Visual Check**: Scroll through the page to see the glow in action
2. **Performance Check**: Open Chrome DevTools > Performance tab
3. **Frame Rate**: Should maintain 55-60 FPS during scroll
4. **GPU Memory**: Monitor in Chrome DevTools > Performance Monitor

## Mobile Optimization

For mobile devices, reduce glow intensity:

```typescript
// Add this check in your component
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Then adjust values
const blurRadius = isMobile ? 6 : 12;
const glowOpacity = isMobile ? 0.4 : 0.6;
```

## Troubleshooting

### Glow Too Subtle
- Increase drop-shadow opacity (0.8 → 0.9)
- Increase glow layer opacity (0.6 → 0.7)
- Increase blur radius slightly (6px → 8px)

### Glow Too Intense
- Decrease drop-shadow opacity (0.8 → 0.6)
- Decrease glow layer opacity (0.6 → 0.4)
- Reduce stroke width multipliers

### Performance Issues
- Reduce blur radius (12px → 8px)
- Remove outer glow layer
- Reduce to single drop-shadow
- Lower opacity values

### Glow Not Visible
- Check `mixBlendMode: 'screen'` is set
- Verify background is dark enough
- Increase strokeOpacity on main path
- Check color values have sufficient alpha

## Best Practices

1. **Always test on target devices** - What looks good on desktop may be too intense on mobile
2. **Use `willChange: 'auto'`** - Lets browser optimize rendering
3. **Limit blur radius** - Keep under 15px for best performance
4. **Use screen blend mode** - Essential for glow effect
5. **Layer strategically** - 2-3 layers is optimal
6. **Monitor frame rate** - Should stay above 55 FPS
7. **Test in production build** - Dev mode is slower

## Advanced: Dynamic Glow

For glow that responds to scroll progress:

```typescript
const glowIntensity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

// Then use in style
opacity: glowIntensity
```

This creates a glow that intensifies as you scroll!
