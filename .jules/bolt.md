## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-19 - [SVG Filter Optimization Anti-patterns]
**Learning:** Re-implementing CSS `drop-shadow` via custom, multi-layer SVG `<filter>` constructs inside React components is a performance anti-pattern. CSS `drop-shadow` is highly optimized and hardware-accelerated by browser rendering engines. A manually constructed `<filter>` with chained `feGaussianBlur` operations serially processes exponentially larger bounding boxes, resulting in severe GPU/CPU rendering overhead, especially when animating paths.
**Action:** Always prefer native CSS `drop-shadow` (via `style` or Tailwind classes) over manual multi-layer SVG `<filter>` tags unless highly specific visual compositing logic is required that CSS cannot handle.

## 2024-05-19 - [willChange Breaks SVG Paint Servers]
**Learning:** Adding the CSS property `willChange: 'stroke-dashoffset'` to an SVG element (like `<motion.path>`) that uses a document-level paint server (e.g., `stroke='url(#tealStroke)'`) promotes the element to its own GPU compositing layer. In Blink-based browsers, this prevents the GPU layer from correctly resolving the paint server, causing the path to render entirely black, leading to a critical visual regression.
**Action:** Do not arbitrarily apply `willChange` to SVG elements that reference `<defs>` objects like gradients or patterns. If animation smoothness is an issue, optimize the path logic rather than forcing a compositing layer.

## 2024-05-19 - [Default Prop Re-allocation Anti-pattern]
**Learning:** Defining default array or object literals in function component parameter signatures (e.g., `function SpiderChart({ metrics = [{...}] })`) forces React to instantiate a new memory reference on *every* render cycle if the parent omits the prop. This silently defeats `React.memo` and forces all internal `useMemo` hooks depending on `metrics` to recalculate unnecessarily.
**Action:** Always extract static default arrays and objects out of the component function scope to a constant variable (e.g., `const DEFAULT_METRICS = [...]`) to preserve referential stability and ensure `React.memo` functions correctly.
