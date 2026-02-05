import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (formerly Middleware)
 * Adds comprehensive security headers to all responses
 *
 * Security headers implemented:
 * - Content-Security-Policy (CSP)
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
    // Strict policy that allows only necessary resources
    const cspDirectives = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://images.unsplash.com",
        "connect-src 'self' https://api.karanova.io https://app.karanovaa.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
    ].join('; ');

    // Set security headers
    response.headers.set('Content-Security-Policy', cspDirectives);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

    // HSTS - Enable only in production for HTTPS
    // max-age=31536000 = 1 year, includeSubDomains for all subdomains
    if (process.env.NODE_ENV === 'production') {
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
