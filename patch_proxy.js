const fs = require('fs');

const file = 'proxy.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace the CSP section in proxy.ts
const newCspDirectives = `    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Strict Content Security Policy to prevent defacement and XSS
    // This locks down what scripts can load and where they can send data
    const cspDirectives = [
        "default-src 'self'",
        // Script sources - allow Next.js chunks. Use nonce for inline scripts.
        isDevelopment
            ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
            : \`script-src 'self' 'nonce-\${nonce}' 'strict-dynamic'\`,
        // Style sources - Framer Motion and styled-jsx require inline styles
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        // Font sources
        "font-src 'self' https://fonts.gstatic.com data:",
        // Image sources - allow only self, data URIs, and specific CDNs used in project
        "img-src 'self' data: blob: https://images.unsplash.com https://pro-section.ui-layouts.com",
        // Connect sources - STRICTLY limit where data can be sent (prevents data exfiltration)
        isDevelopment
            ? "connect-src 'self' https://api.karanova.io https://app.karanovaa.com ws: wss:"
            : "connect-src 'self' https://api.karanova.io https://app.karanovaa.com",
        // Frame sources - STRICTLY 'none' to prevent clickjacking and malicious iframe embedding
        "frame-ancestors 'none'",
        "frame-src 'none'",
        // Base URI restriction - prevent base tag injection
        "base-uri 'self'",
        // Form action restriction - prevent malicious form submissions
        "form-action 'self'",
        // Object/embed restriction - prevent Flash/Java applet injection
        "object-src 'none'",
        // Media sources
        "media-src 'self' data: blob:",
        // Worker sources for web workers
        "worker-src 'self' blob:",
        // Manifest source
        "manifest-src 'self'",
    ];`;

// Replace from `const isDevelopment = process.env.NODE_ENV === 'development';`
// down to the end of the `cspDirectives` array.
const regex = /const isDevelopment = process\.env\.NODE_ENV === 'development';[\s\S]*?];/;
content = content.replace(regex, newCspDirectives);

// Update response.headers to pass the nonce to Next.js
content = content.replace(
    /response\.headers\.set\('Content-Security-Policy', cspDirectives\.join\('; '\)\);/,
    `response.headers.set('Content-Security-Policy', cspDirectives.join('; '));
    // Pass nonce to Next.js via x-nonce header so it can attach it to inline scripts
    response.headers.set('x-nonce', nonce);
    request.headers.set('x-nonce', nonce);`
);

fs.writeFileSync(file, content);
