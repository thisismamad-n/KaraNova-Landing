## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-20 - [Static Array Re-allocation Optimization]
**Learning:** In `app/landing/_components/WhyChooseUs.tsx`, a large array of objects (containing static strings and JSX elements) was being recreated on every render of the component. This causes unnecessary garbage collection and can trigger re-renders in child components if passed as props.
**Action:** Move static data structures (like lists of features or strings that do not depend on props or state) completely outside the React component function, or wrap them in `useMemo` if they depend on local scope variables.