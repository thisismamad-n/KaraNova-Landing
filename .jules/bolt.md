## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-19 - [Off-screen Canvas Loop Optimization]
**Learning:** Components driving continuous `requestAnimationFrame` canvas loops (like `Squares.tsx`) can run needlessly in the background when scrolled out of view, leading to high continuous CPU/GPU overhead on long pages.
**Action:** Use an `IntersectionObserver` coupled with a mutable `useRef` flag (`inViewRef`) to conditionally skip `requestAnimationFrame` updates. When the element is not intersecting, return early from the animation loop and clear the frame reference. When it becomes visible, restart the loop if it's not already running.
