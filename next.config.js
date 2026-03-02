/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: false, // Enable React Compiler for Next.js 16

  // Security headers configuration (fallback for proxy.ts)
  async headers() {
    // Content Security Policy
    // Balanced policy that works with Next.js while maintaining security
    const isDevelopment = process.env.NODE_ENV === 'development';

    const cspDirectives = [
        "default-src 'self'",
        // Script sources - allow Next.js chunks and inline scripts in dev
        isDevelopment
            ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
            : "script-src 'self' 'unsafe-inline'",
        // Style sources - allow inline styles for styled-jsx and Tailwind
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        // Font sources
        "font-src 'self' https://fonts.gstatic.com data:",
        // Image sources - allow external images
        "img-src 'self' data: blob: https:",
        // Connect sources - API endpoints and external services
        isDevelopment
            ? "connect-src 'self' https://api.karanova.io https://app.karanovaa.com ws: wss:"
            : "connect-src 'self' https://api.karanova.io https://app.karanovaa.com",
        // Frame sources - allow Google Maps embedding
        "frame-ancestors 'none'",
        "frame-src 'self' https://www.google.com",
        // Base URI restriction
        "base-uri 'self'",
        // Form action restriction
        "form-action 'self'",
        // Object/embed restriction
        "object-src 'none'",
        // Media sources
        "media-src 'self' data: blob:",
        // Worker sources for web workerst
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
