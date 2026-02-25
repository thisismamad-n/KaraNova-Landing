## 2025-02-18 - Regex-based XSS Validation Weakness
**Vulnerability:** The custom regex-based XSS validation in `lib/utils/formSubmission.ts` was missing several event handlers (e.g., `onanimationstart`) and tags (`marquee`), and could be bypassed using named entities in `javascript:` protocol.
**Learning:** Regex-based blocklists for XSS are inherently fragile and difficult to maintain because the attack surface (HTML/JS spec) is vast and constantly evolving.
**Prevention:** In production environments with internet access, always prefer established sanitization libraries like `dompurify` or `sanitize-html` over custom regex solutions. If a custom solution is required due to constraints, ensuring comprehensive coverage of all event handlers and potential bypass techniques (like encoding) is critical but error-prone.

## 2025-02-18 - Nested XSS Evasion in Form Validation
**Vulnerability:** The server-side form validation (`validateFormServerSide`) only checked top-level string values for XSS patterns, allowing malicious payloads nested within objects or arrays to bypass security checks.
**Learning:** Shallow validation of complex data structures (like JSON) leaves applications vulnerable to attacks that can hide payloads in nested properties. Attackers often exploit this by structuring data in unexpected ways.
**Prevention:** Always use recursive validation logic when processing user-supplied data structures of unknown depth or complexity. Ensure security checks are applied to all leaf nodes of the data structure.
