import { expect, test, describe, spyOn, afterEach } from "bun:test";
import { secureRandom } from "./secureRandom";

describe("secureRandom", () => {
  afterEach(() => {
    // Restore global crypto if it was mocked
    // @ts-ignore
    delete globalThis.crypto;
  });

  test("should return a number between 0 and 1", () => {
    for (let i = 0; i < 100; i++) {
      const val = secureRandom();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });

  test("should use crypto.getRandomValues when available", () => {
    const getRandomValuesSpy = (array: Uint32Array) => {
      array[0] = 0x7fffffff; // Halfway to 0xffffffff
      return array;
    };

    // Mock globalThis.crypto
    // @ts-ignore
    globalThis.crypto = {
      getRandomValues: getRandomValuesSpy
    };

    const val = secureRandom();
    // 0x7fffffff / (0xffffffff + 1) should be approx 0.5
    expect(val).toBeCloseTo(0.5, 5);
  });

  test("should fallback to Math.random when crypto is NOT available", () => {
    // Ensure crypto is NOT defined
    // @ts-ignore
    delete globalThis.crypto;

    const mathRandomSpy = spyOn(Math, "random");

    secureRandom();

    expect(mathRandomSpy).toHaveBeenCalled();
    mathRandomSpy.mockRestore();
  });
});
