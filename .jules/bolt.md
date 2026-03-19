## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-20 - [Canvas Animation Pause with IntersectionObserver]
**Learning:** Components running continuous `requestAnimationFrame` loops (like canvas backgrounds) consume significant CPU/GPU resources even when outside the viewport, continuing to render at 60fps.
**Action:** Always implement `IntersectionObserver` backed by a mutable `useRef` to skip expensive frame operations when the element leaves the viewport. This reduced main thread frame drawing from ~1ms per frame (60fps) to near 0ms when off-screen.
