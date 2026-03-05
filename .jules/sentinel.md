## 2025-02-18 - Regex-based XSS Validation Weakness
**Vulnerability:** The custom regex-based XSS validation in `lib/utils/formSubmission.ts` was missing several event handlers (e.g., `onanimationstart`) and tags (`marquee`), and could be bypassed using named entities in `javascript:` protocol.
**Learning:** Regex-based blocklists for XSS are inherently fragile and difficult to maintain because the attack surface (HTML/JS spec) is vast and constantly evolving.
**Prevention:** In production environments with internet access, always prefer established sanitization libraries like `dompurify` or `sanitize-html` over custom regex solutions. If a custom solution is required due to constraints, ensuring comprehensive coverage of all event handlers and potential bypass techniques (like encoding) is critical but error-prone.

## 2025-02-18 - Nested XSS Bypass in Shallow Validation
**Vulnerability:** The form validation logic only checked top-level string properties for XSS patterns, allowing nested objects (e.g., `{ user: { bio: "<script>..." } }`) to bypass security checks.
**Learning:** Shallow validation of complex data structures leaves gaping holes for attackers to exploit by simply wrapping their payloads in objects or arrays.
**Prevention:** Always implement recursive validation for data structures that can contain nested user input, ensuring every leaf node is inspected regardless of depth.

## 2025-03-05 - DoS Vulnerability via Missing Input Length Limits
**Vulnerability:** The Zod validation schema in `ContactForm.tsx` used `z.string()` constraints without `max()` length limits for fields like `name`, `email`, `message`, etc.
**Learning:** Forms lacking maximum length validations are vulnerable to Denial of Service (DoS) attacks, as attackers can send excessively large payloads (e.g., megabytes of text) which exhaust server memory during parsing or regex validation (like email/phone regex).
**Prevention:** Always enforce explicit `.max()` limits on all text inputs in validation schemas (e.g., Zod, Yup). The lengths should reflect realistic upper bounds (e.g., 100 for names, 2000 for messages) to reject oversized payloads early in the request lifecycle.
