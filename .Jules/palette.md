## 2025-02-17 - Invalid Button Nesting
**Learning:** Found a pattern of nesting `<button>` inside `<a>` tags for CTA buttons. This is invalid HTML and causes accessibility issues for screen readers.
**Action:** When inspecting navigation or CTA components, always check for nested interactive elements. Replace with styled `<a>` tags or `Link` components.

## 2025-02-18 - Accessible Form Validation
**Learning:** Standard HTML5 validation or simple error messages are often insufficient for screen readers. Inputs must be programmatically linked to their error messages using `aria-describedby` and `aria-invalid`. Additionally, replacing a form with a success message requires managing focus (e.g., using `ref.current.focus()`) so the user is aware of the change.
**Action:** When implementing forms, always add `id`s to error messages, reference them in `aria-describedby`, and use `useEffect` to focus the success container or message.

## 2025-02-20 - Focus Visibility Pitfalls
**Learning:** Global `*:focus-visible` styles can inadvertently break component design by enforcing a fixed `border-radius` (e.g., 4px on a `rounded-2xl` card). Also, removing default outlines with `focus:outline-none` without providing a sufficient replacement (like a ring) makes inputs invisible to keyboard users.
**Action:** Always verify focus states on non-standard shapes and ensure `focus:outline-none` is paired with a high-contrast `focus-visible:ring-*` style. Override global focus radius when necessary.

## 2025-02-21 - Micro-interactions Accessibility
**Learning:** Visual-only indicators for state (like color changes on active filters or icon rotations) are invisible to screen readers. Buttons acting as toggles or filters must use `aria-pressed` or `aria-expanded` to communicate their state programmatically.
**Action:** When creating filter lists or collapsible sections, always pair visual state changes with the corresponding ARIA attribute (`aria-pressed` for filters, `aria-expanded` for collapsibles).

## 2025-02-23 - Semantic Lists for Visual Grids
**Learning:** Common UI patterns like "Feature Showcases" or "Card Grids" often use `div` soup for layout flexibility. This misses a huge accessibility win: screen readers can announce "List of X items" if semantic `ul`/`li` structure is used.
**Action:** Always refactor grid layouts of similar items (features, products, testimonials) to use `ul` and `li` tags, ensuring `role="list"` is preserved if CSS resets interfere. Consider adding `tabIndex={0}` if the cards have hover effects that keyboard users should also experience.

## 2025-03-11 - Icon Button Accessibility
**Learning:** Icon-only action buttons (like copy buttons) that rely solely on `title` attributes may not provide robust accessibility across all screen readers. Additionally, state-toggling buttons must use `aria-pressed`, and icons within these buttons must be explicitly hidden with `aria-hidden="true"` to prevent raw SVG announcements. Missing keyboard focus classes on these buttons also breaks navigation.
**Action:** When implementing icon-only or toggle buttons, always add `type="button"`, use dynamic `aria-label`s and `aria-pressed` for state changes, add explicit `focus-visible` styling, and apply `aria-hidden="true"` to the internal SVG icons.
