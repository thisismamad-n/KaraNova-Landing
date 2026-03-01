## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2025-03-01 - Native SVG filters vs CSS drop-shadow on SVGs
**Learning:** In this codebase, applying CSS `drop-shadow` to complex SVGs (like `StaticLinePath` in `HeroStroke.tsx`) causes severe performance degradation, especially on mobile GPUs, leading to high draw call overhead when scrolling.
**Action:** When creating glowing or shadowed SVG paths, replace `className="drop-shadow-..."` with a native SVG `<filter>` defined in `<defs>` using `feGaussianBlur` and `feMerge`. This offloads the rendering efficiently and resolves the scroll jank.
