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

## 2024-05-15 - Required Field Indication and A11y in Forms
**Learning:** Found forms where required fields lacked both visual indicators (asterisks) and semantic indicators (`aria-required`), which hurts accessibility and user confidence.
**Action:** When adding or updating forms, ensure all required fields have a visual indicator (like an asterisk with `aria-hidden="true"`) in the label and the `aria-required="true"` attribute on the corresponding input element.
## 2025-03-08 - Extending Accessible Form Validation
**Learning:** While `ContactForm` implemented `aria-invalid` and `aria-describedby` correctly, other key forms like `SupportForm` and `ApplicationForm` were lacking these attributes. Screen readers rely on these attributes paired with `role="alert"` and matching `id`s to announce validation errors inline as users interact with forms.
**Action:** Always ensure *every* form input across the application includes `aria-invalid` and `aria-describedby` linked to its error message `id`, and ensure the error message container has `role="alert"`.
## 2025-03-11 - Icon Button Accessibility
**Learning:** Icon-only action buttons (like copy buttons) that rely solely on `title` attributes may not provide robust accessibility across all screen readers. Additionally, state-toggling buttons must use `aria-pressed`, and icons within these buttons must be explicitly hidden with `aria-hidden="true"` to prevent raw SVG announcements. Missing keyboard focus classes on these buttons also breaks navigation.
**Action:** When implementing icon-only or toggle buttons, always add `type="button"`, use dynamic `aria-label`s and `aria-pressed` for state changes, add explicit `focus-visible` styling, and apply `aria-hidden="true"` to the internal SVG icons.
## 2024-03-12 - Keyboard Focus in Overflow Hidden Containers
**Learning:** When adding keyboard focus rings to interactive elements inside containers with `overflow-hidden` (like accordions), outer rings with `ring-offset` get cut off. Using inner `focus-visible:ring-2` on the button itself or focusing the background (`focus-visible:bg-slate-900/60`) works better, combined with `rounded` utilities to match the container.
**Action:** Always verify keyboard focus states inside cards or accordions with `overflow-hidden` by using internal rings or checking if the ring is clipped.
## 2026-03-19 - Added keyboard focus states to Error action buttons
**Learning:** Custom error boundaries and network error action buttons are frequently overlooked for accessibility states like focus rings.
**Action:** Add explicit `focus-visible` utility classes to action buttons to ensure keyboard users can effectively navigate and retry requests.
## 2025-03-20 - Icon-Only Button Accessibility
**Learning:** Icon-only action buttons (like the copy code button) that use SVG icons (`Copy`, `Check`) without an explicit `aria-label` and `aria-hidden="true"` on their child icons are entirely invisible or poorly described to screen reader users, confusing the button's action and intent. Also, buttons placed in form-like or dynamic contexts should always have `type="button"` to avoid unintended form submissions.
**Action:** When creating or modifying icon-only action buttons, always ensure an `aria-label` is applied to the button element itself, and decorate child decorative/informative icons with `aria-hidden="true"`. Explicitly declare `type="button"` on non-submit buttons.
## 2025-03-22 - Accordion Accessibility Standard
**Learning:** Custom implementations of accordions (like Pricing FAQ) often miss critical ARIA linkages compared to standardized UI library components. A simple `onClick` toggle isn't enough; screen readers need to know the semantic relationship between the trigger and content.
**Action:** When creating custom accordions or toggleable sections, strictly apply the pattern: `type="button"`, `aria-expanded`, `aria-controls`, and `id` on the trigger, paired with `role="region"`, matching `id`, and `aria-labelledby` on the content container. Also, always ensure decorative icons within the trigger use `aria-hidden="true"`.

## 2026-03-29 - Explicit Required Indicators in Forms
**Learning:** Form validation must be paired with both explicit visual indicators (like an asterisk) and semantic attributes (like `aria-required="true"`) to ensure screen readers and all users understand requirements before submission.
**Action:** When adding or updating form inputs, ensure required fields include a visual indicator marked with `aria-hidden="true"` in the label, and the `aria-required="true"` attribute on the corresponding input element.
