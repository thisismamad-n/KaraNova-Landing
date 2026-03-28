## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2026-03-22 - [Canvas Animation Optimization]
**Learning:** requestAnimationFrame loops continuously consume CPU/GPU even when the canvas is off-screen. Using IntersectionObserver to pause the loop when the canvas is not in the viewport prevents unnecessary rendering.
**Action:** Always wrap continuous requestAnimationFrame canvas animations with an IntersectionObserver and use a mutable `useRef` to control the animation state.
## 2026-03-21 - [Pause Canvas Animations]
**Learning:** requestAnimationFrame loops in Canvas animations continuously consume CPU/GPU even when off-screen if not explicitly paused.
**Action:** Always use an IntersectionObserver combined with a mutable useRef to conditionally pause canvas rendering logic when elements are outside the viewport, reducing idle resource consumption.
