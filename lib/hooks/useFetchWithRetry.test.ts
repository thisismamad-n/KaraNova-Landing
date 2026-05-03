import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";

let states: any[] = [];
let setters: any[] = [];
let stateIndex = 0;
let effectCallback: Function | null = null;
let effectPromise: Promise<any> | null = null;

// Mock React hooks manually
mock.module("react", () => ({
  useState: (init: any) => {
    const currentIndex = stateIndex++;
    if (states.length <= currentIndex) {
      states.push(typeof init === "function" ? init() : init);
      setters.push((newVal: any) => {
        states[currentIndex] = typeof newVal === "function" ? newVal(states[currentIndex]) : newVal;
      });
    }
    return [states[currentIndex], setters[currentIndex]];
  },
  useEffect: (cb: any, deps: any) => {
    // We capture the callback so we can await its result (which is a Promise in the useFetchWithRetry code where fetchData is async)
    effectCallback = cb;
  },
  useCallback: (cb: any, deps: any) => {
    // useCallback returns the callback, but when it's called inside useEffect we want to capture its promise
    return (...args: any[]) => {
      const result = cb(...args);
      if (result instanceof Promise) {
        effectPromise = result;
      }
      return result;
    };
  },
}));

import { useFetchWithRetry } from "./useFetchWithRetry";

describe("useFetchWithRetry", () => {
  let originalSetTimeout: typeof setTimeout;

  beforeEach(() => {
    states = [];
    setters = [];
    stateIndex = 0;
    effectCallback = null;
    effectPromise = null;

    // Mock setTimeout to execute immediately for faster tests by resolving synchronously essentially
    originalSetTimeout = global.setTimeout;
    global.setTimeout = ((cb: Function) => cb()) as any;
  });

  afterEach(() => {
    global.setTimeout = originalSetTimeout;
  });

  test("should successfully fetch data on the first try", async () => {
    const fetchFn = mock(async () => "success-data");

    let result = useFetchWithRetry(fetchFn, { maxRetries: 1 });

    // Simulate React running useEffect
    if (effectCallback) {
      effectCallback();
      if (effectPromise) await effectPromise;
    }

    // Reset state index for re-render
    stateIndex = 0;
    result = useFetchWithRetry(fetchFn, { maxRetries: 1 });

    expect(result.data).toBe("success-data");
    expect(result.loading).toBe(false);
    expect(result.error).toBe(null);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  test("should handle known Error rejection and retry", async () => {
    let callCount = 0;
    const fetchFn = mock(async () => {
      callCount++;
      if (callCount < 2) {
        throw new Error("Network error");
      }
      return "recovered-data";
    });

    let result = useFetchWithRetry(fetchFn, { maxRetries: 2, retryDelay: 100 });

    // Simulate React running useEffect
    if (effectCallback) {
      effectCallback();
      if (effectPromise) await effectPromise;
    }

    // Reset state index for re-render
    stateIndex = 0;
    result = useFetchWithRetry(fetchFn, { maxRetries: 2, retryDelay: 100 });

    expect(result.data).toBe("recovered-data");
    expect(result.loading).toBe(false);
    expect(result.error).toBe(null);
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  test("should normalize and handle unknown error types (non-Error objects)", async () => {
    const onErrorMock = mock();

    const fetchFn = mock(async () => {
      throw "This is a string error, not an Error object";
    });

    let result = useFetchWithRetry(fetchFn, {
      maxRetries: 1,
      retryDelay: 100,
      onError: onErrorMock
    });

    // Simulate React running useEffect
    if (effectCallback) {
      effectCallback();
      if (effectPromise) await effectPromise;
    }

    // Reset state index for re-render
    stateIndex = 0;
    result = useFetchWithRetry(fetchFn, {
      maxRetries: 1,
      retryDelay: 100,
      onError: onErrorMock
    });

    expect(result.data).toBe(null);
    expect(result.loading).toBe(false);

    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe("Unknown error");

    expect(fetchFn).toHaveBeenCalledTimes(2);

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onErrorMock.mock.calls[0][0].message).toBe("Unknown error");
  });

  test("should permanently fail when max retries are exceeded", async () => {
    const onErrorMock = mock();
    const specificError = new Error("Specific failure");

    const fetchFn = mock(async () => {
      throw specificError;
    });

    let result = useFetchWithRetry(fetchFn, {
      maxRetries: 2,
      retryDelay: 10,
      onError: onErrorMock
    });

    // Simulate React running useEffect
    if (effectCallback) {
      effectCallback();
      if (effectPromise) await effectPromise;
    }

    // Reset state index for re-render
    stateIndex = 0;
    result = useFetchWithRetry(fetchFn, {
      maxRetries: 2,
      retryDelay: 10,
      onError: onErrorMock
    });

    expect(result.data).toBe(null);
    expect(result.loading).toBe(false);
    expect(result.error).toBe(specificError);

    expect(fetchFn).toHaveBeenCalledTimes(3);

    expect(onErrorMock).toHaveBeenCalledWith(specificError);
  });
});
