## 2025-02-17 - Invalid Button Nesting
**Learning:** Found a pattern of nesting `<button>` inside `<a>` tags for CTA buttons. This is invalid HTML and causes accessibility issues for screen readers.
**Action:** When inspecting navigation or CTA components, always check for nested interactive elements. Replace with styled `<a>` tags or `Link` components.

## 2025-02-18 - Accessible Form Validation
**Learning:** Standard HTML5 validation or simple error messages are often insufficient for screen readers. Inputs must be programmatically linked to their error messages using `aria-describedby` and `aria-invalid`. Additionally, replacing a form with a success message requires managing focus (e.g., using `ref.current.focus()`) so the user is aware of the change.
**Action:** When implementing forms, always add `id`s to error messages, reference them in `aria-describedby`, and use `useEffect` to focus the success container or message.

## 2025-02-20 - Focus Visibility Pitfalls
**Learning:** Global `*:focus-visible` styles can inadvertently break component design by enforcing a fixed `border-radius` (e.g., 4px on a `rounded-2xl` card). Also, removing default outlines with `focus:outline-none` without providing a sufficient replacement (like a ring) makes inputs invisible to keyboard users.
**Action:** Always verify focus states on non-standard shapes and ensure `focus:outline-none` is paired with a high-contrast `focus-visible:ring-*` style. Override global focus radius when necessary.
