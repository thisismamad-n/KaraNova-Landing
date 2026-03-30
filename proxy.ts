import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (formerly Middleware)
 * Adds comprehensive security headers to all responses
 *
 * Security headers implemented:
 * - Content-Security-Policy (CSP) - Balanced for Next.js compatibility
 * - X-Content-Type-Options
 * - X-Frame-Options
 * - X-XSS-Protection
 * - Referrer-Policy
 * - Permissions-Policy
 * - Cross-Origin-Opener-Policy (COOP)
 * - Strict-Transport-Security (HSTS)
 */
export function proxy(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Strict Content Security Policy to prevent defacement and XSS
    // This locks down what scripts can load and where they can send data
    const cspDirectives = [
        "default-src 'self'",
        // Script sources - allow Next.js chunks. Use nonce for inline scripts.
        isDevelopment
            ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
            : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
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
        // Frame sources - ALLOW Google Maps for OfficeMap component
        "frame-ancestors 'none'",
        "frame-src 'self' https://www.google.com https://www.google.com/maps/embed",
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
    ];

    // Only add upgrade-insecure-requests in production
    if (!isDevelopment) {
        cspDirectives.push("upgrade-insecure-requests");
    }

    // Clone request headers to pass nonce down (NextRequest headers are immutable)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // Set security headers
    response.headers.set('Content-Security-Policy', cspDirectives.join('; '));
    // Pass nonce to Next.js via x-nonce header so it can attach it to inline scripts
    response.headers.set('x-nonce', nonce);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), accelerometer=(), gyroscope=()');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

    // HSTS - Enable only in production for HTTPS
    // max-age=31536000 = 1 year, includeSubDomains for all subdomains
    if (!isDevelopment) {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        );
    }

    return response;
}

// Configure which paths the proxy runs on
export const config = {
    matcher: [
        // Match all paths except static files and API routes
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg|llm.txt|llms.txt).*)',
    ],
};
