# Implementation Tips & Best Practices

## Quick Start

The redesigned hooks are already integrated into your landing page. No additional setup required!

**Files Modified**:
- `app/landing/_components/InovaCard.tsx` - Completely redesigned
- `app/landing/_components/TaskEaseCard.tsx` - Completely redesigned

---

## Customization Guide

### Changing Text Content

#### Inova Hook
```tsx
// File: app/landing/_components/InovaCard.tsx
// Line ~45-47 (Main headline)
چهار مشاور هوشمند، یک اکوسیستم

// Line ~58-60 (Subheadline)
تحلیل بازار، مدیریت ریسک، بهینه‌سازی زنجیره تامین و تولید محتوای خلاقانه
```

#### TaskEase Hook
```tsx
// File: app/landing/_components/TaskEaseCard.tsx
// Line ~35-37 (Main headline)
مدیریت پروژه با هوش مصنوعی

// Line ~48-50 (Subheadline)
اسپرینت‌های خودکار، تخصیص هوشمند منابع و پیش‌بینی دقیق زمان تحویل
```

---

## Adjusting Position

Both hooks are positioned in `HeroStroke.tsx`:

```tsx
// File: app/landing/_components/HeroStroke.tsx
// Line ~48-49

<InovaFeatureCard left={420} top={980} width={380} />
<TaskEaseFeatureCard left={720} top={1540} width={520} />
```

**Tips**:
- Adjust `left` to move horizontally
- Adjust `top` to move vertically along stroke path
- Adjust `width` to control text wrapping

---

## Color Customization

### Inova Theme (Emerald/Teal)
```tsx
// Headline gradient
from-emerald-200 via-teal-200 to-emerald-300

// AI indicator
bg-emerald-400

// Background glow
from-emerald-500/25 via-teal-500/20 to-cyan-500/15
```

### TaskEase Theme (Cyan/Blue)
```tsx
// Headline gradient
from-cyan-200 via-blue-200 to-cyan-300

// Underline gradient
from-cyan-400 via-blue-400 to-transparent

// Background glow
from-cyan-500/20 via-blue-500/15 to-teal-500/20
```

---

## Animation Tuning

### Slower Animations (More Subtle)
```tsx
// Increase duration values
transition={{ duration: 5, repeat: Infinity }}  // Was 3
```

### Faster Animations (More Dynamic)
```tsx
// Decrease duration values
transition={{ duration: 1.5, repeat: Infinity }}  // Was 3
```

### Disable Animations
```tsx
// Remove animate prop
<motion.div 
  // animate={{ scale: [1, 1.15, 1] }}  ← Comment out
>
```

---

## Responsive Adjustments

### Show on Mobile
```tsx
// Change from:
className="absolute z-20 hidden pointer-events-none md:block"

// To:
className="absolute z-20 pointer-events-none block"
```

**Note**: Consider adjusting positioning for mobile viewports!

### Mobile-Specific Positioning
```tsx
<motion.div
  className="absolute z-20 hidden md:block"
  style={{ 
    left: window.innerWidth < 768 ? 20 : 420,  // Mobile vs Desktop
    top,
    width: window.innerWidth < 768 ? 300 : 420
  }}
>
```

---

## SEO Optimization Tips

### Add Structured Data
```tsx
<motion.h2 
  itemProp="headline"
  className="text-4xl font-bold"
>
  <span className="bg-gradient-to-l ...">
    چهار مشاور هوشمند، یک اکوسیستم
  </span>
</motion.h2>
```

### Add Meta Keywords
```tsx
// In your page metadata
export const metadata = {
  keywords: [
    'مدیریت پروژه با هوش مصنوعی',
    'چهار مشاور هوشمند',
    'اسپرینت‌های خودکار',
    // ... more keywords
  ]
}
```

---

## Performance Tips

### Reduce Animation Complexity
```tsx
// Use CSS transforms (GPU-accelerated)
transform: translateX(0)  ✅
left: 0px                 ❌

// Use opacity instead of visibility
opacity: 0  ✅
display: none  ❌
```

### Lazy Load Below Fold
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-20%" }}  // Load before visible
>
```

---

## A/B Testing Setup

### Variant A: Current Design
```tsx
<InovaFeatureCard left={420} top={980} width={380} />
```

### Variant B: Alternative Position
```tsx
<InovaFeatureCard left={500} top={1100} width={400} />
```

### Track with Analytics
```tsx
<motion.div
  onClick={() => {
    // Track interaction
    analytics.track('hook_interaction', { hook: 'inova' });
  }}
>
```

---

## Troubleshooting

### Hooks Not Visible
1. Check viewport breakpoint: `hidden md:block`
2. Verify positioning doesn't push off-screen
3. Check z-index conflicts

### Animations Not Working
1. Ensure Framer Motion is installed
2. Check browser supports CSS transforms
3. Verify no conflicting CSS

### Text Overflow
1. Adjust `width` prop
2. Use `text-balance` utility
3. Reduce font size on smaller widths

---

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  

**Note**: Gradient text requires `-webkit-background-clip` support
