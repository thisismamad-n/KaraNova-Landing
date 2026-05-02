import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";

let effectCallback: Function | null = null;
let effectCleanup: Function | void | null = null;
let stateSetter: ReturnType<typeof mock> | null = null;
let currentStateValue: boolean;

// Mock React
mock.module("react", () => ({
  useState: (init: any) => {
    if (stateSetter === null) {
      currentStateValue = typeof init === "function" ? init() : init;
      stateSetter = mock((newVal: boolean) => {
        currentStateValue = newVal;
      });
    }
    return [currentStateValue, stateSetter];
  },
  useEffect: (cb: any, deps: any) => {
    effectCallback = cb;
  }
}));

import { useMediaQuery } from "./use-media-query";

describe("useMediaQuery", () => {
  let originalWindow: any;

  beforeEach(() => {
    originalWindow = global.window;
    effectCallback = null;
    effectCleanup = null;
    stateSetter = null;
  });

  afterEach(() => {
    global.window = originalWindow;
    if (effectCleanup && typeof effectCleanup === "function") {
        effectCleanup();
    }
    mock.restore();
  });

  test("should return false when window is undefined (SSR)", () => {
    // Ensure window is undefined
    const previousWindow = global.window;
    // @ts-ignore
    delete global.window;

    try {
      const matches = useMediaQuery("(min-width: 768px)");
      expect(matches).toBe(false);
    } finally {
      global.window = previousWindow;
    }
  });

  test("should initialize with correct value from window.matchMedia", () => {
    global.window = {
      matchMedia: mock((query) => ({
        matches: true,
        addEventListener: mock(),
        removeEventListener: mock(),
      }))
    } as any;

    const matches = useMediaQuery("(min-width: 768px)");
    expect(matches).toBe(true);
    expect(global.window.matchMedia).toHaveBeenCalledWith("(min-width: 768px)");
  });

  test("should handle false matches correctly on initialization", () => {
    global.window = {
      matchMedia: mock((query) => ({
        matches: false,
        addEventListener: mock(),
        removeEventListener: mock(),
      }))
    } as any;

    const matches = useMediaQuery("(min-width: 768px)");
    expect(matches).toBe(false);
  });

  test("should register and unregister event listener in useEffect", () => {
    const addEventListenerMock = mock();
    const removeEventListenerMock = mock();

    global.window = {
      matchMedia: mock((query) => ({
        matches: false,
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
      }))
    } as any;

    // Trigger state init
    useMediaQuery("(min-width: 768px)");

    // Simulate React running useEffect
    expect(effectCallback).not.toBeNull();
    if (effectCallback) {
        effectCleanup = effectCallback();
    }

    expect(addEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));

    // Simulate component unmount / cleanup
    if (effectCleanup && typeof effectCleanup === "function") {
        effectCleanup();
        effectCleanup = null;
    }

    expect(removeEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));
  });

  test("should update state when media query changes", () => {
    let listenerRef: Function | null = null;

    const mediaMock = {
      matches: false,
      addEventListener: mock((event, listener) => {
          listenerRef = listener;
      }),
      removeEventListener: mock(),
    };

    global.window = {
      matchMedia: mock((query) => mediaMock)
    } as any;

    useMediaQuery("(min-width: 768px)");

    if (effectCallback) {
        effectCleanup = effectCallback();
    }

    expect(listenerRef).not.toBeNull();

    // Simulate event change: mutate the mediaMock that is referenced inside the listener closure
    mediaMock.matches = true;

    if (listenerRef) {
        listenerRef();
    }

    expect(stateSetter).toHaveBeenCalledWith(true);
  });
});
