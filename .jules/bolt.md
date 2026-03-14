## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.
## 2026-03-14 - IntersectionObserver for requestAnimationFrame Loops
**Learning:** Continuous `requestAnimationFrame` loops in components like `Squares.tsx` can cause high CPU/GPU usage even when the component is not visible to the user.
**Action:** Use an `IntersectionObserver` to track the component's visibility and pause the animation loop (`cancelAnimationFrame`) when out of view, and resume it when back in view.
