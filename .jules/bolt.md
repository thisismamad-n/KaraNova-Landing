## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-20 - [Static Array Re-allocation Optimization]
**Learning:** In `app/landing/_components/WhyChooseUs.tsx`, a large array of objects (containing static strings and JSX elements) was being recreated on every render of the component. This causes unnecessary garbage collection and can trigger re-renders in child components if passed as props.
**Action:** Move static data structures (like lists of features or strings that do not depend on props or state) completely outside the React component function, or wrap them in `useMemo` if they depend on local scope variables.
## 2025-02-14 - [WebGL Render Loop Array Allocation]
**Learning:** The `LaserFlow` component was pushing individual FPS numbers to an array (`fpsSamplesRef.current.push(instFps)`) on every frame, allocating a new array every 750ms and mapping over it to calculate the average FPS. In high-frequency render loops (`requestAnimationFrame`), allocating objects or arrays creates unnecessary GC overhead, which can cause micro-stutters.
**Action:** Always use simple numeric accumulators (e.g., `sum` and `count`) instead of storing individual history samples in arrays when only an average or basic aggregation is needed in a hot path.
## 2024-05-19 - [Global Transition Delay Pitfall]
**Learning:** Using `transition-all` coupled with a general `transition-delay` inline style applies the delay to *all* transitions, including hover effects like `box-shadow` and `border-color`. This creates an unintended input lag for interactive states.
**Action:** When implementing staggered entrance animations (e.g., in a list mapped by index), explicitly define the `transitionProperty` to restrict the delay to only `opacity` and `transform` so that hover/focus states trigger instantly without inheriting the entrance delay.
## 2026-03-13 - [Canvas IntersectionObserver]
**Learning:** The `Squares` component was running its `requestAnimationFrame` continuous canvas loop constantly, even when the element was completely scrolled out of view. This consumes CPU/GPU resources unnecessarily.
**Action:** Add an `IntersectionObserver` to track the canvas visibility and pause the `requestAnimationFrame` when `isIntersecting` is false. Restart it only when it re-enters the viewport.
## 2026-03-16 - [Job Lookup Optimization]
**Learning:** Using a Map for lookups instead of Array.find provides O(1) complexity, and React's 'cache' avoids redundant lookups across the Server Component lifecycle.
**Action:** Use Map-based indices and 'cache' for frequently accessed data in Next.js Server Components.
## 2026-03-17 - [SVG Filter Performance]
**Learning:** Complex multi-layered SVG `<filter>` tags are generally slower than chaining native CSS `drop-shadow` functions, despite what one might assume. Additionally, using `willChange: 'stroke-dashoffset'` on SVGs with gradients breaks rendering in Blink-based browsers.
**Action:** Always prefer native CSS `drop-shadow` for glows and avoid `willChange` on SVGs with document-level paint servers.
## 2026-03-22 - [Canvas Animation Optimization]
**Learning:** requestAnimationFrame loops continuously consume CPU/GPU even when the canvas is off-screen. Using IntersectionObserver to pause the loop when the canvas is not in the viewport prevents unnecessary rendering.
**Action:** Always wrap continuous requestAnimationFrame canvas animations with an IntersectionObserver and use a mutable `useRef` to control the animation state.
## 2026-03-21 - [Pause Canvas Animations]
**Learning:** requestAnimationFrame loops in Canvas animations continuously consume CPU/GPU even when off-screen if not explicitly paused.
**Action:** Always use an IntersectionObserver combined with a mutable useRef to conditionally pause canvas rendering logic when elements are outside the viewport, reducing idle resource consumption.

## 2025-02-19 - Optimize API endpoints filtering with useMemo
**Learning:** Wrapping potentially heavy rendering array `.filter()` operations inside React's `useMemo` reduces layout computation times dramatically across renders, and extracting static arrays or objects from functional components prevents unnecessary memory re-allocation overhead.
**Action:** Next time you review a React component rendering a filtered list based on state, evaluate whether the filtering operation and static configuration objects can be hoisted to module-level scope or wrapped in a `useMemo` hook to ensure smooth and fast render iterations.

## 2025-02-19 - Optimize MultiSectionOverlay inside components/ui/multi-section-path-designer.tsx
**Learning:** O(N*M) algorithmic overhead happens easily within React render mapping functions when looking up indices dynamically (e.g., `allPoints.findIndex`).
**Action:** Pre-compute array indices alongside the elements they refer to using single O(N) pass inside `useMemo` hooks, instead of resolving them dynamically inside `.map()` iterations.

## 2026-05-02 - [Static Import Optimization]
**Learning:** Dynamic imports in Server Components introduce micro-task overhead and asynchronous resolution on every request, even when the module is already cached. Switching to static imports for unconditional dependencies eliminates this overhead.
**Action:** Prefer static imports for modules that are required for the primary rendering path of a Server Component, especially when the module is already imported elsewhere in the same file.
