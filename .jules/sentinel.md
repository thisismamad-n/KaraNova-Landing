## 2025-02-18 - Regex-based XSS Validation Weakness
**Vulnerability:** The custom regex-based XSS validation in `lib/utils/formSubmission.ts` was missing several event handlers (e.g., `onanimationstart`) and tags (`marquee`), and could be bypassed using named entities in `javascript:` protocol.
**Learning:** Regex-based blocklists for XSS are inherently fragile and difficult to maintain because the attack surface (HTML/JS spec) is vast and constantly evolving.
**Prevention:** In production environments with internet access, always prefer established sanitization libraries like `dompurify` or `sanitize-html` over custom regex solutions. If a custom solution is required due to constraints, ensuring comprehensive coverage of all event handlers and potential bypass techniques (like encoding) is critical but error-prone.

## 2025-02-18 - Nested XSS Bypass in Shallow Validation
**Vulnerability:** The form validation logic only checked top-level string properties for XSS patterns, allowing nested objects (e.g., `{ user: { bio: "<script>..." } }`) to bypass security checks.
**Learning:** Shallow validation of complex data structures leaves gaping holes for attackers to exploit by simply wrapping their payloads in objects or arrays.
**Prevention:** Always implement recursive validation for data structures that can contain nested user input, ensuring every leaf node is inspected regardless of depth.

## 2025-02-18 - [DoS Prevention] Zod Schema Max Length Constraints
**Vulnerability:** Text fields in `ContactForm` lacked length bounds (`z.string()`), which can expose the application to memory exhaustion and DoS attacks via unusually large input payloads.
**Learning:** Zod input validation schemas must define upper bounds (`.max()`) on all string inputs for robust data integrity and resilience. The `.max()` error messages need localized handling matching the custom setup.
**Prevention:** Always append `.max(limit)` to all user-facing `z.string()` endpoints and handle their error outputs carefully when doing custom mapping.
