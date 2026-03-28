/**
 * Generates a cryptographically secure random number between 0 (inclusive) and 1 (exclusive).
 * Supports browser, Node.js, and SSR environments.
 */
export function secureRandom(): number {
  // Try to use crypto from globalThis (works in modern browsers and Node.js)
  const crypto = typeof globalThis !== "undefined" ? globalThis.crypto : (typeof window !== "undefined" ? window.crypto : undefined);

  if (crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
  }

  // Fallback to Math.random() for older environments or when crypto is unavailable
  return Math.random();
}
