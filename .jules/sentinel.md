## 2025-02-18 - Regex-based XSS Validation Weakness
**Vulnerability:** The custom regex-based XSS validation in `lib/utils/formSubmission.ts` was missing several event handlers (e.g., `onanimationstart`) and tags (`marquee`), and could be bypassed using named entities in `javascript:` protocol.
**Learning:** Regex-based blocklists for XSS are inherently fragile and difficult to maintain because the attack surface (HTML/JS spec) is vast and constantly evolving.
**Prevention:** In production environments with internet access, always prefer established sanitization libraries like `dompurify` or `sanitize-html` over custom regex solutions. If a custom solution is required due to constraints, ensuring comprehensive coverage of all event handlers and potential bypass techniques (like encoding) is critical but error-prone.

## 2025-02-18 - Nested XSS Bypass in Shallow Validation
**Vulnerability:** The form validation logic only checked top-level string properties for XSS patterns, allowing nested objects (e.g., `{ user: { bio: "<script>..." } }`) to bypass security checks.
**Learning:** Shallow validation of complex data structures leaves gaping holes for attackers to exploit by simply wrapping their payloads in objects or arrays.
**Prevention:** Always implement recursive validation for data structures that can contain nested user input, ensuring every leaf node is inspected regardless of depth.

## 2025-02-18 - Missing Maximum Length Constraints in Form Inputs
**Vulnerability:** The contact form validation logic lacked `.max()` constraints on user-provided string fields (such as name, email, subject, message), making the application susceptible to resource exhaustion or DoS attacks via excessively large payloads.
**Learning:** Depending entirely on client-side constraints (or only setting minimum boundaries) leaves the server vulnerable to processing oversized text inputs, which can slow down request handling and consume unnecessary bandwidth.
**Prevention:** Form validation (both Zod schema and backend validation) must consistently enforce explicit maximum length constraints (e.g., `.max(100)`) on all text inputs to mitigate DoS risks and maintain robust error handling.
