# Continuous Path - Quick Reference

## Current Setup

Your continuous animated path is now active across three sections:
- **WhyChooseUs** (چرا کارانووا؟)
- **Testimonials** (داستان‌های موفقیت)
- **FinalCTA** (آماده تحول)

## Path Data

```
M 1497.00 0.00 C 1515.17 10.33 1852.17 -0.17 1606.00 62.00 C 1359.83 124.17 9.00 212.33 20.00 373.00 C 31.00 533.67 1655.83 829.50 1672.00 1026.00 C 1688.17 1222.50 355.17 1495.33 117.00 1552.00 C -121.17 1608.67 24.00 1315.67 243.00 1366.00 C 462.00 1416.33 1283.33 1792.00 1431.00 1854.00 C 1578.67 1916.00 1177.00 1717.50 1129.00 1738.00 C 1081.00 1758.50 1140.67 1937.17 1143.00 1977.00
```

## Styling Properties (Matching WhyChooseUs)

- **Stroke Width**: 12px
- **Gradient**: Linear gradient from top-left to bottom-right
  - 0%: `var(--landing-primary)` (teal)
  - 55%: `hsl(185, 85%, 70%)` (light cyan)
  - 100%: `var(--landing-accent)` (cyan)
- **Filters**: Triple drop-shadow for glow effect
  - Inner glow: 18px blur, 55% opacity
  - Mid glow: 42px blur, 45% opacity
  - Outer glow: 64px blur, 35% opacity
- **Stroke Opacity**: 0.82
- **Animation**: Scroll-based with spring easing
  - Stiffness: 80
  - Damping: 30
  - Offset: ["start 0.8", "end 0.1"]

## Toggle Between Designer and Production

In `app/landing/page.tsx`, change the `designerMode` variable:

```tsx
// Designer mode - for creating/editing paths
const designerMode = true;

// Production mode - shows the animated path
const designerMode = false;
```

## How It Works

1. **Section IDs**: Each section has an ID
   - `why-choose-section`
   - `testimonials-section`
   - `final-cta-section`

2. **Coordinate System**: The path uses absolute coordinates calculated from the first section's top position

3. **Scroll Animation**: 
   - Path draws as you scroll through the sections
   - Uses `useInView` to only render when visible
   - Smooth spring animation for natural motion

4. **Responsive**: Automatically recalculates dimensions on window resize

## Customization

To modify the path, edit in `app/landing/page.tsx`:

```tsx
<ContinuousPath
  sectionIds={["why-choose-section", "testimonials-section", "final-cta-section"]}
  pathData="YOUR_PATH_DATA_HERE"
  gradientId="continuous-path-gradient"
  strokeWidth={12} // Change thickness
  enabled={!designerMode}
/>
```

## Creating a New Path

1. Set `designerMode = true` in `page.tsx`
2. Reload the page
3. Click on sections to add points (top to bottom)
4. Copy the generated path from the control panel
5. Replace the `pathData` prop
6. Set `designerMode = false`

## Tips

- The path flows from top to bottom across all three sections
- Start with fewer points (8-12) for smoother curves
- Test the scroll animation after creating the path
- The path is positioned at z-index 0 (behind content, above backgrounds)
