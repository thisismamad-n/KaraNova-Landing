## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-19 - [ContinuousPathOverlay Optimization]
**Learning:** Multiple CSS `drop-shadow` filters inside a `style` attribute (e.g., `filter: "drop-shadow(...) drop-shadow(...)"`) on continuous animation paths (like those controlled by `framer-motion`'s `useTransform(scrollYProgress, ...)`) cause severe main-thread and GPU bottlenecking due to the browser having to composite the shadow repeatedly on every frame.
**Action:** Replace CSS `drop-shadow` effects with an optimized native SVG `<filter>` block directly inside `<defs>`. This combines blur and composite operations (`feGaussianBlur`, `feMerge`, etc.) at the graphics pipeline level, dramatically reducing GPU overhead. Also, include `willChange: "stroke-dashoffset"` on paths dynamically animated by `framer-motion` to hint the compositor.
