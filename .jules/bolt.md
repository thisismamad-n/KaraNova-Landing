## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2026-03-17 - [SVG Filter Performance]
**Learning:** Complex multi-layered SVG `<filter>` tags are generally slower than chaining native CSS `drop-shadow` functions, despite what one might assume. Additionally, using `willChange: 'stroke-dashoffset'` on SVGs with gradients breaks rendering in Blink-based browsers.
**Action:** Always prefer native CSS `drop-shadow` for glows and avoid `willChange` on SVGs with document-level paint servers.
