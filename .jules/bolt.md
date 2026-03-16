## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-19 - [Pause Canvas Animation Off-screen]
**Learning:** The `Squares` component ran a continuous `requestAnimationFrame` canvas loop unconditionally. Components that run continuous animations waste CPU/GPU resources when scrolled out of the viewport, leading to reduced overall application performance and increased battery drain.
**Action:** Always implement an `IntersectionObserver` paired with a mutable `useRef` to track visibility state for canvas animations. Use this state to safely pause (`cancelAnimationFrame`) and resume the loop, ensuring rendering only occurs when the component is in view.
