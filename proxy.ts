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
 * - Strict-Transport-Security (HSTS)
 */
export function proxy(request: NextRequest) {
    const response = NextResponse.next();
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    // Content Security Policy
    // Balanced policy that works with Next.js while maintaining security
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    const cspDirectives = [
        "default-src 'self'",
        // Script sources - allow Next.js chunks and inline scripts in dev
        isDevelopment
            ? `script-src 'self' 'unsafe-eval' 'unsafe-inline'`
            : `script-src 'self' 'unsafe-inline'`,
        // Style sources - allow inline styles for styled-jsx and Tailwind
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        // Font sources
        "font-src 'self' https://fonts.gstatic.com data:",
        // Image sources - allow external images
        "img-src 'self' data: blob: https: http:",
        // Connect sources - API endpoints and external services
        isDevelopment
            ? "connect-src 'self' https://api.karanova.io https://app.karanovaa.com ws: wss:"
            : "connect-src 'self' https://api.karanova.io https://app.karanovaa.com",
        // Frame sources - prevent embedding
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

    // Set security headers
    response.headers.set('Content-Security-Policy', cspDirectives.join('; '));
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), accelerometer=(), gyroscope=()');

    // HSTS - Enable only in production for HTTPS
    // max-age=31536000 = 1 year, includeSubDomains for all subdomains
    if (!isDevelopment) {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        );
    }

    // Pass nonce to the request for use in components if needed
    response.headers.set('x-nonce', nonce);

    return response;
}

// Configure which paths the proxy runs on
export const config = {
    matcher: [
        // Match all paths except static files and API routes
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg|llm.txt|llms.txt).*)',
    ],
};
