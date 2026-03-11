## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-19 - [Pause Off-Screen Canvas Animations]
**Learning:** Continuous `requestAnimationFrame` loops on canvas elements (like `Squares.tsx`) continue to consume significant CPU/GPU resources even when the element is off-screen, as they run globally regardless of visibility.
**Action:** Implement `IntersectionObserver` on components with continuous render loops to explicitly `cancelAnimationFrame` when they exit the viewport, and restart them when they become visible again. This significantly reduces idle overhead.
