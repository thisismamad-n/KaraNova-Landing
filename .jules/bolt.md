## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2026-03-10 - [SVG Filter Performance & willChange Gradient Bug]
**Learning:** Complex multi-layer SVG filters on animated paths cause severe performance degradation. Also, `willChange` properties on SVGs that use gradients (e.g. `url(#gradient)`) break gradient rendering in Blink-based browsers.
**Action:** Use chained native CSS drop-shadows instead of SVG filters for path glows, and avoid using `willChange` on elements painted with gradients.
