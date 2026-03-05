## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2025-02-14 - [WebGL Render Loop Array Allocation]
**Learning:** The `LaserFlow` component was pushing individual FPS numbers to an array (`fpsSamplesRef.current.push(instFps)`) on every frame, allocating a new array every 750ms and mapping over it to calculate the average FPS. In high-frequency render loops (`requestAnimationFrame`), allocating objects or arrays creates unnecessary GC overhead, which can cause micro-stutters.
**Action:** Always use simple numeric accumulators (e.g., `sum` and `count`) instead of storing individual history samples in arrays when only an average or basic aggregation is needed in a hot path.
