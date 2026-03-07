## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-19 - [SVG Animation Performance & Bugs]
**Learning:** Using complex multi-layered SVG `<filter>` tags on animated elements (like `motion.path`) causes significant rendering overhead. Additionally, applying `willChange: "stroke-dashoffset"` to SVGs with gradient strokes (`stroke="url(...)"`) causes visual regressions and rendering breaks in Blink-based browsers.
**Action:** Replace expensive SVG `<filter>` setups with CSS native `drop-shadow` functions applied to the element's style, as they are often better hardware-accelerated. Never use `willChange` on SVGs that have document-level paint servers (gradients) applied.
