# Onboarding Gradient Customization Guide

## Overview
The onboarding flow uses a large circular radial gradient at the center with NO visible borders. Elements are defined only by where the gradient gets cut off at their edges.

## Main Gradient (Center Glow)

Located in: `app/onboarding/_components/OnboardingFlow.tsx` (around line 110)

```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-[hsl(177,100%,35%)]/30 via-[hsl(177,100%,35%)]/15 to-transparent rounded-full blur-[100px] pointer-events-none" />
```

### How to Customize:

**Size:**
- `w-[1200px] h-[1200px]` - Change these values to make gradient bigger/smaller
- Bigger = `w-[1600px] h-[1600px]`
- Smaller = `w-[800px] h-[800px]`

**Intensity:**
- `from-[hsl(177,100%,35%)]/30` - First stop (center), `/30` = 30% opacity
- `via-[hsl(177,100%,35%)]/15` - Middle stop, `/15` = 15% opacity
- Increase numbers for brighter: `/40`, `/50`, `/60`
- Decrease for dimmer: `/20`, `/10`, `/5`

**Blur Amount:**
- `blur-[100px]` - Controls how soft the gradient is
- More blur = softer: `blur-[150px]`, `blur-[200px]`
- Less blur = sharper: `blur-[80px]`, `blur-[60px]`

**Color:**
- `hsl(177,100%,35%)` - Teal brand color
- Change to cyan: `hsl(190,95%,42%)`
- Change to purple: `hsl(270,70%,50%)`
- Change to blue: `hsl(220,80%,50%)`

### Example Variations:

**Bigger & Brighter:**
```tsx
w-[1600px] h-[1600px] 
bg-gradient-radial from-[hsl(177,100%,35%)]/40 via-[hsl(177,100%,35%)]/20 to-transparent 
blur-[120px]
```

**Smaller & Subtle:**
```tsx
w-[800px] h-[800px] 
bg-gradient-radial from-[hsl(177,100%,35%)]/20 via-[hsl(177,100%,35%)]/10 to-transparent 
blur-[80px]
```

**Multi-color Gradient:**
```tsx
bg-gradient-radial from-[hsl(177,100%,35%)]/30 via-[hsl(190,95%,42%)]/20 to-transparent
```

## Selected Option Cards

When an option is selected, it gets a radial gradient background:

```tsx
<div className="absolute inset-0 bg-gradient-radial from-[hsl(177,100%,35%)]/20 via-[hsl(177,100%,35%)]/10 to-transparent rounded-2xl" />
```

**Customize:**
- Increase opacity for more visible selection: `/30` and `/15`
- Decrease for subtle: `/15` and `/5`

## Toggle Buttons (Login/Signup)

Active toggle gets a radial gradient:

```tsx
<div className="absolute inset-0 bg-gradient-radial from-[hsl(177,100%,35%)]/20 via-[hsl(177,100%,35%)]/10 to-transparent" />
```

**Customize same as above**

## Input Fields

All inputs use a subtle dark background with no borders:

```tsx
className="bg-slate-900/10"
```

**Customize:**
- More visible: `bg-slate-900/20` or `bg-slate-900/30`
- Less visible: `bg-slate-900/5`
- Add slight tint: `bg-[hsl(177,100%,35%)]/5`

## Progress Bar

Container:
```tsx
className="h-2 w-full bg-slate-900/20 rounded-full overflow-hidden"
```

**Customize:**
- Darker container: `bg-slate-900/30`
- Lighter container: `bg-slate-900/10`

## Quick Tips

1. **All opacity values** use `/XX` format where XX is 0-100
2. **No borders** - elements are defined by gradient cutoff only
3. **HSL colors** format: `hsl(hue, saturation%, lightness%)`
   - Hue: 0-360 (color wheel)
   - Saturation: 0-100% (color intensity)
   - Lightness: 0-100% (brightness)
4. **Blur values** in pixels: `blur-[XXpx]`
5. **Size values** in pixels: `w-[XXpx] h-[XXpx]`

## Testing Your Changes

1. Save the file
2. Check the onboarding page in browser
3. Scroll through all steps to see gradient effect
4. Test selected states by clicking options
5. Adjust values until you get desired look

## Common Adjustments

**"Gradient too subtle"**
→ Increase opacity: `/30` → `/40` or `/50`
→ Increase size: `w-[1200px]` → `w-[1600px]`

**"Gradient too bright"**
→ Decrease opacity: `/30` → `/20` or `/15`
→ Increase blur: `blur-[100px]` → `blur-[150px]`

**"Want sharper edges"**
→ Decrease blur: `blur-[100px]` → `blur-[60px]`
→ Decrease size: `w-[1200px]` → `w-[900px]`

**"Want different color"**
→ Change HSL hue value (first number)
→ Keep saturation and lightness similar for consistency
