
## 2024-03-13 - [Support Form Accessibility Enhancements]
**Learning:** React form elements requiring client-side validation errors must be programmatically linked to their corresponding alert messages via `aria-invalid` and `aria-describedby` with matching unique `id`s for screen readers to announce them correctly during validation cycles.
**Action:** When adding or updating custom form inputs with error states, ensure `aria-invalid={!!error}`, `aria-describedby="field-error-id"`, and matching `id="field-error-id"` with `role="alert"` are explicitly defined on the error message containers.
