## 2025-02-18 - Regex-based XSS Validation Weakness
**Vulnerability:** The custom regex-based XSS validation in `lib/utils/formSubmission.ts` was missing several event handlers (e.g., `onanimationstart`) and tags (`marquee`), and could be bypassed using named entities in `javascript:` protocol.
**Learning:** Regex-based blocklists for XSS are inherently fragile and difficult to maintain because the attack surface (HTML/JS spec) is vast and constantly evolving.
**Prevention:** In production environments with internet access, always prefer established sanitization libraries like `dompurify` or `sanitize-html` over custom regex solutions. If a custom solution is required due to constraints, ensuring comprehensive coverage of all event handlers and potential bypass techniques (like encoding) is critical but error-prone.
## 2025-02-18 - CSP Configuration Sync
**Vulnerability:** Google Maps functionality was broken because `proxy.ts` (middleware) had a stricter Content Security Policy (`frame-src 'none'`) than `next.config.js` (`frame-src 'self' ...`), and middleware takes precedence for page requests.
**Learning:** Security headers in middleware must be synchronized with fallback configurations in `next.config.js`. Middleware is often the primary enforcer, so discrepancies can lead to broken features or unexpected blocks.
**Prevention:** Maintain a single source of truth for CSP directives (e.g., a shared constant file) or ensure rigorous synchronization between middleware and config files.
