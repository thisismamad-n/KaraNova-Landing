
## 2024-03-13 - [Support Form Accessibility Enhancements]
**Learning:** React form elements requiring client-side validation errors must be programmatically linked to their corresponding alert messages via `aria-invalid` and `aria-describedby` with matching unique `id`s for screen readers to announce them correctly during validation cycles.
**Action:** When adding or updating custom form inputs with error states, ensure `aria-invalid={!!error}`, `aria-describedby="field-error-id"`, and matching `id="field-error-id"` with `role="alert"` are explicitly defined on the error message containers.
## $(date +%Y-%m-%d) - Add keyboard focus indicators to primary form buttons
**Learning:** Custom form buttons missing `focus-visible` styles lead to poor keyboard navigation accessibility, making it hard for keyboard users to track their focus state.
**Action:** Always include explicitly defined `focus-visible` ring styles (e.g., `focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`) on custom buttons and interactive elements to ensure accessibility for keyboard navigation.
