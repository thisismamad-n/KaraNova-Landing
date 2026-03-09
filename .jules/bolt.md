## 2024-05-19 - [Broken React Compiler Config]
**Learning:** `next.config.js` had `reactCompiler: true` enabled but the required `babel-plugin-react-compiler` dependency was missing, causing build failures. This feature must be disabled or dependencies installed for the app to build.
**Action:** Always check `next.config.js` and `package.json` for dependency mismatches before attempting to build, especially for experimental features.

## 2024-05-19 - [Canvas Grid Optimization]
**Learning:** The `Squares` background component was using `strokeRect` in a nested loop for every frame, resulting in thousands of draw calls. Canvas API has significant overhead per call.
**Action:** Batch drawing operations into a single path (`moveTo`/`lineTo` then `stroke`) whenever possible, especially for grid-like structures. This reduced draw calls from ~1300 to < 10 per frame.

## 2024-05-19 - [Global Transition Delay Pitfall]
**Learning:** Using `transition-all` coupled with a general `transition-delay` inline style applies the delay to *all* transitions, including hover effects like `box-shadow` and `border-color`. This creates an unintended input lag for interactive states.
**Action:** When implementing staggered entrance animations (e.g., in a list mapped by index), explicitly define the `transitionProperty` to restrict the delay to only `opacity` and `transform` so that hover/focus states trigger instantly without inheriting the entrance delay.
