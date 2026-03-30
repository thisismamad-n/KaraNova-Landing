const fs = require('fs');

const file = 'next.config.js';
let content = fs.readFileSync(file, 'utf8');

// The CSP headers in next.config.js are essentially doing the same thing but with the older, less strict policy.
// Next.js handles proxy.ts dynamically, while next.config.js handles headers statically.
// We should update next.config.js to have the SAME strictly locked down policy for static routes, except without the nonce (since nonces require dynamic server generation).

// Let's replace the whole `headers()` function to reflect the hardened policy but without a nonce (fallback for static assets).

const newHeaders = `  async headers() {
    // Content Security Policy
    // Balanced policy that works with Next.js while maintaining security
    const isDevelopment = process.env.NODE_ENV === 'development';

    const cspDirectives = [
        "default-src 'self'",
        // Script sources - allow Next.js chunks and inline scripts in dev
        isDevelopment
            ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
            : "script-src 'self' 'unsafe-inline'", // Static fallback needs unsafe-inline, proxy handles strict nonce
        // Style sources - allow inline styles for styled-jsx and Tailwind
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        // Font sources
        "font-src 'self' https://fonts.gstatic.com data:",
        // Image sources - allow external images used in the project
        "img-src 'self' data: blob: https://images.unsplash.com https://pro-section.ui-layouts.com",
        // Connect sources - STRICTLY limit where data can be sent (prevents data exfiltration)
        isDevelopment
            ? "connect-src 'self' https://api.karanova.io https://app.karanovaa.com ws: wss:"
            : "connect-src 'self' https://api.karanova.io https://app.karanovaa.com",
        // Frame sources - STRICTLY 'none' to prevent clickjacking and malicious iframe embedding
        "frame-ancestors 'none'",
        "frame-src 'none'",
        // Base URI restriction
        "base-uri 'self'",
        // Form action restriction
        "form-action 'self'",
        // Object/embed restriction
        "object-src 'none'",
        // Media sources
        "media-src 'self' data: blob:",
        // Worker sources for web workers
        "worker-src 'self' blob:",
        // Manifest source
        "manifest-src 'self'",
    ];

    // Only add upgrade-insecure-requests in production
    if (!isDevelopment) {
        cspDirectives.push("upgrade-insecure-requests");
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; ')
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), accelerometer=(), gyroscope=()'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ],
      },
    ];
  },`;

const regex = /async headers\(\) \{[\s\S]*?\},(?=\n\n  images: \{)/;
content = content.replace(regex, newHeaders);

fs.writeFileSync(file, content);
