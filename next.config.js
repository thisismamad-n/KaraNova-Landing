/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: false, // Enable React Compiler for Next.js 16

  // Security headers configuration (fallback for proxy.ts)
    async headers() {
    // Content Security Policy
    // Layered CSP Strategy:
    // proxy.ts injects a stricter nonce-based CSP dynamically for routes it matches.
    // This static script-src string (with 'unsafe-inline' in production) is only a fallback for static/non-matched routes.
    // When both are present, the proxy-injected header overrides the static header.
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
        "frame-src 'self' https://www.google.com https://www.google.com/maps/embed",
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
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pro-section.ui-layouts.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
