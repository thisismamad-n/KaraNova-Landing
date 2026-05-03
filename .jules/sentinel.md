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

## 2026-05-02 - Hardcoded Credential Placeholders in API Examples
**Vulnerability:** API documentation examples used realistic-looking placeholders for sensitive fields like email and password, which can be flagged by security scanners and potentially lead to accidental hardcoding by users.
**Learning:** Using realistic-looking placeholders in documentation, even if they are clearly fake, can trigger security alerts and set a bad example for developers.
**Prevention:** Use standardized, obviously non-functional placeholders like `YOUR_EMAIL` or `YOUR_PASSWORD` in all documentation and code examples.
## 2025-02-18 - Insecure JSON-LD Serialization via dangerouslySetInnerHTML
**Vulnerability:** The `StructuredData` component rendered JSON-LD schemas inside a script tag using `dangerouslySetInnerHTML`. The underlying implementation relied on a simple string replacement `.replace(/</g, "\\u003c")`, leaving it vulnerable to parser-breaking characters and bypasses like `\u2028`, `\u2029`, and `>` which could cause structural XSS or syntax errors if unsanitized data was ingested.
**Learning:** Simple single-character replacements are insufficient to protect script-tag enclosed data, especially since JS string literals can break out using various unicode entities or unescaped quotes depending on context.
**Prevention:** Use a comprehensive unicode escape map replacing `<`, `>`, `\u2028`, and `\u2029` with their exact escaped hex equivalents (`\\u003c`, `\\u003e`, `\\u2028`, `\\u2029`) when interpolating dynamic data into `<script>` tags, especially for `application/ld+json`.

## 2025-02-18 - Insecure File Upload Validation
**Vulnerability:** The ApplicationForm lacked client-side file size and type validation for resumes, creating a Denial of Service (DoS) vector and potential for malicious file uploads.
**Learning:** Relying solely on the presence of a file without validating its properties exposes the application to oversized payloads and unsupported file types.
**Prevention:** Always implement explicit file size limits and whitelist allowed MIME types on the client-side before submission, in addition to robust server-side validation.
