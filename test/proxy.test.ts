import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";

const mockHeaders = new Map();
const mockResponse = {
  headers: {
    set: (key: string, value: string) => mockHeaders.set(key, value),
    get: (key: string) => mockHeaders.get(key),
  }
};

mock.module("next/server", () => ({
  NextResponse: {
    next: () => mockResponse
  }
}));

import { proxy } from "../proxy";
import type { NextRequest } from "next/server";

describe("proxy middleware", () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    mockHeaders.clear();
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  test("should set standard security headers", () => {
    const request = {} as NextRequest;
    proxy(request);

    expect(mockHeaders.get('X-Content-Type-Options')).toBe('nosniff');
    expect(mockHeaders.get('X-Frame-Options')).toBe('DENY');
    expect(mockHeaders.get('X-XSS-Protection')).toBe('1; mode=block');
    expect(mockHeaders.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(mockHeaders.get('Cross-Origin-Opener-Policy')).toBe('same-origin');
    expect(mockHeaders.get('Permissions-Policy')).toContain('camera=()');

    const csp = mockHeaders.get('Content-Security-Policy');
    expect(csp).toBeDefined();
    expect(csp).toContain("default-src 'self'");
  });

  test("should configure headers correctly in development mode", () => {
    process.env.NODE_ENV = 'development';
    const request = {} as NextRequest;
    proxy(request);

    const csp = mockHeaders.get('Content-Security-Policy');
    // In dev, should allow unsafe-eval for scripts and lack upgrade-insecure-requests
    expect(csp).toContain("script-src 'self' 'unsafe-eval' 'unsafe-inline'");
    expect(csp).not.toContain("upgrade-insecure-requests");

    // In dev, HSTS should NOT be set
    expect(mockHeaders.get('Strict-Transport-Security')).toBeUndefined();
  });

  test("should configure headers correctly in production mode", () => {
    process.env.NODE_ENV = 'production';
    const request = {} as NextRequest;
    proxy(request);

    const csp = mockHeaders.get('Content-Security-Policy');
    // In prod, should not allow unsafe-eval for scripts and should upgrade insecure requests
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("upgrade-insecure-requests");

    // In prod, HSTS should be set
    const hsts = mockHeaders.get('Strict-Transport-Security');
    expect(hsts).toBeDefined();
    expect(hsts).toContain("max-age=31536000");
    expect(hsts).toContain("includeSubDomains");
    expect(hsts).toContain("preload");
  });
});
