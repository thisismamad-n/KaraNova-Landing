## 2025-02-18 - Regex-based XSS Validation Weakness
**Vulnerability:** The custom regex-based XSS validation in `lib/utils/formSubmission.ts` was missing several event handlers (e.g., `onanimationstart`) and tags (`marquee`), and could be bypassed using named entities in `javascript:` protocol.
**Learning:** Regex-based blocklists for XSS are inherently fragile and difficult to maintain because the attack surface (HTML/JS spec) is vast and constantly evolving.
**Prevention:** In production environments with internet access, always prefer established sanitization libraries like `dompurify` or `sanitize-html` over custom regex solutions. If a custom solution is required due to constraints, ensuring comprehensive coverage of all event handlers and potential bypass techniques (like encoding) is critical but error-prone.

## 2025-02-18 - Nested XSS Bypass in Shallow Validation
**Vulnerability:** The form validation logic only checked top-level string properties for XSS patterns, allowing nested objects (e.g., `{ user: { bio: "<script>..." } }`) to bypass security checks.
**Learning:** Shallow validation of complex data structures leaves gaping holes for attackers to exploit by simply wrapping their payloads in objects or arrays.
**Prevention:** Always implement recursive validation for data structures that can contain nested user input, ensuring every leaf node is inspected regardless of depth.

## 2025-02-18 - Missing Input Length Limits in Form Validation
**Vulnerability:** The Zod validation schema for forms lacked maximum length constraints on text inputs (e.g., `name`, `company`, `subject`, `message`), leaving the application vulnerable to Denial of Service (DoS) attacks via oversized payloads.
**Learning:** Only defining `min` constraints allows attackers to submit arbitrarily large strings, which can consume significant server resources during parsing, logging, and storage, leading to resource exhaustion.
**Prevention:** Always define explicit maximum length constraints (e.g., `.max(100)`) on all text inputs during schema definition to ensure predictable memory usage and prevent DoS vectors.

## 2025-02-18 - Missing Input Length Limits in Form Validation
**Vulnerability:** The Zod validation schema for forms lacked maximum length constraints on text inputs (e.g., `name`, `company`, `subject`, `message`), leaving the application vulnerable to Denial of Service (DoS) attacks via oversized payloads.
**Learning:** Only defining `min` constraints allows attackers to submit arbitrarily large strings, which can consume significant server resources during parsing, logging, and storage, leading to resource exhaustion.
**Prevention:** Always define explicit maximum length constraints (e.g., `.max(100)`) on all text inputs during schema definition to ensure predictable memory usage and prevent DoS vectors.
## 2025-02-18 - Missing Input Length Limits (ReDoS risk)
**Vulnerability:** The server-side form validation utility `containsXSS` used regex patterns to detect malicious input but lacked a prior length limit check on string properties.
**Learning:** Processing unbounded input with regular expressions introduces significant ReDoS (Regular Expression Denial of Service) and general DoS risks, allowing attackers to tie up the server thread by sending overly long strings.
**Prevention:** Always enforce a maximum length limit on user input *before* evaluating it with regular expressions, keeping string size within reasonable bounds for the application.
